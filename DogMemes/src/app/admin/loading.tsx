import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="w-full h-full p-6 space-y-6">
      {/* 页面标题骨架 */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      {/* 内容区域骨架 */}
      <div className="grid gap-6">
        {/* 卡片骨架 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
              >
                <Skeleton className="h-8 w-[140px] mb-4" />
                <Skeleton className="h-16 w-full mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-[100px]" />
                  <Skeleton className="h-6 w-[80px]" />
                </div>
              </div>
            ))}
        </div>

        {/* 表格骨架 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <Skeleton className="h-8 w-[200px] mb-4" />
          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-6 w-[40px]" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-[100px]" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
