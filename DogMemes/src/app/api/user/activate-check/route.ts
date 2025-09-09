import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { respErr } from "@/lib/response";
import { findOrderByOrderNo } from "@/models/order";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return respErr("Please login first");
    }

    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return respErr("Parameter missing: orderId");
    }

    const orderData = await findOrderByOrderNo(orderId);
    if (!orderData) {
      return respErr("Order not found");
    }

    if (!orderData) {
      return respErr("Order not found or you don't have access");
    }

    if (orderData.status === "pending") {
      return respErr(
        'Order not paid, please complete payment in "My Orders" page.'
      );
    }

    if (orderData.status === "activated") {
      return NextResponse.json({
        isActivated: true,
        activatedBy: orderData.paid_detail || "未知用户",
        message: "Order already activated, please do not repeat the operation.",
      });
    }

    if (orderData.status === "paid") {
      return NextResponse.json({
        isActivated: false,
        message: "Order can be activated",
      });
    }

    return NextResponse.json(
      {
        isActivated: false,
        message: `Order status abnormal (${orderData.status}), please contact customer service.`,
      },
      { status: 400 }
    );
  } catch (e: any) {
    console.error("Get order status error:", e);
    return respErr("Query failed, server internal error");
  }
}
