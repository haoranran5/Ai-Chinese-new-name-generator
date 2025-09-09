import Stripe from "stripe";
import { handleOrderSession } from "@/services/order";
import { redirect } from "next/navigation";

export default async function ({ params }: { params: Promise<{ session_id: string }> }) {
  const { session_id } = await params;

  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || "");
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    await handleOrderSession(session);

  } catch (e) {
    console.error("支付处理失败:", e);
    const failUrl = process.env.NEXT_PUBLIC_PAY_FAIL_URL || "/";
    redirect(failUrl);
  }

  // 订单处理成功，跳转到成功页面
  // 注意：redirect() 会抛出 NEXT_REDIRECT 错误，这是正常的，不应该被 catch
  const successUrl = process.env.NEXT_PUBLIC_PAY_SUCCESS_URL || "/my-orders";
  redirect(successUrl);
}