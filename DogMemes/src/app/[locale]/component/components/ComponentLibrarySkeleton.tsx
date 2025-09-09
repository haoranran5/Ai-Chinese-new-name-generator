import { Skeleton } from "@/components/ui/skeleton";

export function ComponentLibrarySkeleton() {
  return (
    <div className="flex">
      {/* 侧边栏骨架屏 - 在移动端隐藏 */}
      <div className="hidden md:block w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 min-h-screen p-6">
        {/* 搜索框骨架屏 */}
        <div className="mb-6">
          <Skeleton className="h-10 w-full" />
        </div>

        {/* 组件列表骨架屏 */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-4 w-32 mb-3" />
            <div className="space-y-1">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区域骨架屏 */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* 移动端菜单按钮骨架屏 */}
          <div className="md:hidden mb-4">
            <Skeleton className="h-10 w-32" />
          </div>

          {/* 页面标题骨架屏 */}
          <div className="mb-8">
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-full max-w-96" />
          </div>

          {/* 标签页切换骨架屏 */}
          <div className="mb-8">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <Skeleton className="h-10 w-20 mr-4" />
              <Skeleton className="h-10 w-16" />
            </div>
          </div>

          {/* 内容区域骨架屏 */}
          <div className="space-y-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
