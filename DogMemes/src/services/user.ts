import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { findUserByUuid } from "@/models/user";
import { User } from "@/db/schema";

// 定义安全用户类型（去除敏感字段）
export type SafeUser = Omit<User, 'signin_ip' | 'signin_openid' | 'signin_type'>;

/**
 * 获取当前登录用户信息 - 客户端版本
 * 使用 next-auth 的 getSession 获取会话信息，然后调用 API 获取完整用户信息
 * @returns Promise<SafeUser | null> 用户信息或 null
 */
export const getUserInfo = async (): Promise<SafeUser | null> => {
  try {
    // 获取客户端会话
    const session = await getSession();
    if (!session?.user?.uuid) {
      return null;
    }

    // 调用 API 获取完整用户信息
    const response = await fetch(`/api/user?uuid=${session.user.uuid}`);
    if (!response.ok) {
      console.error("Failed to fetch user info:", response.statusText);
      return null;
    }

    const userData = await response.json();
    return userData as SafeUser;
  } catch (error) {
    console.error("Error getting user info:", error);
    return null;
  }
};

/**
 * 获取当前登录用户信息 - 服务端版本
 * 直接使用 getServerSession 获取会话信息，然后查询数据库获取完整用户信息
 * @returns Promise<SafeUser | null> 用户信息或 null
 */
export const serverGetUserInfo = async (): Promise<SafeUser | null> => {
  try {
    // 获取服务端会话
    const session = await getServerSession(authOptions);
    if (!session?.user?.uuid) {
      return null;
    }

    // 直接查询数据库获取用户信息
    const user = await findUserByUuid(session.user.uuid);
    if (!user) {
      return null;
    }

    // 去除敏感字段并返回
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { signin_ip, signin_openid, signin_type, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    console.error("Error getting server user info:", error);
    return null;
  }
};

/**
 * 获取当前登录用户的 UUID - 客户端版本
 * @returns Promise<string> 用户 UUID 或空字符串
 */
export const getUserUuid = async (): Promise<string> => {
  try {
    const session = await getSession();
    return session?.user?.uuid || "";
  } catch (error) {
    console.error("Error getting user UUID:", error);
    return "";
  }
};

/**
 * 获取当前登录用户的 UUID - 服务端版本
 * @returns Promise<string> 用户 UUID 或空字符串
 */
export const serverGetUserUuid = async (): Promise<string> => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user?.uuid || "";
  } catch (error) {
    console.error("Error getting server user UUID:", error);
    return "";
  }
};

/**
 * 获取用户基本信息（仅从会话中获取）- 客户端版本
 * @returns Promise<Partial<SafeUser> | null> 基本用户信息或 null
 */
export const getUserBasicInfo = async (): Promise<Partial<SafeUser> | null> => {
  try {
    const session = await getSession();
    if (!session?.user) {
      return null;
    }

    return {
      uuid: session.user.uuid,
      email: session.user.email || "",
      nickname: session.user.name || "",
      avatar_url: session.user.image || "",
    } as Partial<SafeUser>;
  } catch (error) {
    console.error("Error getting user basic info:", error);
    return null;
  }
};

/**
 * 获取用户基本信息（仅从会话中获取）- 服务端版本
 * @returns Promise<Partial<SafeUser> | null> 基本用户信息或 null
 */
export const serverGetUserBasicInfo = async (): Promise<Partial<SafeUser> | null> => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return null;
    }

    return {
      uuid: session.user.uuid,
      email: session.user.email || "",
      nickname: session.user.name || "",
      avatar_url: session.user.image || "",
    } as Partial<SafeUser>;
  } catch (error) {
    console.error("Error getting server user basic info:", error);
    return null;
  }
};