"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useInviteCode() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // 只在用户已登录且会话加载完成时执行
    if (status === "authenticated" && session?.user) {
      const pendingInviteCode = localStorage.getItem("pendingInviteCode");
      
      if (pendingInviteCode) {
        // 处理邀请码
        handlePendingInviteCode(pendingInviteCode);
      }
    }
  }, [session, status]);

  const handlePendingInviteCode = async (inviteCode: string) => {
    try {
      console.log("处理待处理的邀请码:", inviteCode);
      
      const response = await fetch("/api/user/update-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inviteCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // 成功处理邀请码
        localStorage.removeItem("pendingInviteCode");
        toast.success(`Successfully accepted invite from ${data.inviter.email}`);
        console.log("处理邀请码成功:", data);
      } else {
        // 处理失败，但不显示错误（可能用户已经有邀请人了）
        localStorage.removeItem("pendingInviteCode");
        console.log("处理邀请码失败:", data.error);
        
        // 只在特定错误时显示提示
        if (data.error && !data.error.includes("already")) {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.error("处理邀请码时出错:", error);
      // 清除邀请码，避免重复尝试
      localStorage.removeItem("pendingInviteCode");
    }
  };

  return {
    handlePendingInviteCode,
  };
}
