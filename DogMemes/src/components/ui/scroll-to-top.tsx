"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
  className?: string;
  threshold?: number; // 滚动多少像素后显示按钮，默认为视窗高度
}

export function ScrollToTop({ className, threshold }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 获取视窗高度作为默认阈值
    const defaultThreshold = threshold || window.innerHeight;

    const toggleVisibility = () => {
      if (window.pageYOffset > defaultThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // 监听滚动事件
    window.addEventListener("scroll", toggleVisibility);

    // 清理事件监听器
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "dark:bg-blue-500 dark:hover:bg-blue-600",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      aria-label="滚动到顶部"
      title="滚动到顶部"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}
