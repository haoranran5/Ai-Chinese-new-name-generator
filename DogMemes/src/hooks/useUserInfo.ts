"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserInfo, getUserBasicInfo, SafeUser } from "@/services/user";

/**
 * 获取用户信息的 Hook
 * @param fetchFullInfo 是否获取完整用户信息（从数据库），默认为 false（仅从会话获取）
 * @returns { user, loading, error, refetch }
 */
export function useUserInfo(fetchFullInfo: boolean = false) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<SafeUser | Partial<SafeUser> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    if (status === "loading") {
      return;
    }

    if (status === "unauthenticated" || !session?.user) {
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let userData: SafeUser | Partial<SafeUser> | null;
      
      if (fetchFullInfo) {
        // 获取完整用户信息（从数据库）
        userData = await getUserInfo();
      } else {
        // 仅获取基本用户信息（从会话）
        userData = await getUserBasicInfo();
      }

      setUser(userData);
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch user info");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [session, status, fetchFullInfo]);

  return {
    user,
    loading,
    error,
    refetch: fetchUserInfo,
    isAuthenticated: status === "authenticated",
  };
}

/**
 * 获取完整用户信息的 Hook（从数据库）
 */
export function useFullUserInfo() {
  return useUserInfo(true);
}

/**
 * 获取基本用户信息的 Hook（仅从会话）
 */
export function useBasicUserInfo() {
  return useUserInfo(false);
}
