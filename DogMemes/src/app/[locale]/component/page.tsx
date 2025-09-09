"use client";

import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/blocks/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { ComponentPreview } from "@/components/component-library/component-previews";
import { CodeViewer } from "@/components/component-library/code-viewer";
import { ResizablePreview } from "@/components/component-library/resizable-preview";
import { useTranslations } from "next-intl";
import { ComponentLibrarySkeleton } from "./components/ComponentLibrarySkeleton";

// 组件分类数据
const componentCategories = [
  {
    id: "landing-page-blocks",
    name: "Landing Page Blocks",
    items: [
      { id: "header", name: "Header" },
      { id: "hero", name: "Hero" },
      { id: "branding", name: "Branding" },
      { id: "introduce", name: "Introduce" },
      { id: "benefit", name: "Benefit" },
      { id: "usage", name: "Usage" },
      { id: "feature", name: "Feature" },
      { id: "showcase", name: "Showcase" },
      { id: "stats", name: "Stats" },
      { id: "pricing", name: "Pricing" },
      { id: "testimonial", name: "Testimonial" },
      { id: "faq", name: "FAQ" },
      { id: "cta", name: "CTA" },
      { id: "footer", name: "Footer" },
    ],
  },
];

export default function ComponentLibraryPage() {
  const [selectedComponent, setSelectedComponent] = useState("hero");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslations("componentLibrary");
  const preview = ComponentPreview({ componentId: selectedComponent });

  // 模拟加载效果 - 展示导航栏先显示，然后内容加载
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // 键盘事件监听 - ESC键关闭侧边栏
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);

  // 过滤组件
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return componentCategories;

    return componentCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.id.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery]);

  // 处理组件选择
  const handleComponentSelect = (componentId: string) => {
    setSelectedComponent(componentId);
    setIsSidebarOpen(false); // 移动端选择后关闭侧边栏
  };

  return (
    <>
      <Navbar currentPage="component" />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
        {isLoading ? (
          <ComponentLibrarySkeleton />
        ) : (
          <div className="flex">
            {/* 移动端遮罩层 */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* 侧边栏 */}
            <div className={`
              fixed md:static inset-y-0 left-0 z-50 md:z-auto
              w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
              min-h-screen p-6 transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              md:block
            `}>
              {/* 移动端关闭按钮 */}
              <div className="flex justify-between items-center mb-6 md:hidden">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">组件库</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* 搜索框 */}
              <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* 组件列表 */}
            <div className="space-y-6">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("noMatchingComponents")}
                  </p>
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      {category.name}
                    </h3>
                    <div className="space-y-1">
                      {category.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleComponentSelect(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedComponent === item.id
                              ? "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 font-medium"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            </div>

            {/* 主内容区域 */}
            <div className="flex-1 p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                {/* 移动端菜单按钮 */}
                <div className="md:hidden mb-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsSidebarOpen(true)}
                    className="flex items-center space-x-2"
                  >
                    <Menu className="h-4 w-4" />
                    <span>选择组件</span>
                  </Button>
                </div>

                {/* 页面标题 */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {preview.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {preview.description}
                  </p>
                </div>

              {/* 标签页切换 */}
              <div className="mb-8">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "preview"
                        ? "border-orange-500 text-orange-600 dark:text-orange-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {t("preview")}
                  </button>
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === "code"
                        ? "border-orange-500 text-orange-600 dark:text-orange-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    {t("code")}
                  </button>
                </div>
              </div>

              {/* 内容区域 */}
              {activeTab === "preview" && (
                <div className="space-y-8">
                  {/* 可调整大小的组件预览 */}
                  <ResizablePreview
                    title={
                      selectedComponent.charAt(0).toUpperCase() +
                      selectedComponent.slice(1)
                    }
                    componentId={selectedComponent}
                  />
                </div>
              )}

              {activeTab === "code" && (
                <CodeViewer componentId={selectedComponent} />
              )}
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
}
