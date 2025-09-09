import Stripe from "stripe";
import { respOk } from "@/lib/response";
 
export const runtime = "edge";
 
export async function POST(req: Request) {
  try {
    const stripePrivateKey = process.env.STRIPE_PRIVATE_KEY;
    const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
 
    if (!stripePrivateKey || !stripeWebhookSecret) {
      throw new Error("invalid stripe config");
    }
 
    const stripe = new Stripe(stripePrivateKey);
 
    const sign = req.headers.get("stripe-signature") as string;
    const body = await req.text();
    if (!sign || !body) {
      throw new Error("invalid notify data");
    }
 
    const event = await stripe.webhooks.constructEventAsync(
      body,
      sign,
      stripeWebhookSecret
    );
 
    console.log("stripe notify event: ", event);
 
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // 调用 Node.js API 端点来处理数据库操作
        const handleResponse = await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/payment/stripe/handle-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session }),
        });

        if (!handleResponse.ok) {
          throw new Error(`Failed to handle session: ${handleResponse.statusText}`);
        }

        break;
      }

      default:
        console.log("not handle event: ", event.type);
    }
 
    return respOk();
  } catch (e: any) {
    console.log("stripe notify failed: ", e);
    return Response.json(
      { error: `handle stripe notify failed: ${e.message}` },
      { status: 500 }
    );
  }
}