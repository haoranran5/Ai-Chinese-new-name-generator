import { NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { respErr } from "@/lib/response";
import { decreaseCredits } from "@/services/credit";
import { serverGetUserUuid } from "@/lib/common";
import { getUserCredits } from "@/models/user";

// 定义提供商选项类型
type ProviderOptions = {
  openai?: {
    maxTokens?: number;
    temperature?: number;
    [key: string]: unknown;
  };
  deepseek?: {
    maxTokens?: number;
    temperature?: number;
    [key: string]: unknown;
  };
};

// 默认提供商选项
const defaultProviderOptions: ProviderOptions = {
  openai: {
    maxTokens: 500,
    temperature: 0.7,
  },
  deepseek: {
    maxTokens: 500,
    temperature: 0.7,
  },
};

export async function POST(req: Request) {
  try {
    // 从请求体中获取参数
    const { role, prompt, model, provider = "openai", maxTokens = 500 } = await req.json();
    if (!prompt || !model) {
      return respErr("invalid params");
    }

    let textModel;
    let providerOptions = {};

    // 根据提供商创建相应的模型
    switch (provider) {
      case "openai":
        // 检查环境变量
        if (!process.env.OPENAI_API_KEY) {
          return respErr("invalid OPENAI_API_KEY");
        }

        const customOpenAI = createOpenAI({
          baseURL: process.env.OPENAI_BASE_URL,
          apiKey: process.env.OPENAI_API_KEY,
        });

        textModel = customOpenAI.chat(model);
        providerOptions = {
          openai: { ...defaultProviderOptions.openai, maxTokens },
        };
        break;

      case "deepseek":
        // 检查环境变量
        if (!process.env.DEEPSEEK_API_KEY) {
          return respErr("invalid DEEPSEEK_API_KEY");
        }

        const deepseekOpenAI = createOpenAI({
          baseURL: process.env.DEEPSEEK_BASE_URL || "https://openrouter.ai/api/v1",
          apiKey: process.env.DEEPSEEK_API_KEY,
        });

        // DeepSeek V3 的实际模型名称，通过OpenRouter使用
        const deepseekModel = model === "deepseek-v3 0324" ? "deepseek/deepseek-chat" : model;
        textModel = deepseekOpenAI.chat(deepseekModel);
        providerOptions = {
          openai: { ...defaultProviderOptions.deepseek, maxTokens },
        };
        break;

      default:
        return respErr(`invalid provider: ${provider}`);
    }

    // 构建消息数组
    const messages: Array<{ role: "system" | "user"; content: string }> = [];
    if (role) {
      messages.push({ role: "system", content: role });
    }
    messages.push({ role: "user", content: prompt });

    // 生成文本
    const { text, warnings } = await generateText({
      model: textModel,
      messages: messages,
      providerOptions,
    });

    // 扣除积分测试
    const user_uuid = await serverGetUserUuid();
    if (!user_uuid) {
      return respErr("please login first");
    }

    // 检查用户积分是否足够
    const userCredits = await getUserCredits(user_uuid);
    if (userCredits < 3) {
      return respErr("insufficient credits");
    }

    const result = await decreaseCredits(user_uuid, 3, "gen_text");
    if (!result) {
      return respErr("insufficient credits");
    }
    console.log("扣除积分测试");

    // 检查是否有警告
    if (warnings && warnings.length > 0) {
      console.warn("文本生成警告:", warnings);
    }

    // 返回结果
    return NextResponse.json({
      text,
      warnings,
      model,
      provider,
      role,
      prompt,
    });
  } catch (error: unknown) {
    console.error("文本生成错误:", error);

    // 根据错误类型返回不同的状态码和错误信息
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("API key")) {
      return respErr("invalid API key", 401);
    } else if (errorMessage.includes("rate limit")) {
      return respErr("API rate limit exceeded", 429);
    } else if (errorMessage.includes("timeout")) {
      return respErr("request timeout", 504);
    } else {
      return respErr("text generation failed: " + errorMessage, 500);
    }
  }
}
