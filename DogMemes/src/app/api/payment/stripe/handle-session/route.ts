import { handleOrderSession } from "@/services/order";
import { respOk } from "@/lib/response";
import Stripe from "stripe";

// 使用 Node.js runtime 以支持数据库操作
export async function POST(req: Request) {
  try {
    const { session } = await req.json();
    
    if (!session) {
      throw new Error("Session data is required");
    }

    // 处理订单会话
    await handleOrderSession(session as Stripe.Checkout.Session);
    
    return respOk();
  } catch (e: any) {
    console.log("handle session failed: ", e);
    return Response.json(
      { error: `handle session failed: ${e.message}` },
      { status: 500 }
    );
  }
}
