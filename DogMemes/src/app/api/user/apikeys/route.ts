import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { respErr, respData } from "@/lib/response";
import {
  createApiKey,
  getAllApiKeys,
  updateApiKey,
  deleteApiKey,
  findApiKeyById
} from "@/models/apikey";
import { serverGetUserUuid } from "@/services/user";

// 获取所有 API Keys
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return respErr("Unauthorized", 401);
    }

    const apiKeys = await getAllApiKeys();
    
    // 隐藏完整的 API Key，只显示前缀和后缀
    const maskedApiKeys = apiKeys.map(key => ({
      ...key,
      apikey: `${key.apikey.substring(0, 8)}...${key.apikey.substring(key.apikey.length - 4)}`
    }));

    return respData(maskedApiKeys);
  } catch (error) {
    console.error("Get API Keys failed:", error);
    return respErr("Internal server error", 500);
  }
}

// 创建新的 API Key
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const session = await getServerSession(authOptions);
    const uuid = await serverGetUserUuid();
    
    if (!session?.user?.email) {
      return respErr("unauthorized", 401);
    }

    const newApiKey = await createApiKey(uuid, name);
    
    if (!newApiKey) {
      return respErr("Create api key failed", 500);
    }

    return respData(newApiKey);
  } catch (error) {
    console.error("Create API Key failed:", error);
    return respErr("Internal server error", 500);
  }
}

// 更新 API Key 信息
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return respErr("Unauthorized", 401);
    }

    const userUuid = await serverGetUserUuid();
    if (!userUuid) {
      return respErr("User not found", 404);
    }

    const { id, name, status } = await req.json();

    if (!id) {
      return respErr("Missing API Key ID", 400);
    }

    // 验证API Key属于当前用户
    const existingApiKey = await findApiKeyById(id);
    if (!existingApiKey) {
      return respErr("API Key not found", 404);
    }

    if (existingApiKey.user_uuid !== userUuid) {
      return respErr("Access denied", 403);
    }

    // 验证状态值
    if (status && !["active", "inactive"].includes(status)) {
      return respErr("Invalid status value", 400);
    }

    const updatedApiKey = await updateApiKey(id, name, status);

    if (!updatedApiKey) {
      return respErr("Update API Key failed", 500);
    }

    return respData(updatedApiKey);
  } catch (error) {
    console.error("更新 API Key 失败:", error);
    return respErr("Internal server error", 500);
  }
}

// 删除 API Key
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return respErr("Unauthorized", 401);
    }

    const userUuid = await serverGetUserUuid();
    if (!userUuid) {
      return respErr("User not found", 404);
    }

    const { id } = await req.json();

    if (!id) {
      return respErr("Missing API Key ID", 400);
    }

    // 验证API Key属于当前用户
    const existingApiKey = await findApiKeyById(id);
    if (!existingApiKey) {
      return respErr("API Key not found", 404);
    }

    if (existingApiKey.user_uuid !== userUuid) {
      return respErr("Access denied", 403);
    }

    const success = await deleteApiKey(id);

    if (!success) {
      return respErr("Delete API Key failed", 500);
    }

    return respData({ message: "API Key deleted successfully" });
  } catch (error) {
    console.error("删除 API Key 失败:", error);
    return respErr("Internal server error", 500);
  }
}
