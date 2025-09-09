"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useSession, signOut } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { Menu, LogOut, Package, UserPlus, Wallet, Key } from "lucide-react";
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
            className={`transition-all duration-300 ${
              scrolled ? "scale-95" : ""
            }`}
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
            <Link href="/users/my-credits">
              <DropdownMenuItem>
                <Wallet className="mr-2 h-4 w-4" />
                <span>{t("myCredits")}</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/users/my-apikeys">
              <DropdownMenuItem>
                <Key className="mr-2 h-4 w-4" />
                <span>{t("myApiKeys")}</span>
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
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-sm transition-all duration-300 ${
        scrolled
          ? "bg-background/80 shadow-sm py-2"
          : "bg-background/95 py-2"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-12" : "h-14"
          }`}
        >
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`flex items-center gap-2 text-xl font-bold text-foreground transition-all duration-300 ${
                scrolled ? "scale-95" : ""
              }`}
            >
              <div
                className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  scrolled ? "w-10 h-10" : "w-12 h-12"
                }`}
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
                  className={`text-muted-foreground hover:text-foreground transition-colors ${
                    currentPage === path
                      ? "text-foreground font-medium"
                      : ""
                  }`}
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
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => router.push("/users/my-invites")}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          {t("myCredits") || "我的积分"}
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => router.push("/users/my-apikeys")}
                        >
                          <Key className="mr-2 h-4 w-4" />
                          {t("myApiKeys") || "我的API密钥"}
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
