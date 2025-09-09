import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function PostSkeleton() {
  return (
    <Card className="mt-8">
      <CardHeader>
        {/* 标题骨架屏 */}
        <Skeleton className="h-12 w-3/4 mb-6" />

        {/* 作者信息骨架屏 */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Separator className="mt-6" />
      </CardHeader>

      <CardContent className="pt-6">
        {/* 文章内容骨架屏 */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[95%]" />
          <Skeleton className="h-5 w-[90%]" />
          <div className="py-2" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-[88%]" />
          <div className="py-2" />
          <Skeleton className="h-5 w-[92%]" />
          <Skeleton className="h-5 w-[85%]" />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start space-y-4 pt-6">
        <Separator />
        {/* 相关阅读骨架屏 */}
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card className="border">
            <CardContent className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
          <Card className="border">
            <CardContent className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
      </CardFooter>
    </Card>
  );
}
