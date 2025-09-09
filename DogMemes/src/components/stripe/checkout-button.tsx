"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { usePayment } from "@/components/stripe/payment-context";

interface CheckoutButtonProps {
  paymentLink?: string;
  children?: React.ReactNode;
  mode?: "payment" | "subscription";
  className?: string;
  productId?: string;
  productName?: string;
  amount?: number;
  credits?: number;
  validMonths?: number;
  currency?: string;
  interval?: string;
  orderDetail?: string;
  // 折扣码相关参数
  allowPromotionCodes?: boolean;
  discountCode?: boolean;
}

export function CheckoutButton({
  paymentLink,
  children,
  mode = "payment",
  className,
  productId = "",
  productName = "",
  amount = 0,
  credits = 0,
  validMonths = 0,
  currency = "USD",
  interval,
  orderDetail = "",
  allowPromotionCodes = false,
  discountCode=false,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isProcessingRef = useRef(false);

  // 使用可选的支付上下文，如果不可用则使用本地状态
  let isAnyPaymentProcessing = false;
  let setPaymentProcessing = (_: boolean) => {};

  try {
    const paymentContext = usePayment();
    isAnyPaymentProcessing = paymentContext.isAnyPaymentProcessing;
    setPaymentProcessing = paymentContext.setPaymentProcessing;
  } catch (error) {
    // PaymentProvider 不可用时的 fallback
    console.warn("PaymentProvider not available, using local state only");
  }

  const handleCheckout = async () => {
    // 防止重复点击 - 检查本地和全局状态
    if (isProcessingRef.current || isLoading || isAnyPaymentProcessing) {
      return;
    }

    try {
      isProcessingRef.current = true;
      setIsLoading(true);
      setPaymentProcessing(true);

      // 如果是直接支付链接且没有其他参数，直接跳转
      if (paymentLink && !productId ) {
        toast.info("Processing ...", {
          description: "Redirecting to payment page...",
        });

        setTimeout(() => {
          window.location.href = paymentLink;
        }, 1000);
        return;
      }

      // 先创建订单
      const orderResponse = await fetch("/api/payment/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId || "direct_payment",
          mode,
          amount,
          credits,
          currency,
          productName,
          validMonths,
          interval,
          orderDetail,
        }),
      });

      if (!orderResponse.ok) {
        if (orderResponse.status === 401) {
          toast.error("Please sign in first", {
            description: "Please sign in first",
            icon: <AlertCircle className="h-5 w-5" />,
            action: {
              label: "Sign in",
              onClick: () => router.push("/auth/signin"),
            },
          });
          return;
        }
        const orderError = await orderResponse.json();
        throw new Error(orderError.error || "Create order failed");
      }

      const orderData = await orderResponse.json();
      const { orderNo } = orderData;

      // 如果提供了直接的支付链接，则在URL中添加订单号后跳转
      if (paymentLink) {
        toast.info("Processing", {
          description: "Redirecting to payment page...",
        });

        // 添加订单号到支付链接
        const paymentUrl = await fetch("/api/payment/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode,
            orderNo,
            allowPromotionCodes,
            discountCode,
          }),
        });

        const paymentUrlResponse = await paymentUrl.json();
        setTimeout(() => {
          window.location.href = paymentUrlResponse.url;
        }, 1000);
        return;
      }



      const response = await fetch("/api/payment/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          orderNo,
          allowPromotionCodes,
          discountCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please sign in first", {
            description: "Please sign in first",
            icon: <AlertCircle className="h-5 w-5" />,
            action: {
              label: "Sign in",
              onClick: () => router.push("/auth/signin"),
            },
          });
          return;
        }
        throw new Error(data.error || "Payment initialization failed");
      }

      // 显示处理中提示
      toast.info("Loading...", {
        description: "Redirecting to payment page...",
      });

      // 重定向到 Stripe Checkout 页面
      setTimeout(() => {
        router.push(data.url);
      }, 1000);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Payment failed", {
        description: "An error occurred during payment, please try again later",
        icon: <AlertCircle className="h-5 w-5" />,
      });
    } finally {
      // 重置状态
      setIsLoading(false);
      isProcessingRef.current = false;
      setPaymentProcessing(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || isProcessingRef.current || isAnyPaymentProcessing}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children || "Buy now"
      )}
    </Button>
  );
}
