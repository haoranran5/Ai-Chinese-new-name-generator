import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { findOrderByOrderNo, updateOrderStripeSessionId } from "@/models/order";
import Stripe from "stripe";
import { respErr } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return respErr("Unauthorized");
    }

    // 获取请求数据
    const {
      mode = "payment",
      orderNo,
      allowPromotionCodes = false,
      discountCode = false,
    } = await request.json();

    if (!orderNo) {
      return respErr("Order number is required");
    }

    const orderData = await findOrderByOrderNo(orderNo);
    if (!orderData) {
      return respErr("Order not found");
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      // 订阅或一次性支付
      mode: (orderData.interval !== "one-time"
        ? "subscription"
        : "payment") as Stripe.Checkout.SessionCreateParams.Mode,
      payment_method_types: ["card"],
      customer_email: session.user.email!,
      line_items: [
        {
          price_data: {
            currency: orderData.currency?.toLowerCase() || "usd",
            product_data: {
              name: orderData.product_name || "Product",
              // description: orderData.order_detail || undefined,
            },
            unit_amount: orderData.amount, // 金额已经是分为单位
            ...(orderData.interval && orderData.interval !== "one-time" ? {
              recurring: {
                interval: orderData.interval as "day" | "week" | "month" | "year",
                interval_count: 1,
              },
            } : {}),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.uuid,
        order_no: orderData.order_no,
        productId: String(orderData.product_id || ""),
        credits: String(orderData.credits || 0),
        validMonths: String(orderData.valid_months || 0),
      },
      success_url: `${process.env.NEXT_PUBLIC_WEB_URL}/pay-success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_PAY_CANCEL_URL}`,
    };

    // 配置折扣码选项
    if (allowPromotionCodes) {
      sessionParams.allow_promotion_codes = true;
    } else if (discountCode) {
      sessionParams.discounts = [
        {
          coupon: "RAVENSAAS",
        },
      ];
    } else {
      sessionParams.discounts = [];
    }

    if (!process.env.STRIPE_PRIVATE_KEY) {
      throw new Error("Missing STRIPE_PRIVATE_KEY");
    }

    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
      typescript: true,
    });
    const checkoutSession = await stripe.checkout.sessions.create(
      sessionParams
    );

    // 更新订单的stripe_session_id
    await updateOrderStripeSessionId(orderNo, checkoutSession.id);

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return respErr("Internal server error", 500);
  }
}
