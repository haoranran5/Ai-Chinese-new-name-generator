import { NextResponse } from "next/server";
import {
  experimental_generateImage as generateImage,
  Experimental_GenerateImageResult,
} from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { replicate } from "@ai-sdk/replicate";
import { respErr } from "@/lib/response";
import { uploadFile } from "@/lib/storage";
import { readFile } from "fs/promises";
import path from "path";
import { kling } from "@/ai-sdk/kling";
import { decreaseCredits } from "@/services/credit";
import { serverGetUserUuid } from "@/lib/common";

// 定义图片对象类型
interface ImageObject {
  url?: string;
  revised_prompt?: string;
  b64_json?: string;
  base64Data?: string;
  uint8ArrayData?: Uint8Array;
  mimeType?: string;
  [key: string]: unknown;
}

// 定义提供商选项类型
type ProviderOptions = {
  openai?: {
    quality: string;
    style: string;
    [key: string]: unknown;
  };
  replicate?: {
    output_quality: number;
    [key: string]: unknown;
  };
  kling?: {
    [key: string]: unknown;
  };
};

// 默认提供商选项
const defaultProviderOptions: ProviderOptions = {
  openai: {
    quality: "hd",
    style: "natural",
  },
  replicate: {
    output_quality: 90,
  },
  kling: {},
};


export async function POST(req: Request) {
  try {
    // 从请求体中获取参数
    const { prompt, provider, model } = await req.json();
    if (!prompt || !provider || !model) {
      return respErr("invalid params");
    }

    let imageModel;
    let providerOptions = {};

    // 根据提供商创建相应的图片模型
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

        imageModel = customOpenAI.image(model);
        providerOptions = { openai: defaultProviderOptions.openai };
        break;

      case "replicate":
        // 检查环境变量
        if (!process.env.REPLICATE_API_TOKEN) {
          return respErr("invalid REPLICATE_API_TOKEN");
        }

        // 设置模型 ID
        let modelId = model;
        if (model === "flux-1.1-pro") {
          modelId = "black-forest-labs/flux-1.1-pro";
        }

        imageModel = replicate.image(modelId);
        providerOptions = { replicate: defaultProviderOptions.replicate };
        break;

      case "kling":
        // 检查环境变量
        if (!process.env.KLING_ACCESS_KEY || !process.env.KLING_SECRET_KEY) {
          return respErr("invalid KLING_API_KEY or KLING_SECRET_KEY");
        }

        imageModel = kling.image(model.id, {
          accessKey: process.env.KLING_ACCESS_KEY,
          secretKey: process.env.KLING_SECRET_KEY,
        });
        providerOptions = { kling: defaultProviderOptions.kling };
        break;

      default:
        return respErr(`invalid provider: ${provider}`);
    }

    // return NextResponse.json({
    //   demo: false,
    //   message: "演示模式，返回本地图片",
    //   images: ["http://localhost:3000/1.png"],
    // });
    
    // 生成图片
    const result = await generateImage({
      model: imageModel,
      prompt: prompt,
      n: 1,
      providerOptions,
    });

   
    // 处理结果并上传图片
    const imageUrls = await processImageResult(result);

    // 扣除积分测试
    const user_uuid = await serverGetUserUuid();
    if (!user_uuid) {
      return respErr("please login first");
    }
    await decreaseCredits(user_uuid, 3, "gen_image");
    console.log("扣除积分测试");

    // 返回结果
    return NextResponse.json({
      images: imageUrls,
      warnings: result.warnings,
      provider,
      model,
      prompt,
    });
  } catch (error: unknown) {
    console.error("图片生成错误:", error);

    // 根据错误类型返回不同的状态码和错误信息
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes("API key")) {
      return respErr("invalid API key", 401);
    } else if (errorMessage.includes("rate limit")) {
      return respErr("API rate limit exceeded", 429);
    } else if (errorMessage.includes("timeout")) {
      return respErr("request timeout", 504);
    } else {
      return respErr("image generation failed: " + errorMessage, 500);
    }
  }
}

