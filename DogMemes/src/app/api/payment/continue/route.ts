import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getOrderByOrderNoAndUuid, updateOrderStatus } from "@/models/order";
import Stripe from "stripe";
import { respErr, respOk } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return respErr("Unauthorized");
    }

    // 获取请求数据
    const { orderNo } = await request.json();

    if (!orderNo) {
      return respErr("Order number is required");
    }

    // 获取订单信息
    const order = await getOrderByOrderNoAndUuid(orderNo, session.user.uuid);

    if (!order) {
      return respErr("Order not found");
    }

    // 检查订单状态
    if (order.status !== "pending") {
      return respErr("Order is not pending");
    }
    

    // 如果已经有 stripe_session_id，先检查该会话是否仍然有效
    if (order.stripe_session_id && typeof order.stripe_session_id === 'string') {
      try {
        const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");
        const existingSession = await stripe.checkout.sessions.retrieve(order.stripe_session_id);
        
        // 如果会话仍然有效且未过期，返回现有的 URL
        if (existingSession.status === "open" && existingSession.url) {
          return NextResponse.json({ url: existingSession.url });
        } else {
          // 更新订单的状态为 pending
          await updateOrderStatus(order.order_no, "closed", "", "", "");
          console.log("Order status updated to closed");
          return respErr("Order is closed");
        }
      } catch (error) {
        console.log("Existing session is error", error);
        return respErr("Stripe session is error");
      }
    } 

    console.log("Stripe session is not found");
    return respErr("Stripe session is not found");
  } catch (error: any) {
    console.error("Continue payment error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
