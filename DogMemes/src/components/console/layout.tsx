// src/components/console/layout.tsx

"use client";

import { ReactNode, Suspense, lazy, useState, useEffect } from "react";
import { Sidebar as SidebarType } from "@/types/siderbar";
import { NavigationLoading } from "./loading";

// 懒加载导航组件
const NavigationWrapper = lazy(() =>
  import("./navigation").then((mod) => ({
    default: mod.NavigationWrapper,
  }))
);

interface ConsoleLayoutProps {
  children: ReactNode;
  sidebar: SidebarType;
  userInfo?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
}

// 内容区域组件
function ContentWrapper({
  children,
  isSidebarOpen,
}: {
  children: ReactNode;
  isSidebarOpen: boolean;
}) {
  return (
    <main
      className={`flex-1 transition-all duration-300 p-6 bg-white dark:bg-black
                     ${isSidebarOpen ? "md:ml-64" : "ml-0"}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
}

// 移动端菜单按钮
function MenuButton({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 md:hidden z-50 bg-primary text-white p-3 rounded-full shadow-lg"
      aria-label={isOpen ? "关闭菜单" : "打开菜单"}
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );
}

export default function ConsoleLayout({
  children,
  sidebar,
}: ConsoleLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 检测屏幕宽度以设置初始侧边栏状态
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    // 初始化
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 点击外部区域关闭侧边栏（仅移动端）
  const handleOverlayClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* 移动端菜单按钮 */}
      <MenuButton
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isOpen={isSidebarOpen}
      />

      {/* 移动端侧边栏遮罩层 */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* 导航区域 - 带加载状态 */}
      <Suspense fallback={<NavigationLoading />}>
        <NavigationWrapper sidebar={sidebar} isSidebarOpen={isSidebarOpen} />
      </Suspense>

      {/* 主内容区域 */}
      <Suspense
        fallback={
          <div className={`p-6 ${isSidebarOpen ? "md:ml-64" : "ml-0"}`}>
            <div className="h-8 bg-gray-200 dark:bg-gray-900 rounded animate-pulse"></div>
          </div>
        }
      >
        <ContentWrapper isSidebarOpen={isSidebarOpen}>
          {children}
        </ContentWrapper>
      </Suspense>
    </div>
  );
}
