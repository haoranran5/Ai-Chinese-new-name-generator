"use client";

import { useEffect, useCallback, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Script from "next/script";

// 更新类型定义，添加cancel方法
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: (momentListener?: any) => void;
          renderButton: (parent: HTMLElement, options: any) => void;
          cancel: () => void; // 添加cancel方法
        };
      };
    };
  }
}

// 定义类型
interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

interface GoogleOneTapNotification {
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  isSkippedMoment: () => boolean;
  getSkippedReason: () => string;
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
}

export default function GoogleOneTap() {
  const { data: session, status } = useSession();
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
  const [isProcessingLogin, setIsProcessingLogin] = useState(false);

  // 检查是否启用了 Google 登录和 One Tap 功能
  const isGoogleEnabled = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true";
  const isOneTapEnabled = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED === "true";

  // 如果 Google 登录或 One Tap 功能未启用，则不渲染任何内容
  if (!isGoogleEnabled || !isOneTapEnabled) {
    return null;
  }

  // 检查是否应该显示登录提示
  useEffect(() => {
    // 检查是否已经在本地存储中标记为已关闭
    const isDismissed = localStorage.getItem("login-prompt-dismissed");
    if (isDismissed) {
      // 用户已关闭提示，尝试取消 One Tap
      if (window.google?.accounts?.id?.cancel) {
        window.google.accounts.id.cancel();
      }
    }
  }, []);

  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      if (isProcessingLogin) return;

      try {
        setIsProcessingLogin(true);

        // 将凭证数据保存到会话存储中，以便调试
        sessionStorage.setItem("google_credential", response.credential);

        // 直接尝试解析凭证，确保我们有用户信息可用
        let decodedPayload = null;
        try {
          decodedPayload = JSON.parse(atob(response.credential.split(".")[1]));
        } catch (decodeError) {
          // 解码错误处理但不输出日志
        }

        // 使用专门的google-one-tap提供者处理登录
        const result = await signIn("google-one-tap", {
          credential: response.credential,
          redirect: false,
          callbackUrl: "/",
        });

        if (result?.ok) {
          window.location.href = result.url || "/";
        } else if (result?.error) {
          // 如果使用google-one-tap提供者失败，尝试标准Google登录
          window.location.href = `/api/auth/signin/google?callbackUrl=${encodeURIComponent(
            "/"
          )}`;
        }
      } catch (error) {
        // 出现异常时，重定向到标准登录页面
        window.location.href = `/api/auth/signin?callbackUrl=${encodeURIComponent(
          "/"
        )}`;
      } finally {
        setIsProcessingLogin(false);
      }
    },
    [isProcessingLogin]
  );

  const initializeGoogleOneTap = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).google?.accounts && !session && !isProcessingLogin) {
      try {
        // 检查是否已经在本地存储中标记为已关闭
        const isDismissed = localStorage.getItem("login-prompt-dismissed");
        if (isDismissed) {
          return;
        }

        // 确保使用正确的客户端ID
        const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;

        if (!clientId) {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          context: "signin",
          ux_mode: "popup",
          auto_select: false, // 从login-prompt中合并，可考虑设为true
          cancel_on_tap_outside: true, // 从login-prompt合并
          itp_support: true, // 增加ITP支持
          // 不要同时使用 FedCM
          use_fedcm_for_prompt: false,
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).google.accounts.id.prompt(
          (notification: GoogleOneTapNotification) => {
            if (notification.isDismissedMoment()) {
              const reason = notification.getDismissedReason();
              if (reason === "user_cancel") {
                localStorage.setItem("login-prompt-dismissed", "true");
              }
            }
          }
        );
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes(
            "Only one navigator.credentials.get request may be outstanding at one time"
          )
        ) {
          setTimeout(initializeGoogleOneTap, 1000);
        }
      }
    }
  }, [session, handleCredentialResponse, isProcessingLogin]);

  useEffect(() => {
    if (isGoogleScriptLoaded) {
      initializeGoogleOneTap();
    }
  }, [isGoogleScriptLoaded, initializeGoogleOneTap]);

  useEffect(() => {
    if (session) {
      // 用户已登录，取消 One Tap 提示
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).google?.accounts?.id?.cancel?.();
    }
  }, [session]);

  // 从login-prompt.tsx合并，添加可选的登录按钮渲染功能
  const renderLoginButton = useCallback(() => {
    if (!window.google?.accounts || status !== "unauthenticated") return;

    // 渲染登录按钮作为备选
    const buttonContainer = document.getElementById("google-signin-button");
    if (buttonContainer) {
      buttonContainer.classList.remove("hidden");
      window.google.accounts.id.renderButton(buttonContainer, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
      });
    }
  }, [status]);

  // 在脚本加载后也初始化登录按钮
  useEffect(() => {
    if (isGoogleScriptLoaded) {
      renderLoginButton();
    }
  }, [isGoogleScriptLoaded, renderLoginButton]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={() => setIsGoogleScriptLoaded(true)}
        strategy="afterInteractive"
      />
    </>
  );
}
