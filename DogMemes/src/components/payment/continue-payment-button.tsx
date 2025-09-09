"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";

interface ContinuePaymentButtonProps {
  orderNo: string;
}

export function ContinuePaymentButton({ orderNo }: ContinuePaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleContinuePayment = async () => {
    try {
      setIsLoading(true);

      // 调用继续支付 API
      const response = await fetch("/api/payment/continue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please sign in first", {
            description: "Please sign in first",
            icon: <AlertCircle className="h-5 w-5" />,
          });
          return;
        } 
        if (response.status === 400) {
          toast.error(data.error || "Continue payment failed", {
            description: data.error || "Continue payment failed",
            icon: <AlertCircle className="h-5 w-5" />,
          });
          return;
        }

        throw new Error(data.error || "Continue payment failed");
      }

      // 显示处理中提示
      toast.info("Loading...", {
        description: "Redirecting to payment page...",
      });

      // 跳转到 Stripe Checkout 页面
      setTimeout(() => {
        window.location.href = data.url;
      }, 1000);
    } catch (error) {
      console.error("Continue payment error:", error);
      toast.error("Payment failed", {
        description: error instanceof Error ? error.message : "An error occurred during payment, please try again later",
        icon: <AlertCircle className="h-5 w-5" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleContinuePayment}
      disabled={isLoading}
      className="text-blue-600 underline hover:no-underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-3 w-3 animate-spin" />
          Processing...
        </>
      ) : (
        "Continue to pay"
      )}
    </button>
  );
}
