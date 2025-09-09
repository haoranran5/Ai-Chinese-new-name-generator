"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { User } from "@/types/db/user";

type Props = {
  inviteCode: string;
};

export default function InviteClient({ inviteCode }: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inviter, setInviter] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkInviteCode() {
      try {
        // 调用服务端API检查邀请码是否有效
        const response = await fetch(
          `/api/user/invite-check?code=${inviteCode}`
        );
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Invite code is invalid");
          setLoading(false);
          return;
        }

        setInviter(data.inviter);
        setLoading(false);
      } catch (error) {
        console.error("Error checking invite code:", error);
        setError("Error checking invite code");
        setLoading(false);
      }
    }

    if (inviteCode) {
      checkInviteCode();
    }
  }, [inviteCode]);

  // 处理邀请关系
  const handleAcceptInvite = async () => {
    setIsProcessing(true);
    if (!session) {
      // 保存邀请码到本地存储，登录后使用
      localStorage.setItem("pendingInviteCode", inviteCode);
      // 跳转到登录页面
      router.push(`/auth/signin?inviteCode=${inviteCode}`);
      return;
    }

    try {
      const response = await fetch("/api/user/update-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inviteCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to accept invite");
        setIsProcessing(false);
        return;
      }

      toast.success("Successfully accepted invite!");
      // 跳转到首页或其他页面
      router.push("/");
    } catch (error) {
      console.error("Error accepting invite:", error);
      toast.error("Error accepting invite");
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-semibold">Checking invite code...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Invite error
        </h2>
        <p className="mb-6">{error}</p>
        <Button onClick={() => router.push("/")}>Back to home</Button>
      </div>
    );
  }

  return (
    <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">You have been invited to join</h1>

      {inviter && (
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <img
              src={
                inviter.avatar_url || "https://www.gravatar.com/avatar/?d=mp"
              }
              alt={inviter.nickname || "Inviter"}
              className="w-16 h-16 rounded-full"
            />
          </div>
          <p className="text-xl font-medium">
            {inviter.nickname || inviter.email}
          </p>
          <p className="text-gray-500 mt-1">Invite you to join our platform</p>
        </div>
      )}

      <div className="space-y-4">
        <Button
          onClick={handleAcceptInvite}
          className="w-full py-6 text-lg"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : status === "authenticated" ? (
            "Accept invite"
          ) : (
            "Login and accept invite"
          )}
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="w-full"
        >
          Later
        </Button>
      </div>
    </div>
  );
}
