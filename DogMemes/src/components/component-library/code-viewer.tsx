"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface CodeViewerProps {
  componentId: string;
}

// 组件代码示例
const componentCodes = {
  hero: `"use client";

import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Layers,
  Code,
  Box,
} from "lucide-react";
import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useTranslations } from "next-intl";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

import { MagicCard } from "@/components/magicui/magic-card";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { BoxReveal } from "@/components/magicui/box-reveal";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

const features = [
  {
    icon: Layers,
    id: "templates",
    accentFrom: "from-indigo-500",
    accentTo: "to-blue-500",
  },
  {
    icon: Code,
    id: "infrastructure",
    accentFrom: "from-rose-500",
    accentTo: "to-pink-500",
  },
  {
    icon: Box,
    id: "deployment",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
  },
];

export function HeroSection() {
  const t = useTranslations("hero");
  const usage = useTranslations("usage");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white via-70% to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:via-70% dark:to-blue-950 py-8 sm:py-10 md:py-14 lg:py-18">
      {/* 动感背景 */}
      <AnimatedGridPattern
        className="absolute inset-0 z-0"
        gridSize={48}
        strokeColor="#e0e7ef"
        maxOpacity={0.12}
      />

      {/* 特色徽章 */}
      <div className="mb-6 sm:mb-8 flex justify-center">
        <Badge
          variant="outline"
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-300"
        >
          <Sparkles className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          {t("specialOffer")}
          <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Badge>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="mx-auto max-w-3xl text-center mb-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {t("title")}
            <span className="block mt-4">
              <AnimatedGradientText className="text-4xl sm:text-5xl font-extrabold">
                {t("description")}
              </AnimatedGradientText>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-300">
            {t("subtitle.main")}
          </p>
          <p className="mt-6 text-base font-bold leading-8 text-zinc-600 dark:text-zinc-300">
            {t("subtitle.highlight")}
          </p>
        </div>
      </div>
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-16 sm:-right-32 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-16 sm:-left-32 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-gradient-to-r from-blue-400/5 to-purple-600/5 rounded-full blur-[100px]"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center">
            <div className="w-full max-w-[90vw] sm:max-w-[600px] text-left">
              <Terminal className="min-h-[200px] sm:min-h-[250px] overflow-x-auto">
                <TypingAnimation>{\`> \${t("terminal.start")\}\`}</TypingAnimation>

                <AnimatedSpan
                  delay={2000}
                  className="text-green-500 whitespace-pre-wrap break-words"
                >
                  <span>✔ {usage("steps.get.title")}</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2500} className="text-green-500">
                  <span>✔ {usage("steps.customize.title")}</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="text-green-500">
                  <span>✔ {usage("steps.deploy.title")}</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3500} className="text-blue-500">
                  <span>ℹ Updated 1 file:</span>
                  <span className="pl-2">- SaaS/Raven</span>
                </AnimatedSpan>

                <TypingAnimation
                  delay={4000}
                  className="text-muted-foreground whitespace-pre-wrap break-words"
                >
                  {\`\${t("success")}\`}
                </TypingAnimation>
              </Terminal>
            </div>
          </div>

          {/* 用户头像群组 */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="flex -space-x-1.5 sm:-space-x-2">
              <AvatarCircles numPeople={99} avatarUrls={avatars} />
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0">
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("users.count")}
              </span>{" "}
              {t("users.chooseRaven")}
            </div>
          </div>

          {/* CTA 按钮 */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="#">
              <AnimatedGradientText className="w-36">
                {t("cta.getStarted")}
              </AnimatedGradientText>
            </Link>
            <Link href="/docs" className="w-full sm:w-auto">
              <RainbowButton className="w-36">{t("cta.doc")}</RainbowButton>
            </Link>
          </div>

          {/* 特性标签 */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500" />
              <span>{t("features.lifetimeUpdates")}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              <span>{t("features.unlimitedProjects")}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
              <span>{t("features.technicalSupport")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,

  header: `""use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useSession, signOut } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { Menu, LogOut, Package, UserPlus } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  currentPage?: string;
  hideOnComponentPage?: boolean;
}

