"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, Info } from "lucide-react";

export default function ActivateOrderForm({ orderId }: { orderId: string }) {
  const [githubUsername, setGithubUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [orderStatus, setOrderStatus] = useState<{
    isActivated: boolean;
    activatedBy?: string;
    message?: string;
  } | null>(null);
  const [result, setResult] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  // 校验 GitHub 用户名（不能包含 @，不能有空格）
  const isValidGithubUsername = (name: string) =>
    !!name && !name.includes("@") && !/\s/.test(name);

  // 组件加载时检查订单激活状态
  useEffect(() => {
    async function checkOrderStatus() {
      setCheckingStatus(true);
      try {
        const res = await fetch(`/api/user/activate-check?orderId=${orderId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (res.ok) {
          setOrderStatus(data);
          if (data.isActivated) {
            setResult({
              type: "error",
              message:
                data.message ||
                `This order has been activated by user ${
                  data.activatedBy || "unknown"
                }, cannot be activated again`,
            });
          }
        } else {
          // 处理错误响应
          setResult({
            type: "error",
            message: data.error || data.message || "Get order status failed",
          });
        }
      } catch (e: any) {
        setResult({
          type: "error",
          message: "Check order status failed: " + e.message,
        });
      } finally {
        setCheckingStatus(false);
      }
    }

    checkOrderStatus();
  }, [orderId]);

  const handleActivate = async () => {
    if (!isValidGithubUsername(githubUsername)) {
      setResult({
        type: "error",
        message:
          "Please enter the correct GitHub username (cannot contain @ or space)",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/user/activate-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, githubUsername }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({
          type: "success",
          message:
            "Activation successful! Please go to GitHub notification center to accept the repository invitation.",
        });
        // 更新本地订单状态
        setOrderStatus({
          isActivated: true,
          activatedBy: githubUsername,
        });
      } else {
        setResult({
          type: "error",
          message: data.message || "Activation failed, please try again later.",
        });
      }
    } catch (e: any) {
      setResult({
        type: "error",
        message: "Network error, please try again later." + e.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // 订单已激活或正在检查状态时禁用激活功能
  const isDisabled =
    loading ||
    checkingStatus ||
    orderStatus?.isActivated ||
    !isValidGithubUsername(githubUsername);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Activate Order
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {checkingStatus ? (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking order status...
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  value={orderId}
                  readOnly
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUsername">
                  GitHub Username
                  <span className="text-xs text-muted-foreground ml-1">
                    (Not Email)
                  </span>
                </Label>
                <Input
                  id="githubUsername"
                  placeholder="Please enter your GitHub username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  disabled={loading || orderStatus?.isActivated}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleActivate}
                disabled={isDisabled}
                variant={orderStatus?.isActivated ? "secondary" : "default"}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading
                  ? "Activating..."
                  : orderStatus?.isActivated
                  ? "Activated"
                  : "Activate"}
              </Button>

              {result && (
                <Alert variant={result.type === "error" ? "destructive" : "success"}>
                  {result.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>{result.message}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {!orderStatus?.isActivated && (
                    <>
                      After activation, you will receive a GitHub repository
                      collaboration invitation, please go to GitHub notification
                      center to accept the invitation.
                      <br />
                      <br />
                    </>
                  )}
                  Each order can only be activated once, please ensure the GitHub
                  username is correct.
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
