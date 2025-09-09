import { NextRequest } from "next/server";
import { respErr, respData } from "@/lib/response";
import { extractApiKey } from "@/lib/apikey-middleware";
import { findUserByApiKey } from "@/models/apikey";
import { getUserCredits } from "@/models/user";
import { decreaseCredits } from "@/services/credit";

export async function POST(request: NextRequest) {
  try {
    // 1. 验证Authorization header
    const apiKey = extractApiKey(request);
    
    if (!apiKey) {
      return respErr("缺少 Authorization header", 401);
    }

    // 2. 验证API Key并获取用户信息
    const user = await findUserByApiKey(apiKey);
    
    if (!user) {
      return respErr("无效的 API Key", 401);
    }

    // 3. 解析请求体
    const body = await request.json();
    const { credits_to_deduct } = body;

    // 4. 验证参数
    if (!credits_to_deduct || credits_to_deduct <= 0) {
      return respErr("credits_to_deduct 必须是大于0的数字", 400);
    }

    // 5. 获取用户当前积分
    const currentCredits = await getUserCredits(user.uuid);

    // 6. 检查积分是否足够
    if (currentCredits < credits_to_deduct) {
      return respErr("积分不足", 400);
    }

    // 7. 扣取积分
    const success = await decreaseCredits(
      user.uuid,
      credits_to_deduct,
      "api_usage"
    );

    if (!success) {
      return respErr("积分扣取失败", 500);
    }

    // 8. 获取扣取后的积分余额
    const remainingCredits = await getUserCredits(user.uuid);

    // 9. 返回结果
    return respData({
      user_uuid: user.uuid,
      credits_deducted: credits_to_deduct,
      remaining_credits: remainingCredits,
      previous_credits: currentCredits,
      message: "积分扣取成功"
    });

  } catch (error) {
    console.error("API处理错误:", error);
    return respErr("服务器内部错误", 500);
  }
}
