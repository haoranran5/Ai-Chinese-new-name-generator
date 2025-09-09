import { respData, respErr } from "@/lib/response";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return respErr("invalid params");
    }

    return respData({
      pong: `received message: ${message}`,
    });
  } catch (e) {
    console.log("test failed:", e);
    return respErr("test failed");
  }
}