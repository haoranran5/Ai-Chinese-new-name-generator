import { findOrderByOrderNo, updateOrderStatus } from "@/models/order";
import { findUserByUuid } from "@/models/user";
import { updateAffiliate, findAffiliateByOrderNo } from "@/models/affiliate";
import { AffiliateRewardPercent } from "@/types/db/affiliate-record";
import { Order } from "@/types/order";
import Stripe from "stripe";
import { getIsoTimestr } from "@/lib/time";
import { increaseCredits } from "@/services/credit";

/**
 * 发送 Bark 通知
 * @param order 订单信息
 * @param paidEmail 支付邮箱
 * @param actualAmount 实际支付金额（从 Stripe session 获取）
 * @param originalAmount 原价（从 Stripe session 获取）
 * @param currency 货币类型
 */
async function sendBarkNotification(
  order: Order,
  paidEmail: string,
  actualAmount?: number,
  originalAmount?: number,
  currency: string = "usd"
) {
  try {
    console.log(`[Bark通知] 开始发送新订单通知: ${order.order_no}`);

    const barkUrl = "";

    // 优先使用 Stripe session 中的实际支付金额
    const paidAmount = actualAmount
      ? (actualAmount / 100).toFixed(2)
      : ((order.amount || 0) / 100).toFixed(2);
    const origAmount = originalAmount
      ? (originalAmount / 100).toFixed(2)
      : paidAmount;
    const credits = order.credits || 0;
    const currencySymbol =
      currency.toUpperCase() === "USD" ? "$" : currency.toUpperCase();

    // 构建通知内容，如果有折扣则显示原价和实际支付价格
    let priceText = `${currencySymbol}${paidAmount}`;
    if (originalAmount && actualAmount && originalAmount !== actualAmount) {
      const discountAmount = ((originalAmount - actualAmount) / 100).toFixed(2);
      priceText = `${currencySymbol}${paidAmount} (原价${currencySymbol}${origAmount}, 优惠${currencySymbol}${discountAmount})`;
    }

    const notificationData = {
      title: "新订单" + order.order_no + " 金额: " + priceText,
      body: `订单号: ${order.order_no}\n金额: ${priceText}\n积分: ${credits}\n邮箱: ${paidEmail}`,
      sound: "default",
    };

    const response = await fetch(barkUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationData),
    });

    if (response.ok) {
      console.log(`[Bark通知] ✅ 通知发送成功: ${order.order_no}`);
    } else {
      console.error(
        `[Bark通知] ❌ 通知发送失败: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("[Bark通知] ❌ 发送通知时发生错误:", error);
    // 不抛出错误，避免影响订单处理流程
  }
}

/**
 * 处理邀请奖励逻辑
 * @param order 订单信息
 */
async function handleInviteReward(order: Order) {
  try {
    console.log(
      `[邀请奖励] 开始处理订单: ${order.order_no}, 用户: ${order.user_uuid}`
    );

    // 查找支付用户信息
    const user = await findUserByUuid(order.user_uuid);
    console.log(`[邀请奖励] 查找用户结果:`, {
      userExists: !!user,
      hasInviter: !!user?.invited_by,
      invitedBy: user?.invited_by,
    });

    if (!user || !user.invited_by) {
      // 用户不存在或没有邀请人，无需处理
      console.log(`[邀请奖励] 跳过处理 - 用户不存在或没有邀请人`);
      return;
    }

    // 检查是否已经存在邀请记录（通过订单查找）
    let affiliateRecord = await findAffiliateByOrderNo(order.order_no);
    console.log(`[邀请奖励] 查找邀请支付订单记录结果:`, {
      recordExists: !!affiliateRecord,
      recordStatus: affiliateRecord?.status,
      recordId: affiliateRecord?.id,
    });

    if (affiliateRecord) {
      // 如果邀请订单记录已存在，同步订单数据到邀请记录
      console.log(
        `[邀请奖励] 找到现有邀请记录，状态: ${affiliateRecord.status}`
      );
      const orderData = await findOrderByOrderNo(order.order_no);
      if (orderData) {
        console.log(`[邀请奖励] 找到订单数据，同步到邀请记录`);
        const updateResult = await updateAffiliate(affiliateRecord.id, {
          status: "completed",
          paid_amount: orderData.amount,
          reward_amount:
            orderData.amount * (AffiliateRewardPercent.Paied / 100),
        });
        console.log(`[邀请奖励] 更新结果:`, {
          success: !!updateResult,
          orderId: order.order_no,
        });
      } else {
        console.error(`[邀请奖励] 未找到订单数据，无法同步到邀请记录`);
      }
    }
  } catch (error) {
    console.error("[邀请奖励] ❌ 处理邀请奖励时发生错误:", error);
    // 不抛出错误，避免影响订单处理流程
  }
}

export async function handleOrderSession(session: Stripe.Checkout.Session) {
  try {
    if (
      !session ||
      !session.metadata ||
      !session.metadata.order_no ||
      session.payment_status !== "paid"
    ) {
      throw new Error("invalid session");
    }

    const order_no = session.metadata.order_no;
    const paid_email =
      session.customer_details?.email || session.customer_email || "";
    const paid_detail = JSON.stringify(session);

    // 从 Stripe session 获取实际支付金额
    const actualPaidAmount = session.amount_total; // 单位：分
    const originalAmount = session.amount_subtotal; // 原价
    const discountAmount = session.total_details?.amount_discount || 0; // 折扣金额

    console.log(`[订单处理] 支付详情:`, {
      orderNo: order_no,
      originalAmount: originalAmount ? originalAmount / 100 : 0,
      actualPaidAmount: actualPaidAmount ? actualPaidAmount / 100 : 0,
      discountAmount: discountAmount / 100,
      currency: session.currency,
    });

    const order = await findOrderByOrderNo(order_no);
    if (!order) {
      throw new Error("order not found");
    }

    // 如果订单已经是 paid 状态，说明已经处理过了，直接返回成功
    if (order.status === "paid") {
      console.log("订单已经处理过，跳过重复处理");
      return;
    }

    if (order.status !== "pending") {
      throw new Error("invalid order status: " + order.status);
    }

    const paid_at = getIsoTimestr();
    // 更新订单状态，包含实际支付金额
    await updateOrderStatus(
      order_no,
      "paid",
      paid_at,
      paid_email,
      paid_detail,
      actualPaidAmount || 0
    );

    // 积分处理
    await increaseCredits(
      order.user_uuid,
      order.credits || 0,
      "recharge_credits",
      order.expired_at
    );

    // 处理邀请奖励逻辑
    await handleInviteReward(order);

    // 发送 Bark 通知
    // await sendBarkNotification(
    //   order,
    //   paid_email,
    //   actualPaidAmount || 0, // 传递分为单位的金额
    //   originalAmount || 0, // 传递分为单位的金额
    //   session.currency || "usd"
    // );

    console.log(
      "handle order session successed: ",
      order_no,
      paid_at,
      paid_email,
      paid_detail
    );
  } catch (e) {
    console.log("handle order session failed: ", e);
    throw e;
  }
}