export function Navbar({ currentPage, hideOnComponentPage }: NavbarProps) {
  const { data: session, status } = useSession();
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === "dark";
  const pathname = usePathname();
  const router = useRouter();
  // 添加滚动监听
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 如果当前页面是组件页面并且设置了隐藏，则不显示导航栏
  if (
    hideOnComponentPage &&
    (currentPage === "component" ||
      (pathname && pathname.includes("/component")))
  ) {
    return null;
  }

  // 获取用户名首字母作为头像备用显示
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  // 确保图片URL是字符串类型
  const userImage = session?.user?.image || undefined;

  // 用户头像下拉菜单组件
  const UserMenu = () => {
    if (status === "loading") {
      return (
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {t("loading")}
        </div>
      );
    }

    if (!session) {
      return (
        <Link href="/auth/signin">
          <Button
            size="sm"
            className={\`transition-all duration-300 \${scrolled ? "scale-95" : ""}\`}
          >
            {t("signIn")}
          </Button>
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src={userImage} alt={session.user?.name || "User"} />
              <AvatarFallback>{getInitials(session.user?.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">
                {session.user?.name || t("anonymous")}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/users/my-orders">
              <DropdownMenuItem>
                <Package className="mr-2 h-4 w-4" />
                <span>{t("myOrders")}</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/users/my-invites">
              <DropdownMenuItem>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>{t("myInvitations")}</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-red-600 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("signOut")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const links = {
    "/": {
      title: t("home"),
      icon: "RiHomeLine",
    },
    "/component": {
      title: t("componentLibrary"),
      icon: "RiComponentLibraryLine",
    },
    "/posts": {
      title: t("posts"),
      icon: "RiBookLine",
    },
  };

  return (
    <nav
      className={\`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm transition-all duration-300 \${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 shadow-sm py-2"
          : "bg-white/95 dark:bg-gray-900/95 py-2"
      } dark:border-gray-800\`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={\`flex items-center justify-between transition-all duration-300 \${
            scrolled ? "h-12" : "h-14"
          }\`}
        >
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={\`flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white transition-all duration-300 \${
                scrolled ? "scale-95" : ""
              }\`}
            >
              <div
                className={\`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 \${
                  scrolled ? "w-10 h-10" : "w-12 h-12"
                }\`}
              >
                <Image
                  src={isDarkTheme ? "/logo-w.png" : "/logo.png"}
                  alt={process.env.NEXT_PUBLIC_BRAND_NAME || "Raven Logo"}
                  fill
                  className="object-contain"
                />
              </div>
              <span>{process.env.NEXT_PUBLIC_BRAND_NAME || "Raven"}</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {Object.entries(links).map(([path, { title }]) => (
                <Link
                  href={path}
                  key={path}
                  className={\`text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors \${
                    currentPage === path
                      ? "text-gray-900 dark:text-white font-medium"
                      : ""
                  }\`}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>

          {/* 桌面端控件 */}
          <div className="hidden md:flex items-center gap-4">
            <UserMenu />
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t("menu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <SheetHeader className="pb-4 border-b">
                  <SheetTitle className="text-left">{t("menu")}</SheetTitle>
                </SheetHeader>

                {/* 导航链接 */}
                <div className="flex flex-col space-y-4 mt-6 flex-1">
                  {Object.entries(links).map(([path, { title }]) => (
                    <Link href={path} key={path}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        {title}
                      </Button>
                    </Link>
                  ))}
                </div>

                {/* 底部用户控件 */}
                <div className="mt-auto pt-6 border-t">
                  {status === "loading" ? (
                    <div className="text-sm text-gray-600 dark:text-gray-300 py-2">
                      {t("loading")}
                    </div>
                  ) : session ? (
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={userImage}
                            alt={session.user?.name || "User"}
                          />
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {session.user?.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {session.user?.email || "635384073@qq.com"}
                          </p>
                        </div>
                      </div>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => router.push("/users/my-orders")}
                        >
                          <Package className="mr-2 h-4 w-4" />
                          {t("myOrders") || "我的订单"}
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => router.push("/users/my-invites")}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          {t("myInvitations") || "我的邀请"}
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => signOut()}
                          className="w-full text-red-600"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          {t("signOut") || "退出登录"}
                        </Button>
                      </SheetClose>
                    </div>
                  ) : (
                    <SheetClose asChild>
                      <Link href="/auth/signin" className="block">
                        <Button size="sm" className="w-full">
                          {t("signIn")}
                        </Button>
                      </Link>
                    </SheetClose>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t("toggleTheme")}
                    </span>
                    <ThemeToggle />
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t("toggleLanguage")}
                    </span>
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
`,

  feature: `"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CreditCard,
  Zap,
  Palette,
  Code,
  Mail,
  BarChart3,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useId } from "react";

export function FeaturesSection() {
  const t = useTranslations("features");

  const features = [
    {
      icon: Shield,
      id: "auth",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      icon: CreditCard,
      id: "payment",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/50",
    },
    {
      icon: Mail,
      id: "marketing",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      icon: Palette,
      id: "config",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
    },
    {
      icon: Code,
      id: "developer",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    {
      icon: BarChart3,
      id: "analytics",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50 dark:bg-teal-950/50",
    },
  ];

  const problems = [
    {
      icon: Code,
      id: "ui",
      bgColor: "from-red-500 to-pink-500",
    },
    {
      icon: CreditCard,
      id: "payment",
      bgColor: "from-yellow-500 to-orange-500",
    },
    {
      icon: Zap,
      id: "foundation",
      bgColor: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <section className="relative py-10 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/80 to-white dark:from-zinc-900/80 dark:to-zinc-950"></div>
      <Grid />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t("title.first")}
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("title.highlight")}
            </span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        {/* 功能网格 - 新设计 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 dark:to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <CardHeader className="relative space-y-4">
                <div
                  className={\`w-12 h-12 rounded-xl bg-gradient-to-br \${feature.color} p-2.5 flex items-center justify-center\`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                  {t(\`items.\${feature.id}.title\`)}
                </CardTitle>
                <CardDescription className="text-base">
                  {t(\`items.\${feature.id}.description\`)}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative pt-4">
                <ul className="space-y-3">
                  {t
                    .raw(\`items.\${feature.id}.details\`)
                    .map((detail: string, detailIndex: number) => (
                      <li
                        key={detailIndex}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div
                          className={\`w-1.5 h-1.5 rounded-full mr-3 bg-gradient-to-r \${feature.color}\`}
                        ></div>
                        {detail}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 问题解决部分 - 新设计 */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("problems.title")}
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("problems.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 group hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={\`absolute inset-0 bg-gradient-to-br \${problem.bgColor} opacity-10\`}
                ></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <problem.icon className="h-8 w-8 text-gray-900 dark:text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(\`problems.items.\${problem.id}.title\`)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(\`problems.items.\${problem.id}.description\`)}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Grid = () => {
  const patternId = useId();
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
      <div className="absolute h-full w-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern
              id={patternId}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              x="-12"
              y="4"
            >
              <path
                d="M.5 40V.5H40"
                fill="none"
                className="stroke-zinc-200/30 dark:stroke-zinc-700/30"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill={\`url(#\${patternId})\`}
          />
        </svg>
      </div>
    </div>
  );
};
`,

  stats: `import React from "react";
import { useTranslations } from "next-intl";

interface StatItemProps {
  id: string;
  title?: string;
  value?: string;
  description?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  id,
  title,
  value,
  description,
}) => {
  const t = useTranslations("stats");

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-gray-600 font-medium mb-2">
        {title || t(\`items.\${id}.title\`)}
      </h3>
      <p className="text-7xl font-bold mb-2">
        {value || t(\`items.\${id}.value\`)}
      </p>
      <p className="text-gray-500">
        {description || t(\`items.\${id}.description\`)}
      </p>
    </div>
  );
};

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">{t("title")}</h2>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem id="customers" />
          <StatItem id="components" />
          <StatItem id="time" />
        </div>
      </div>
    </section>
  );
}
`,

  pricing: `"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ZapIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { CheckoutButton } from "@/components/stripe/checkout-button";

interface PricingFeature {
  id: string;
  text?: string;
}

interface PricingPlan {
  id: string;
  name?: string;
  originalPrice?: string;
  price?: string;
  description?: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText?: string;
  additionalText?: string;
  additionalFeatures?: string;
  color?: string;
}

export function Pricing() {
  const t = useTranslations("pricing");

  const plans: PricingPlan[] = [
    {
      id: "starter",
      originalPrice: "$299",
      price: "$199",
      features: [
        { id: "nextjs" },
        { id: "seo" },
        { id: "blog" },
        { id: "payment" },
        { id: "data" },
        { id: "oauth" },
        { id: "i18n" },
      ],
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: "standard",
      originalPrice: "$349",
      price: "$249",
      isPopular: true,
      features: [
        { id: "deploy" },
        { id: "privacy" },
        { id: "analytics" },
        { id: "search" },
        { id: "discord" },
        { id: "support" },
        { id: "updates" },
      ],
      color: "from-violet-400 to-purple-400",
    },
    {
      id: "premium",
      originalPrice: "$399",
      price: "$299",
      features: [
        { id: "components" },
        { id: "ai" },
        { id: "console" },
        { id: "admin" },
        { id: "credits" },
        { id: "api" },
        { id: "priority" },
      ],
      color: "from-rose-400 to-pink-400",
    },
  ];

  return (
    <section className="relative py-10 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/30 dark:to-zinc-950"></div>
      <Grid />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              <Card
                className={cn(
                  "h-full bg-gradient-to-b from-white to-slate-50/30 dark:from-zinc-900 dark:to-slate-900/10 rounded-2xl overflow-hidden group",
                  "border border-slate-100 dark:border-slate-800",
                  "transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30",
                  plan.isPopular &&
                    "ring-2 ring-violet-400 dark:ring-violet-500"
                )}
              >
                {plan.isPopular && (
                  <>
                    <div className="absolute top-0 left-2 right-2 h-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-b-full"></div>
                    <div className="absolute top-0 left-[8px] w-1 h-1 bg-violet-400 rounded-full"></div>
                    <div className="absolute top-0 right-[8px] w-1 h-1 bg-purple-400 rounded-full"></div>
                  </>
                )}

                <div className="flex flex-col h-full p-8">
                  <div className="mb-8 relative">
                    {plan.isPopular && (
                      <Badge className="absolute -top-3 right-0 bg-gradient-to-r from-violet-400 to-purple-400 text-white hover:from-violet-500 hover:to-purple-500">
                        {t("popularBadge")}
                      </Badge>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {plan.name || t(\`plans.\${plan.id}.name\`)}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      {plan.originalPrice && (
                        <span className="text-gray-400 line-through text-lg mr-2">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        {t("currency")}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {plan.description || t(\`plans.\${plan.id}.description\`)}
                    </p>
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div
                            className={\`w-5 h-5 rounded-full bg-gradient-to-br \${plan.color} flex items-center justify-center mr-3 shrink-0 shadow-sm\`}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-200">
                            {feature.text || t(\`features.\${feature.id}\`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <CheckoutButton
                      paymentLink="https://buy.stripe.com/7sI5lH2gZ5a363u28d"
                      className={cn(
                        "w-full text-base font-medium",
                        plan.isPopular
                          ? \`bg-gradient-to-r \${plan.color} text-white hover:opacity-90 shadow-md shadow-slate-200/50 dark:shadow-slate-900/30\`
                          : "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-slate-50 dark:hover:bg-zinc-700 border border-slate-100 dark:border-slate-800"
                      )}
                      productId={plan.id}
                      productName={t(\`plans.\${plan.id}.name\`)}
                      amount={parseInt(
                        plan.price?.replace(/[^0-9]/g, "") || "0"
                      )}
                      credits={0}
                      orderDetail={t(\`plans.\${plan.id}.description\`)}
                    >
                      购买商品
                    </CheckoutButton>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                      {t("payOnce")}
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 dark:to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Grid = () => {
  const patternId = useId();
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
      <div className="absolute h-full w-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern
              id={patternId}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              x="-12"
              y="4"
            >
              <path
                d="M.5 40V.5H40"
                fill="none"
                className="stroke-slate-200/40 dark:stroke-slate-700/20"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill={\`url(#\${patternId})\`}
          />
        </svg>
      </div>
    </div>
  );
};`,

  cta: `"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Star,
  Zap,
  Gift,
  Users,
  Shield,
  Infinity,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("cta");

  const features = t.raw("features");

  const stats = [
    { icon: Users, value: "30+", label: t("stats.customers") },
    { icon: Star, value: "340+", label: t("stats.components") },
    { icon: Zap, value: "600+", label: t("stats.commits") },
  ];

  return (
    <section className="relative overflow-hidden bg-indigo-900 py-24 sm:py-32">
      {/* 波浪图形背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-48 opacity-20 text-indigo-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,176C384,160,480,96,576,90.7C672,85,768,139,864,149.3C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute top-0 left-0 right-0 w-full h-48 opacity-20 text-indigo-600 transform rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,176C384,160,480,96,576,90.7C672,85,768,139,864,149.3C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-xl leading-8 text-indigo-100">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Button
            variant="outline"
            className="bg-white text-indigo-900 hover:bg-indigo-50"
          >
            {t("buttons.get")}
          </Button>
          <Button
            variant="outline"
            className="border-white text-black hover:bg-white/10 dark:text-white"
          >
            {t("buttons.docs")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
`,

  footer: `"use client";

import Link from "next/link";
import { Github, Twitter, Mail, Heart, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");

  const productLinks = [
    { name: t("links.product.features"), href: "#features" },
    { name: t("links.product.pricing"), href: "#pricing" },
    { name: t("links.product.faq"), href: "#faq" },
    { name: t("links.product.demo"), href: "/magicui" },
  ];

  const resourceLinks = [
    { name: t("links.resources.blog"), href: "/blog" },
    { name: t("links.resources.docs"), href: "/docs" },
    { name: t("links.resources.roadmap"), href: "/roadmap" },
    { name: t("links.resources.components"), href: "/components" },
  ];

  const companyLinks = [
    { name: t("links.company.about"), href: "/about" },
    { name: t("links.company.contact"), href: "#contact" },
    { name: t("links.company.newsletter"), href: "#newsletter" },
    { name: t("links.company.showcase"), href: "/showcase" },
  ];

  const legalLinks = [
    { name: t("links.legal.license"), href: "/license" },
    { name: t("links.legal.privacy"), href: "/privacy" },
    { name: t("links.legal.terms"), href: "/terms" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    {
      name: t("links.social.email"),
      href: "mailto:hello@raven.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* 主要内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* 品牌信息 */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Image src="/logo.png" alt="Raven" width={32} height={32} />
              </div>
              <span className="text-xl font-bold text-white">
                {process.env.NEXT_PUBLIC_BRAND_NAME || "Raven"}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t("description")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* 产品链接 */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("categories.product")}
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 资源链接 */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("categories.resources")}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 公司链接 */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("categories.company")}
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 法律链接 */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              {t("categories.legal")}
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* 版权信息 */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>{t("copyright")}</span>
            </div>

            {/* 构建信息 */}
            {/* <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>使用</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>构建，基于</span>
              <Link
                href="https://ravensaas.io"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                RavenSaas
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div> */}
          </div>
        </div>

        {/* 徽章区域 */}
        {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            监控您的域名评级
          </div>
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            Peerlist 徽章
          </div>
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            Open-Launch 每日前2名获奖者
          </div>
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            最佳 SaaS 样板代码认证徽章
          </div>
        </div> */}
      </div>
    </footer>
  );
}
`,

  branding: `"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function BrandingSection() {
  const t = useTranslations("branding");

  const technologies = [
    { name: "Next.js", logo: "/imgs/logos/next.svg" },
    { name: "React", logo: "/imgs/logos/react.svg" },
    { name: "TailwindCSS", logo: "/imgs/logos/tailwind.svg" },
    { name: "Shadcn/UI", logo: "/imgs/logos/shadcn.svg" },
    { name: "Vercel", logo: "/imgs/logos/vercel.svg" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t("title")}
        </h2>

        <div className="flex flex-wrap justify-center gap-8 items-center">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-2">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={128}
                  height={128}
                  className="dark:filter dark:invert"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t("description")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.modern")}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.fast")}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.seo")}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.responsive")}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}`,

  introduce: `"use client";

import React, { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Zap, Layers, Code, Box, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
  borderHover: string;
  iconHover: string;
}

const CardDecorator = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    aria-hidden
    className={cn(
      "relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]",
      className
    )}
  >
    <div className="absolute inset-0 [--border:black] dark:[--border:white] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l rounded-sm">
      {children}
    </div>
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  accentColor,
  borderHover,
  iconHover,
}: FeatureCardProps) => {
  return (
    <div className="group shadow-zinc-950/5">
      <CardHeader className="pb-3 relative">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.06] transition-opacity duration-500",
            accentColor
          )}
        />

        <CardDecorator className={borderHover}>
          <Icon className={cn("size-6", iconHover)} aria-hidden />
        </CardDecorator>

        <h3 className="mt-6 font-medium text-foreground">{title}</h3>
        <CardContent className="px-0 pt-4">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </CardHeader>
    </div>
  );
};

export function Introduce() {
  const t = useTranslations("introduce");

  const features = [
    {
      icon: Layers,
      id: "templates",
      accentColor: "from-indigo-500 to-blue-500",
      borderHover:
        "group-hover:border-indigo-500/30 dark:group-hover:border-indigo-500/20",
      iconHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    },
    {
      icon: Code,
      id: "infrastructure",
      accentColor: "from-rose-500 to-pink-500",
      borderHover:
        "group-hover:border-rose-500/30 dark:group-hover:border-rose-500/20",
      iconHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    },
    {
      icon: Box,
      id: "deployment",
      accentColor: "from-emerald-500 to-teal-500",
      borderHover:
        "group-hover:border-emerald-500/30 dark:group-hover:border-emerald-500/20",
      iconHover:
        "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
  ];

  return (
    <section className="bg-background py-10 md:py-20">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-8 px-3 py-1 border-border hover:bg-muted transition-colors duration-300"
          >
            <Zap className="mr-2 h-4 w-4 text-primary" />
            {t("badge")}
          </Badge>

          <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-foreground">
            {t("title.first")}
            <span className="block mt-1 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                {t("title.highlight")}
              </span>
              <div className="absolute -bottom-1 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0"></div>
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <FeatureCard
                icon={feature.icon}
                title={t(\`features.\${feature.id}.title\`)}
                description={t(\`features.\${feature.id}.description\`)}
                accentColor={feature.accentColor}
                borderHover={feature.borderHover}
                iconHover={feature.iconHover}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  benefit: `"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CheckCircle, Package, Zap } from "lucide-react";

interface BenefitItem {
  id: string;
  icon: React.ReactNode;
}

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full dark:opacity-[0.1] opacity-[0.3]">
    <div className="absolute h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="h-full w-full"
        style={{
          backgroundImage: \`url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")\`,
        }}
      />
    </div>
  </div>
);

const GradientBlob = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="h-[300px] w-[300px] rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl"
    />
  </div>
);

export function Benefit() {
  const t = useTranslations("benefit");

  const benefits: BenefitItem[] = [
    {
      id: "framework",
      icon: <CheckCircle className="size-5" />,
    },
    {
      id: "templates",
      icon: <Package className="size-5" />,
    },
    {
      id: "guidance",
      icon: <Zap className="size-5" />,
    },
  ];

  return (
    <section className="relative overflow-hidden py-4 md:py-12">
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid min-h-[400px] md:min-h-[400px] gap-8 md:gap-12 lg:grid-cols-2 lg:gap-8">
          {/* 左侧视频 */}
          <div className="relative flex min-h-[300px] md:min-h-[400px] items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg overflow-hidden rounded-xl md:rounded-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-video w-full"
              >
                <video
                  className="h-full w-full rounded-xl md:rounded-2xl object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/benefit.mov" type="video/mp4" />
                  您的浏览器不支持视频标签。
                </video>
              </motion.div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="relative pt-4 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4 md:gap-6"
            >
              <h2 className="text-balance text-3xl md:text-4xl font-medium tracking-tight lg:text-5xl">
                {t("title")}
              </h2>

              <div className="mt-4 md:mt-8 grid gap-4 md:gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group relative rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex size-8 md:size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {t(\`items.\${benefit.id}.title\`)}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t(\`items.\${benefit.id}.description\`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
`,

  usage: `"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Circle } from "@/components/magicui/circle";

export function Usage() {
  const t = useTranslations("usage");
  const containerRef = useRef<HTMLDivElement>(null);

  // 中心节点
  const centerRef = useRef<HTMLDivElement>(null);

  // 四个步骤节点
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  const steps = [
    { number: "1", id: "get", ref: step1Ref },
    { number: "2", id: "start", ref: step2Ref },
    { number: "3", id: "customize", ref: step3Ref },
    { number: "4", id: "deploy", ref: step4Ref },
  ];

  return (
    <section className="py-10 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0  opacity-30" />

      <div className="container relative mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-2">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t("title")}
          </h2>
        </div>

        {/* 动画展示区域 */}
        <div className="relative h-[200px] " ref={containerRef}>
          {/* 四个步骤的圆，位于水平线上 */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step1Ref}
              className="size-16 border-indigo-100 bg-white"
            >
              <span className="text-xl font-bold text-indigo-600">1</span>
            </Circle>
          </div>

          <div className="absolute left-[35%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step2Ref}
              className="size-16 border-indigo-100 bg-white"
            >
              <span className="text-xl font-bold text-indigo-600">2</span>
            </Circle>
          </div>

          <div className="absolute left-[60%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step3Ref}
              className="size-16 border-indigo-100 bg-white"
            >
              <span className="text-xl font-bold text-indigo-600">3</span>
            </Circle>
          </div>

          <div className="absolute left-[85%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step4Ref}
              className="size-16 border-indigo-100 bg-white"
            >
              <span className="text-xl font-bold text-indigo-600">4</span>
            </Circle>
          </div>

          {/* 连接线放在底层 */}
          <div className="z-10">
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step1Ref}
              toRef={step2Ref}
              pathColor="#E0E7FF"
              pathOpacity={0.8}
              gradientStartColor="#4F46E5"
              gradientStopColor="#818CF8"
              pathWidth={3}
            />

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step2Ref}
              toRef={step3Ref}
              pathColor="#E0E7FF"
              pathOpacity={0.8}
              gradientStartColor="#4F46E5"
              gradientStopColor="#818CF8"
              pathWidth={3}
            />

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step3Ref}
              toRef={step4Ref}
              pathColor="#E0E7FF"
              pathOpacity={0.8}
              gradientStartColor="#4F46E5"
              gradientStopColor="#818CF8"
              pathWidth={3}
            />
          </div>
        </div>

        {/* 步骤卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex justify-center items-center h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 mr-3">
                  <span className="font-bold">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t(\`steps.\${step.id}.title\`)}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {t(\`steps.\${step.id}.description\`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,

  showcase: `// ... 其他 import ...
import React from "react";
import { useTranslations } from "next-intl";

export function Showcase() {
  const t = useTranslations("showcase");

  const showcases = [
    {
      id: "raphael",
      img: "/imgs/example.png",
    },
    {
      id: "sitesnapper",
      img: "/imgs/example.png",
    },
    {
      id: "seo",
      img: "/imgs/example.png",
    },
    {
      id: "trends",
      img: "/imgs/example.png",
    },
    {
      id: "deepseek",
      img: "/imgs/example.png",
    },
    {
      id: "rednote",
      img: "/imgs/example.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">{t("title")}</h2>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ">
        {showcases.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
          >
            <img
              src={item.img}
              alt={t(\`items.\${item.id}.title\`)}
              className="w-full object-cover rounded mb-4 border"
            />
            <h3 className="text-xl font-semibold mb-2">
              {t(\`items.\${item.id}.title\`)}
            </h3>
            <p className="text-gray-500 text-center">
              {t(\`items.\${item.id}.desc\`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
`,

  testimonial: `import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface TestimonialProps {
  id: string;
  name?: string;
  title?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  content?: string;
  image?: string;
  className?: string;
}

interface TestimonialGridProps {
  testimonials: TestimonialProps[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Testimonial({
  id,
  name,
  title,
  avatarSrc,
  avatarFallback,
  content,
  image,
  className,
}: TestimonialProps) {
  const t = useTranslations("testimonial");

  return (
    <Card
      className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <CardContent className="p-8">
        <div className="mb-6 flex items-start space-x-4">
          <Image
            src={avatarSrc || "/imgs/head/1.jpg"}
            alt={name || t(\`items.\${id}.name\`)}
            width={48}
            height={48}
            className="rounded-full ring-2 ring-primary/10"
          />

          <div className="space-y-1">
            <div className="font-semibold text-lg">
              {name || t(\`items.\${id}.name\`)}
            </div>
            {(title || t(\`items.\${id}.title\`, { fallback: "" }) !== "") && (
              <div className="text-sm text-muted-foreground/80">
                {title || t(\`items.\${id}.title\`)}
              </div>
            )}
          </div>
        </div>
        <p className="text-foreground/90 leading-relaxed mb-6">
          {content || t(\`items.\${id}.content\`)}
        </p>
        {image && (
          <div className="mt-6 rounded-xl overflow-hidden shadow-sm">
            <img
              src={image}
              alt={t("screenshot", { name: name || t(\`items.\${id}.name\`) })}
              className="w-full h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TestimonialGrid({
  testimonials,
  title,
  subtitle,
  className,
}: TestimonialGridProps) {
  const t = useTranslations("testimonial");

  return (
    <section className={cn("py-20", className)}>
      <div className="container px-4 mx-auto">
        {(title || t("title", { fallback: "" }) !== "") && (
          <div className="mb-8 text-center">
            <AnimatedGradientText className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title || t("title")}
            </AnimatedGradientText>
            {(subtitle || t("subtitle", { fallback: "" }) !== "") && (
              <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground/90 leading-relaxed">
                {subtitle || t("subtitle")}
              </p>
            )}
          </div>
        )}
        <BoxReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </BoxReveal>
      </div>
    </section>
  );
}
`,

  faq: `"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export function FAQSection() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: t("questions.what.question"),
      answer: t("questions.what.answer"),
    },
    {
      question: t("questions.skills.question"),
      answer: t("questions.skills.answer"),
    },
    {
      question: t("questions.types.question"),
      answer: t("questions.types.answer"),
    },
    {
      question: t("questions.time.question"),
      answer: t("questions.time.answer"),
    },
    {
      question: t("questions.infrastructure.question"),
      answer: t("questions.infrastructure.answer"),
    },
    {
      question: t("questions.customization.question"),
      answer: t("questions.customization.answer"),
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="mb-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 last:border-0">
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="py-6 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
                    {openIndex === index ? (
                      <Minus className="h-4 w-4 text-gray-700" />
                    ) : (
                      <Plus className="h-4 w-4 text-gray-700" />
                    )}
                  </button>
                </div>

                {openIndex === index && (
                  <div className="mt-4 pr-10">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`,
};

export function CodeViewer({ componentId }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const code = componentCodes[componentId as keyof typeof componentCodes];

  if (!code) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            此组件的代码示例暂未提供
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">代码示例</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-green-500">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>复制代码</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <SyntaxHighlighter
            language="tsx"
            style={theme === "dark" ? oneDark : oneLight}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
            showLineNumbers={true}
            wrapLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  );
}
