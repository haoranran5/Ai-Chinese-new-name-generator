import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { insertOrder } from "@/models/order";
import { findUserByUuid } from "@/models/user";
import { findAffiliateByUserUuid, insertAffiliate, findAffiliateByOrderNo } from "@/models/affiliate";
import { respErr } from "@/lib/response";
import { AffiliateRewardPercent } from "@/types/db/affiliate-record";

// 生成简单的唯一订单号
function generateOrderNo(): string {
  const timestamp = Date.now().toString();
  const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `ORD${timestamp}${randomStr}`;
}

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return respErr("Unauthorized");
    }

    // 获取请求数据
    const {
      productId,
      mode = "payment",
      amount = 0,
      credits = 0,
      currency = "USD",
      productName = "",
      validMonths = 0,
      interval = null,
      orderDetail = "",
    } = await request.json();

    if (!productId) {
      return respErr("Product ID is required");
    }

    // 生成唯一订单号
    const orderNo = generateOrderNo();
    const now = new Date();

    // 计算过期时间（如果有效期大于0）
    const expiredAt =
      validMonths > 0
        ? new Date(now.setMonth(now.getMonth() + validMonths))
        : null;
    
    const order = await insertOrder({
      order_no: orderNo,
      created_at: new Date().toISOString(),
      user_uuid: session.user.uuid,
      user_email: session.user.email || "",
      amount,
      interval,
      expired_at: expiredAt?.toISOString(),
      status: "pending",
      credits,
      currency,
      product_id: productId,
      product_name: productName,
      valid_months: validMonths,
      order_detail: orderDetail,
      // 订阅相关字段初始为null
      sub_id: null,
      sub_interval_count: null,
      sub_cycle_anchor: null,
      sub_period_end: null,
      sub_period_start: null,
      sub_times: null,
      // 支付相关字段初始为null
      stripe_session_id: null,
      paid_at: null,
      paid_email: null,
      paid_detail: null,
    });


    if (!order) {
      console.error("创建订单失败");
      return respErr("Failed to create order", 500);
    }

    // 检查用户是否有邀请人，如果有则创建待处理的 affiliate 记录
    try {
      const user = await findUserByUuid(session.user.uuid);
      if (user?.invited_by) {
        console.log(`用户 ${session.user.email} 有邀请人 ${user.invited_by}，检查是否需要创建 affiliate 记录`);

        // 检查是否已经存在该订单的 affiliate 记录
        const affiliateData = await findAffiliateByOrderNo(orderNo);

        if (!affiliateData) {
          // 只有当不存在记录时才创建新的 affiliate 记录
          console.log(`创建新的订单 affiliate 记录 - 订单号: ${orderNo}`);
          const affiliateData = await insertAffiliate({
            user_uuid: session.user.uuid,
            invited_by: user.invited_by,
            status: "pending", 
            paid_order_no: orderNo, // 订单创建时暂时为空，支付成功后更新
            paid_amount: 0, // 支付成功后更新
            reward_percent: AffiliateRewardPercent.Paied, // 默认奖励比例 10%
            reward_amount: 0, // 支付成功后计算
            created_at: new Date().toISOString(),
          });

          if (!affiliateData) {
            console.error("创建 affiliate 记录失败");
            // 不影响订单创建，只记录错误
          } else {
            console.log("成功创建待处理的 affiliate 记录");
          }
        } else {
          console.log("用户已有 affiliate 记录，跳过创建");
        }
      }
    } catch (affiliateError) {
      console.error("处理邀请关系时出错:", affiliateError);
      // 不影响订单创建，只记录错误
    }

    // 返回订单号给客户端
    return NextResponse.json({ orderNo });
  } catch (error: any) {
    console.error("创建订单错误:", error);
    return respErr("Internal server error", 500);
  }
}
