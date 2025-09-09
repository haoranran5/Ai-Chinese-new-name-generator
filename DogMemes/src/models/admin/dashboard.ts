import { DashboardStats, TrendData } from "@/types/admin/dashboard";
import { getTotalUsersCount, getTodayUsersCount, getUserTrend } from "@/models/user";
import { getPostsTotal, getTodayPostsCount } from "@/models/posts";
import { getTodayOrdersCount, getTotalOrdersCount, getTodayOrdersAmount, getOrdersTrend } from "@/models/order";

// 获取统计数据
export async function fetchDashboardStats(): Promise<DashboardStats> {
  // 获取用户统计
  const totalUsers = await getTotalUsersCount();
  const todayUsers = await getTodayUsersCount();

  // 获取文章统计
  const totalPosts = await getPostsTotal();
  const todayPosts = await getTodayPostsCount();
  const totalViews = 0;

  // 获取订单统计
  const totalOrders = await getTotalOrdersCount();
  const todayOrders = await getTodayOrdersCount();
  const todayAmount = await getTodayOrdersAmount();

  return {
    users: {
      total: totalUsers || 0,
      today: todayUsers || 0,
    },
    posts: {
      total: totalPosts || 0,
      today: todayPosts || 0,
      views: totalViews,
    },
    orders: {
      total: totalOrders || 0,
      today: todayOrders || 0,
      todayAmount: todayAmount,
    },
  };
}

// 获取近7天的用户注册趋势
export async function fetchUserTrend(): Promise<TrendData[]> {
  return await getUserTrend(7);
}

// 获取近7天的订单趋势
export async function fetchOrderTrend(): Promise<TrendData[]> {
  return await getOrdersTrend(7);
}
