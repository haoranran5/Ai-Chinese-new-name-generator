"use client";

import React from "react";
import { PerplexitySearch } from "@/components/new-component";

export default function PerplexityDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl">
          <PerplexitySearch
          />
        </div>
      </div>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          按 Enter 键搜索 • 点击图标使用不同功能
        </p>
      </div>
    </div>
  );
}
