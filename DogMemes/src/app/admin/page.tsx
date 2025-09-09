import { checkIsAdminAndLogin } from "@/lib/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import ClientCharts from "@/components/admin/dashboard/ClientCharts";
import { AdminSkeleton } from "@/components/skeletons/admin-skeleton";
import {
  fetchDashboardStats,
  fetchOrderTrend,
  fetchUserTrend,
} from "@/models/admin/dashboard";
import { redirect } from "next/navigation";

// 强制动态渲染，因为使用了 checkIsAdminAndLogin (getServerSession)
export const dynamic = 'force-dynamic';

// 仪表盘内容组件 - 异步组件
async function DashboardContent() {
  // 并行获取所有数据
  const [stats, userTrend, orderTrend] = await Promise.all([
    fetchDashboardStats(),
    fetchUserTrend(),
    fetchOrderTrend(),
  ]);

  return (
    <>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              用户总数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              今日新增: {stats.users.today}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              文章总数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              今日发布: {stats.posts.today}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              文章总阅读量
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts.views}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              订单总数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              今日订单: {stats.orders.today} ($
              {(stats.orders.todayAmount / 100).toFixed(2)})
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 图表 */}
      <ClientCharts userTrend={userTrend} orderTrend={orderTrend} />
    </>
  );
}

export default async function AdminPage() {
  const isAdmin = await checkIsAdminAndLogin();
  // 如果不是管理员，则不显示内容
  if (!isAdmin) return redirect("/auth/signin");

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">管理后台</h1>

      {/* 使用 Suspense 包装异步组件，在加载时显示骨架屏 */}
      <Suspense fallback={<AdminSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
