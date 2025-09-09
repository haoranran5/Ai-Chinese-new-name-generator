"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function SignInForm() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error] = useState<string | null>(null);
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  // 从环境变量获取登录方式的启用状态
  const isGoogleEnabled = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true";
  const isGithubEnabled = process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true";

  useEffect(() => {
    // 检查 URL 参数，如果是 signup 模式则切换到注册
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setIsSignUp(true);
    }

    // 检查是否有邀请码参数
    const inviteCode = searchParams.get("inviteCode");
    if (inviteCode) {
      // 将邀请码保存到 localStorage，登录成功后使用
      localStorage.setItem("pendingInviteCode", inviteCode);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 shadow-2xl bg-white dark:bg-gray-900">
        <CardHeader className="text-center pb-6">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
            <Image
              src="/logo.png"
              alt="logo"
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isSignUp ? t("signin.create_account") : t("signin.welcome_back")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {isSignUp
              ? t("signin.create_account")
              : t("signin.welcome_back_description")}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {t("signin.name")}
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  required={isSignUp}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("signin.email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="h-12 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("signin.password")}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="h-12 pr-10 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("signin.processing")}
                </span>
              ) : isSignUp ? (
                t("signin.sign_up")
              ) : (
                t("signin.sign_in")
              )}
            </Button>
          </form>

          {/* 只有在至少有一个第三方登录方式启用时才显示分隔线 */}
          {(isGoogleEnabled || isGithubEnabled) && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                  {t("signin.or_continue_with")}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {/* Google 登录按钮 - 仅在启用时显示 */}
            {isGoogleEnabled && (
              <Button
                variant="outline"
                className="w-full h-12 gap-3 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => {
                  setLoadingProvider("google");
                  signIn("google", {
                    callbackUrl: "/",
                  });
                }}
                disabled={loadingProvider !== null}
              >
                {loadingProvider === "google" ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700 dark:text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("signin.processing")}
                  </span>
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    {t("signin.sign_in_with_google")}
                  </>
                )}
              </Button>
            )}

            {/* GitHub 登录按钮 - 仅在启用时显示 */}
            {isGithubEnabled && (
              <Button
                variant="outline"
                className="w-full h-12 gap-3 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => {
                  setLoadingProvider("github");
                  signIn("github", {
                    callbackUrl: "/",
                  });
                }}
                disabled={loadingProvider !== null}
              >
                {loadingProvider === "github" ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700 dark:text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("signin.processing")}
                  </span>
                ) : (
                  <>
                    <Github className="h-5 w-5" />
                    {t("signin.sign_in_with_github")}
                  </>
                )}
              </Button>
            )}
          </div>
          {/* 
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isSignUp
                ? t("signin.already_have_an_account")
                : t("signin.dont_have_an_account")}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                {isSignUp ? t("signin.sign_in") : t("signin.sign_up")}
              </button>
            </p>
          </div> */}

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t("signin.by_continuing")}
              <Link
                href="/terms"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("signin.terms_of_service")}
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t("signin.privacy_policy")}
              </Link>
              <br />
              {t("signin.by_continuing_agree")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
