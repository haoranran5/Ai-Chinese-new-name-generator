import { NextRequest, NextResponse } from "next/server";
import { validateApiKey } from "@/models/apikey";
import { respErr } from "@/lib/response";

/**
 * API Key 验证中间件
 * @param request NextRequest 对象
 * @returns 验证结果，如果失败返回错误响应
 */
export async function validateApiKeyMiddleware(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    // 从 Authorization header 获取 API Key
    const authHeader = request.headers.get("Authorization");
    
    if (!authHeader) {
      return respErr("缺少 Authorization header", 401);
    }

    // 支持 "Bearer sk-xxx" 和 "sk-xxx" 两种格式
    const apikey = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    if (!apikey) {
      return respErr("无效的 API Key 格式", 401);
    }

    // 验证 API Key
    const isValid = await validateApiKey(apikey);
    
    if (!isValid) {
      return respErr("无效的 API Key", 401);
    }

    // 验证通过，返回 null 表示继续处理请求
    return null;
  } catch (error) {
    console.error("API Key 验证失败:", error);
    return respErr("服务器内部错误", 500);
  }
}

/**
 * 从请求中提取 API Key
 * @param request NextRequest 对象
 * @returns API Key 字符串或 null
 */
export function extractApiKey(request: NextRequest): string | null {
  const authHeader = request.headers.get("Authorization");
  
  if (!authHeader) {
    return null;
  }

  // 支持 "Bearer sk-xxx" 和 "sk-xxx" 两种格式
  return authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;
}

/**
 * 高阶函数：为 API 路由添加 API Key 验证
 * @param handler 原始的 API 处理函数
 * @returns 包装后的处理函数
 */
export function withApiKeyAuth<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    // 先进行 API Key 验证
    const authError = await validateApiKeyMiddleware(request);
    
    if (authError) {
      return authError;
    }

    // 验证通过，执行原始处理函数
    return handler(request, ...args);
  };
}
