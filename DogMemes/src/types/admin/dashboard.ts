export interface DashboardStats {
  users: {
    total: number;
    today: number;
  };
  posts: {
    total: number;
    today: number;
    views: number;
  };
  orders: {
    total: number;
    today: number;
    todayAmount: number;
  };
}

export interface TrendData {
  name: string;
  [key: string]: number | string; // 支持动态字段名，如 users, orders 等
}