// 上传本地图片
async function uploadLocalImage() {
  const filename = `image_${new Date().getTime()}.png`;
  const key = `ai/${filename}`;

  const content = await readFile(path.join(process.cwd(), "1.png"));
  console.log("path:" + path.join(process.cwd(), "1.png"));

  const url = await uploadFile(content, key, "image/png", "inline");
  console.log("upload file success:", url);
  return url;
}

// 处理图片结果的通用函数
async function processImageResult(result: Experimental_GenerateImageResult) {
  console.log("生成图片结果:", JSON.stringify(result, null, 2));

  // 详细检查图片结果的结构
  console.log("图片类型:", typeof result.images);
  if (Array.isArray(result.images)) {
    console.log("图片数组长度:", result.images.length);
    result.images.forEach((img, index) => {
      console.log(`图片[${index}] 类型:`, typeof img);
      console.log(`图片[${index}] 值:`, img);
      if (typeof img === "object" && img !== null) {
        console.log(`图片[${index}] 属性:`, Object.keys(img));
      }
    });
  }

  // 确保返回的是 URL 字符串数组，并上传图片到存储
  if (!Array.isArray(result.images)) {
    return [];
  }

  const uploadPromises = result.images.map(async (img: any) => {
    const filename = `image_${new Date().getTime()}.png`;
    const key = `ai/${filename}`;

    if (typeof img === "string") {
      // 如果是 data URL，提取 base64 并上传
      if (img.startsWith("data:image/")) {
        const base64Data = img.split(",")[1];
        if (base64Data) {
          try {
            const body = Buffer.from(base64Data, "base64");
            return await uploadFile(body, key, "image/png", "inline");
          } catch (error) {
            console.error("上传图片失败:", error);
            return img; // 上传失败时返回原始 data URL
          }
        }
      }
      return img; // 如果是普通 URL，直接返回
    }

    // 对于对象类型，尝试获取图片数据并上传
    if (typeof img === "object" && img !== null) {
      // 先转换为 unknown，再转换为 ImageObject
      const imgObj = img as unknown as ImageObject;

      // 处理带有 uint8ArrayData 的对象
      if (imgObj.uint8ArrayData && imgObj.mimeType) {
        const base64Data = Buffer.from(imgObj.uint8ArrayData).toString("base64");
        try {
          const body = Buffer.from(base64Data, "base64");
          return await uploadFile(body, key, imgObj.mimeType, "inline",);
        } catch (error) {
          console.error("上传图片失败:", error);
          return `data:${imgObj.mimeType};base64,${base64Data}`;
        }
      }

      // 处理 base64Data 的情况
      if (imgObj.base64Data && imgObj.mimeType) {
        try {
          const body = Buffer.from(imgObj.base64Data, "base64");
          return await uploadFile(body, key, imgObj.mimeType, "inline",);
        } catch (error) {
          console.error("上传图片失败:", error);
          return `data:${imgObj.mimeType};base64,${imgObj.base64Data}`;
        }
      }

      // 处理 b64_json 的情况
      if (imgObj.b64_json && typeof imgObj.b64_json === "string") {
        try {
          const body = Buffer.from(imgObj.b64_json, "base64");
          return await uploadFile(body, key, "image/png", "inline",);
        } catch (error) {
          console.error("上传图片失败:", error);
          return `data:image/png;base64,${imgObj.b64_json}`;
        }
      }

      // 检查常见的 URL 属性名
      if (imgObj.url && typeof imgObj.url === "string") return imgObj.url;

      // 检查所有属性，寻找可能的 URL 字符串
      for (const key in imgObj) {
        const value = imgObj[key];
        if (
          typeof value === "string" &&
          (value.startsWith("http") || value.startsWith("data:"))
        ) {
          return value;
        }
      }
    }

    // 如果无法提取 URL，返回空字符串
    console.error("无法从图片对象中提取 URL:", img);
    return "";
  });

  const uploadedUrls = await Promise.all(uploadPromises);
  return uploadedUrls.filter((url) => url !== ""); // 过滤掉空 URL
}
