import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import * as Icons from "react-icons/ri";
import { IconType } from "react-icons";
import { Sidebar as SidebarType } from "@/types/blocks/sidebar";
import { useTheme } from "next-themes";
import Image from "next/image";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  sidebar: SidebarType;
}

export default function Sidebar({ open, setOpen, sidebar }: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const { theme, setTheme } = useTheme();

  // 等待客户端挂载，避免水合错误
  useEffect(() => {
    setMounted(true);
  }, []);

  // 检测移动端屏幕
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 移动端默认关闭侧边栏
  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile, setOpen]);

  // 处理点击外部关闭侧边栏
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        open &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, open, setOpen]);

  // 触摸滑动手势支持
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;

    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    // 向左滑动关闭侧边栏
    if (diff > 50 && open) {
      setOpen(false);
      startX.current = null;
    }
    // 向右滑动打开侧边栏
    else if (diff < -50 && !open) {
      setOpen(true);
      startX.current = null;
    }
  };

  const handleTouchEnd = () => {
    startX.current = null;
  };

  const isActive = (path: string) => pathname === path;
  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const DynamicIcon = ({ icon }: { icon?: string }) => {
    if (!icon) return null;
    const IconComponent = (Icons as Record<string, IconType>)[icon];
    return IconComponent ? (
      <IconComponent size={22} className="mx-auto" />
    ) : null;
  };

  // Logo显示逻辑
  const logoSrc =
    mounted && theme === "dark"
      ? "/logo-w.png"
      : sidebar.brand.logo?.src || "/logo.png";
  const logoAlt = sidebar.brand.logo?.alt || sidebar.brand.title;

  return (
    <>
      {/* 移动端遮罩层 */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "fixed left-0 top-0 h-full bg-white dark:bg-black border-r dark:border-gray-900 transition-all duration-300 z-50",
          open ? "w-64" : "w-16",
          isMobile && "shadow-xl"
        )}
      >
        {/* 顶部区域 - 带Logo */}
        <div className="border-b dark:border-gray-900">
          {/* Logo区域 */}
          {open ? (
            // 展开状态 - 显示logo、标题和折叠按钮
            <div className="h-16 px-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 relative">
                  <img
                    src={logoSrc}
                    alt={logoAlt}
                    className="h-8 w-auto object-contain"
                  />
                </div>
                <span className="font-semibold dark:text-white">
                  {sidebar.brand.title}
                </span>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg dark:text-gray-300"
                aria-label="关闭侧边栏"
              >
                <Icons.RiMenuFoldLine size={22} />
              </button>
            </div>
          ) : (
            // 折叠状态 - 整个logo区域可点击展开
            <button
              onClick={() => setOpen(true)}
              className="h-16 w-full flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              aria-label="展开侧边栏"
            >
              <div className="flex-shrink-0 w-8 h-8 relative">
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="mt-1 text-gray-500 dark:text-gray-400">
                <Icons.RiArrowRightSLine size={16} />
              </div>
            </button>
          )}
        </div>

        {/* Navigation - 简洁导航栏 */}
        <nav
          className={cn(
            "py-4 flex flex-col items-center overflow-y-auto",
            open ? "px-4" : "px-2"
          )}
        >
          {/* 导航项 */}
          <div className="w-full flex flex-col items-center space-y-4">
            {sidebar.nav.items.map((item) => (
              <div key={item.title} className="w-full">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={cn(
                        "w-full flex items-center justify-center p-2 rounded-lg transition-colors",
                        isActive(item.url || "")
                          ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white",
                        open && "justify-between px-4"
                      )}
                    >
                      <div
                        className={cn("flex items-center", open && "space-x-3")}
                      >
                        <span className="flex items-center justify-center">
                          <DynamicIcon icon={item.icon} />
                        </span>
                        {open && <span>{item.title}</span>}
                      </div>
                      {open && (
                        <Icons.RiArrowDownSLine
                          size={16}
                          className={cn(
                            "transition-transform dark:text-gray-400",
                            expandedItems.includes(item.title) &&
                              "transform rotate-180"
                          )}
                        />
                      )}
                    </button>

                    {open && expandedItems.includes(item.title) && (
                      <div className="mt-2 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.url || ""}
                            className={cn(
                              "block px-4 py-2 rounded-lg transition-colors",
                              isActive(child.url || "")
                                ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
                            )}
                            onClick={() => isMobile && setOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.url || ""}
                    className={cn(
                      "flex items-center p-2 rounded-lg transition-colors",
                      isActive(item.url || "")
                        ? "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white",
                      !open ? "justify-center" : "px-4 space-x-3"
                    )}
                    onClick={() => isMobile && setOpen(false)}
                  >
                    <span className="flex items-center justify-center">
                      <DynamicIcon icon={item.icon} />
                    </span>
                    {open && <span>{item.title}</span>}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* 底部区域 - 主题切换和社交链接 */}
        <div className="absolute bottom-4 w-full flex flex-col items-center space-y-3">
          {/* 主题切换按钮 */}
          <button
            onClick={toggleTheme}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg transition-colors   text-gray-700 dark:text-gray-300",
              open && "w-[calc(100%-2rem)] mx-4 p-2 justify-start space-x-3"
            )}
            aria-label="切换主题"
          >
            {mounted && (
              <>
                <span className="flex items-center justify-center">
                  {theme === "dark" ? (
                    <Icons.RiSunLine size={22} />
                  ) : (
                    <Icons.RiMoonLine size={22} />
                  )}
                </span>
                {open && (
                  <span>
                    {theme === "dark" ? "" : ""}
                  </span>
                )}
              </>
            )}
          </button>

          {/* Social Links - 仅在展开模式显示 */}
          {sidebar.social && open && (
            <div className="w-full px-4">
              <div className="flex justify-between">
                {sidebar.social.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    target={item.target}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg"
                    title={item.title}
                  >
                    <DynamicIcon icon={item.icon} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 折叠状态下的社交链接图标 */}
          {sidebar.social && !open && (
            <div className="w-full px-2">
              {sidebar.social.items.slice(0, 1).map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  target={item.target}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg"
                  title={item.title}
                >
                  <DynamicIcon icon={item.icon} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
