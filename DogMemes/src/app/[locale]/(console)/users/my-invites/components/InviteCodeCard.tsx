"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { users } from "@/db/schema";

export function InviteCodeCard({ user }: { user: typeof users.$inferSelect | undefined }) {
  const t = useTranslations();

  const [copied, setCopied] = useState(false);
  const [currentUser, setCurrentUser] = useState<typeof users.$inferSelect | undefined>(user);
  const [isGenerating, setIsGenerating] = useState(false);

  // 如果用户数据为空，显示错误状态
  if (!user) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <h2 className="text-xl font-semibold">{t("my_invites.invite_code")}</h2>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            {t("my_invites.not_set")}
          </div>
        </CardContent>
      </Card>
    );
  }

  // 自动生成邀请码
  const generateInviteCode = async () => {
    if (isGenerating || !currentUser?.uuid) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/user/generate-invite-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: currentUser.uuid }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser((prev: typeof users.$inferSelect | undefined) => prev ? { ...prev, invite_code: data.inviteCode } : prev);
        toast.success("Generated invite code!");
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to generate invite code");
      }
    } catch (error) {
      console.error("Error generating invite code:", error);
      toast.error("Failed to generate invite code");
    } finally {
      setIsGenerating(false);
    }
  };

  // 检查是否需要自动生成邀请码
  useEffect(() => {
    if (currentUser?.uuid && !currentUser?.invite_code && !isGenerating) {
      generateInviteCode();
    }
  }, [currentUser?.uuid, currentUser?.invite_code, isGenerating]);

  const copyInviteLink = async () => {
    try {
      if (!currentUser?.invite_code) {
        return;
      }

      const inviteLink = `${window.location.origin}/i/${currentUser.invite_code}`;
      navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Invite link copied!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error copying invite link:", error);
      toast.error("Failed to copy invite link");
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <h2 className="text-xl font-semibold">{t("my_invites.invite_code")}</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {isGenerating ? (
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Generating...
                </div>
              ) : (
                currentUser?.invite_code || t("my_invites.not_set")
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={copyInviteLink}
              className="w-full "
              disabled={!currentUser?.invite_code || isGenerating}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t("my_invites.copied")}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  {t("my_invites.copy_invite_link")}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
