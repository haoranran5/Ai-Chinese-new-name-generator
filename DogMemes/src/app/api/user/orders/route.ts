import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { respErr } from "@/lib/response";
import { getOrdersByUserUuid } from "@/models/order";

export async function GET(request: NextRequest) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return respErr("Unauthorized", 401);
    }

    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const userUuid = searchParams.get("user_uuid");


    // 根据参数添加过滤条件
    if (userUuid) {
      // 确保用户只能查看自己的订单
      if (userUuid !== session.user.uuid) {
        return respErr("Forbidden", 403);
      }
    } else {
      return respErr("Missing required parameters", 400);
    }

    // 按创建时间降序排序
    const orders = await getOrdersByUserUuid(userUuid);

    if (!orders) {
      console.error("Failed to fetch orders");
      return respErr("Failed to fetch orders", 500);
    }

    return NextResponse.json({ orders });
  } catch (error: unknown) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
