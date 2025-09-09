import { db } from "@/db";
import { orders, users } from "@/db/schema";
import { eq, desc, gte, count, and, lt, inArray } from "drizzle-orm";

export async function getallOrders() {
  const data = await db()
    .select()
    .from(orders)
    .orderBy(desc(orders.created_at));

  return data;
}

export async function getOrdersByUserUuid(
  userUuid: string
): Promise<(typeof orders.$inferSelect)[] | undefined> {
  const data = await db()
    .select()
    .from(orders)
    .where(eq(orders.user_uuid, userUuid))
    .orderBy(desc(orders.created_at));

  return data;
}

// 获取用户分页订单列表
export async function getOrdersByUserUuidPaginated(
  userUuid: string,
  page: number = 1,
  limit: number = 10
): Promise<(typeof orders.$inferSelect)[] | undefined> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(orders)
    .where(eq(orders.user_uuid, userUuid))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(orders.created_at));

  return data;
}

// 获取用户订单总数
export async function getUserOrdersCount(userUuid: string): Promise<number> {
  const total = await db().$count(orders, eq(orders.user_uuid, userUuid));
  return total;
}

export async function getOrdersByPaidEmail(
  email: string
): Promise<(typeof orders.$inferSelect)[] | undefined> {
  const orderList = await db()
    .select()
    .from(orders)
    .where(eq(orders.paid_email, email))
    .orderBy(desc(orders.created_at));

  return orderList;
}

export async function findOrderByOrderNo(
  orderNo: string
): Promise<typeof orders.$inferSelect | undefined> {
  const [order] = await db()
    .select()
    .from(orders)
    .where(eq(orders.order_no, orderNo))
    .limit(1);

  return order;
}

export async function findOrderByOrderNoAndEmail(
  orderNo: string,
  email: string
): Promise<typeof orders.$inferSelect | undefined> {
  const [order] = await db()
    .select()
    .from(orders)
    .where(and(eq(orders.order_no, orderNo), eq(orders.paid_email, email)))
    .limit(1);

  return order;
}

export async function updateOrderStatus(
  orderNo: string,
  status: string,
  paidAt: string,
  paidEmail: string,
  paidDetail: string,
  actualPaidAmount?: number // 新增：实际支付金额（分为单位）
): Promise<typeof orders.$inferSelect | undefined> {
  const updateData: any = {
    status: status,
    paid_at: paidAt || new Date().toISOString(),
    paid_email: paidEmail,
    paid_detail: paidDetail,
  };

  // 如果提供了实际支付金额，则更新数据库中的金额
  if (actualPaidAmount !== undefined) {
    updateData.amount = actualPaidAmount;
  }

  const [updatedOrder] = await db()
    .update(orders)
    .set(updateData)
    .where(eq(orders.order_no, orderNo))
    .returning();

  return updatedOrder;
}

// 获取订单总数
export async function getTotalOrdersCount(): Promise<number> {
  const [result] = await db().select({ count: count() }).from(orders);

  return result.count;
}

// 获取今日订单数
export async function getTodayOrdersCount(): Promise<number> {
  // 获取今日开始时间的 ISO 字符串
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const [result] = await db()
    .select({ count: count() })
    .from(orders)
    .where(gte(orders.created_at, todayISOString));

  return result.count;
}

interface TrendData {
  name: string;
  [key: string]: number | string; // 支持动态字段名，如 users, orders 等
}

// 获取订单统计数据
export async function fetchOrderStats(): Promise<{
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;
}> {
  const data = await db()
    .select()
    .from(orders)
    .orderBy(desc(orders.created_at));

  if (!data) {
    return {
      totalRevenue: 0,
      pendingOrders: 0,
      paidOrders: 0,
    };
  }

  // 计算统计数据
  const paidOrders = data.filter(
    (o) => o.status === "paid" || o.status === "activated"
  ).length;
  const totalRevenue = data
    .filter((o) => o.status === "paid" || o.status === "activated")
    .reduce((sum, o) => sum + (o.amount as number) / 100, 0);

  const pendingOrders = data.filter((o) => o.status === "pending").length;

  return {
    totalRevenue,
    pendingOrders,
    paidOrders,
  };
}

// 获取订单列表数据
export async function fetchOrders(): Promise<(typeof orders.$inferSelect)[]> {
  const data = await db()
    .select()
    .from(orders)
    .orderBy(desc(orders.created_at));

  if (!data) {
    return [];
  }

  // 2. 获取所有相关的用户信息
  const userUuids = [...new Set(data.map((o) => o.user_uuid))];

  const usersData = await db()
    .select()
    .from(users)
    .where(inArray(users.uuid, userUuids));

  // 3. 创建UUID到邮箱的映射
  const userEmailMap = new Map();
  if (usersData) {
    usersData.forEach((user) => {
      userEmailMap.set(user.uuid, user.email);
    });
  }

  // 4. 合并数据
  const enrichedOrders = data.map((order) => ({
    ...order,
    user_email: userEmailMap.get(order.user_uuid) || "未知用户",
    user_avatar:
      usersData?.find((u) => u.uuid === order.user_uuid)?.avatar_url || "",
  }));

  return enrichedOrders || [];
}

// 获取分页订单列表数据
export async function fetchOrdersPaginated(
  page: number = 1,
  limit: number = 10
): Promise<(typeof orders.$inferSelect)[]> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(orders)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(orders.created_at));

  if (!data) {
    return [];
  }

  // 2. 获取所有相关的用户信息
  const userUuids = [...new Set(data.map((o) => o.user_uuid))];

  const usersData = await db()
    .select()
    .from(users)
    .where(inArray(users.uuid, userUuids));

  // 3. 创建UUID到邮箱的映射
  const userEmailMap = new Map();
  if (usersData) {
    usersData.forEach((user) => {
      userEmailMap.set(user.uuid, user.email);
    });
  }

  // 4. 合并数据
  const enrichedOrders = data.map((order) => ({
    ...order,
    user_email: userEmailMap.get(order.user_uuid) || "未知用户",
    user_avatar:
      usersData?.find((u) => u.uuid === order.user_uuid)?.avatar_url || "",
  }));

  return enrichedOrders || [];
}

/**
 * 获取orders趋势数据
 * @param days 查询天数，默认7天
 * @returns orders趋势数据
 */
export async function getOrdersTrend(days: number = 7): Promise<TrendData[]> {
  // 生成日期数组
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    dates.push({
      date: date.toISOString(),
      label: `${date.getMonth() + 1}/${date.getDate()}`,
    });
  }

  const result: TrendData[] = [];

  // 查询每一天的数据（除了最后一天）
  for (let i = 0; i < dates.length - 1; i++) {
    const startDate = dates[i].date;
    const endDate = dates[i + 1].date;

    const dayCount = await db().$count(
      orders,
      and(
        gte(orders.created_at, startDate),
        lt(orders.created_at, endDate),
        inArray(orders.status, ["paid", "activated"])
      )
    );

    result.push({
      name: dates[i].label,
      orders: dayCount,
    });
  }

  // 添加最后一天（今天）
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const lastDayCount = await db().$count(
    orders,
    and(
      gte(orders.created_at, dates[dates.length - 1].date),
      lt(orders.created_at, today.toISOString()),
      inArray(orders.status, ["paid", "activated"])
    )
  );

  result.push({
    name: dates[dates.length - 1].label,
    orders: lastDayCount,
  });

  return result;
}

/**
 * 获取指定日期范围内的orders数量
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns orders数量
 */
export async function getOrdersCountByDateRange(
  startDate: string,
  endDate: string
): Promise<number> {
  const count = await db().$count(
    orders,
    and(
      gte(orders.created_at, startDate),
      lt(orders.created_at, endDate),
      inArray(orders.status, ["paid", "activated"])
    )
  );

  return count;
}

// 获取今日订单金额
export async function getTodayOrdersAmount(): Promise<number> {
  // 获取今日开始时间的 ISO 字符串
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const todayOrdersData = await db()
    .select({ amount: orders.amount })
    .from(orders)
    .where(gte(orders.created_at, todayISOString));

  // 计算今日订单总金额
  const totalAmount = todayOrdersData.reduce((total, order) => {
    return total + (order.amount || 0);
  }, 0);

  return totalAmount;
}

/**
 * 通用的日期范围趋势查询方法
 * @param days 查询天数，默认7天
 * @param dataKey 数据字段名，如 'users', 'orders' 等
 * @param dateColumn 日期字段名，默认 'created_at'
 * @returns 趋势数据数组
 */
export async function fetchTrendData(
  table: any, // drizzle table schema
  days: number = 7,
  dataKey: string,
  dateColumn: string = "created_at"
): Promise<TrendData[]> {
  // 生成日期数组
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    dates.push({
      date: date.toISOString(),
      label: `${date.getMonth() + 1}/${date.getDate()}`,
    });
  }

  const result: TrendData[] = [];

  // 查询每一天的数据
  for (let i = 0; i < dates.length - 1; i++) {
    const startDate = dates[i].date;
    const endDate = dates[i + 1].date;

    const dayCount = await db().$count(
      table,
      and(gte(table[dateColumn], startDate), lt(table[dateColumn], endDate))
    );

    result.push({
      name: dates[i].label,
      [dataKey]: dayCount,
    });
  }

  // 添加最后一天（今天）
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const lastDayCount = await db().$count(
    table,
    and(
      gte(table[dateColumn], dates[dates.length - 1].date),
      lt(table[dateColumn], today.toISOString())
    )
  );

  result.push({
    name: dates[dates.length - 1].label,
    [dataKey]: lastDayCount,
  });

  return result;
}

/**
 * 根据订单号和用户UUID获取订单信息
 * @param orderNo 订单号
 * @param userUuid 用户UUID
 * @returns 订单信息
 */
export async function getOrderByOrderNoAndUuid(
  orderNo: string,
  userUuid: string
): Promise<typeof orders.$inferSelect | undefined> {
  const [order] = await db()
    .select()
    .from(orders)
    .where(and(eq(orders.order_no, orderNo), eq(orders.user_uuid, userUuid)))
    .limit(1);

  return order;
}

export async function updateOrderStripeSessionId(
  orderNo: string,
  sessionId: string
): Promise<typeof orders.$inferSelect | undefined> {
  const [order] = await db()
    .update(orders)
    .set({
      stripe_session_id: sessionId,
    })
    .where(eq(orders.order_no, orderNo))
    .returning();

  return order;
}

export async function insertOrder(
  data: typeof orders.$inferInsert
): Promise<typeof orders.$inferSelect | undefined> {
  const [order] = await db().insert(orders).values(data).returning();

  return order;
}

export async function updateOrderByOrderNo(
  orderNo: string,
  data: Partial<typeof orders.$inferInsert>
): Promise<typeof orders.$inferSelect | undefined> {
  const [order] = await db()
    .update(orders)
    .set(data)
    .where(eq(orders.order_no, orderNo))
    .returning();

  return order;
}

export async function updateOrderById(
  id: number,
  data: Partial<typeof orders.$inferInsert>
): Promise<typeof orders.$inferSelect | undefined> {
  const [order] = await db()
    .update(orders)
    .set(data)
    .where(eq(orders.id, id))
    .returning();

  return order;
}

// 专门用于Dashboard统计的函数 - 只统计已支付订单
export async function getPaidOrdersCount(): Promise<number> {
  const [result] = await db()
    .select({ count: count() })
    .from(orders)
    .where(inArray(orders.status, ["paid", "activated"]));

  return result.count;
}

export async function getTodayPaidOrdersCount(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const [result] = await db()
    .select({ count: count() })
    .from(orders)
    .where(
      and(
        gte(orders.created_at, todayISOString),
        inArray(orders.status, ["paid", "activated"])
      )
    );

  return result.count;
}

export async function getTodayPaidOrdersAmount(): Promise<number> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const todayOrdersData = await db()
    .select({ amount: orders.amount })
    .from(orders)
    .where(
      and(
        gte(orders.created_at, todayISOString),
        inArray(orders.status, ["paid", "activated"])
      )
    );

  const totalAmount = todayOrdersData.reduce((total, order) => {
    return total + (order.amount || 0);
  }, 0);

  return totalAmount;
}

// 支持状态筛选的分页订单列表
export async function fetchOrdersPaginatedWithFilter(
  page: number = 1,
  limit: number = 10,
  status?: string
): Promise<(typeof orders.$inferSelect)[]> {
  const offset = (page - 1) * limit;

  // 构建基础查询
  let data;

  if (!status || status === "all") {
    // 没有状态筛选，查询所有订单
    data = await db()
      .select()
      .from(orders)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(orders.created_at));
  } else if (status === "paid_activated") {
    // 特殊处理：同时包含已支付和已激活
    data = await db()
      .select()
      .from(orders)
      .where(inArray(orders.status, ["paid", "activated"]))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(orders.created_at));
  } else {
    // 单个状态筛选
    data = await db()
      .select()
      .from(orders)
      .where(eq(orders.status, status))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(orders.created_at));
  }

  if (!data) {
    return [];
  }

  // 获取所有相关的用户信息
  const userUuids = [...new Set(data.map((o) => o.user_uuid))];

  const usersData = await db()
    .select()
    .from(users)
    .where(inArray(users.uuid, userUuids));

  // 创建UUID到邮箱的映射
  const userEmailMap = new Map();
  if (usersData) {
    usersData.forEach((user) => {
      userEmailMap.set(user.uuid, user.email);
    });
  }

  // 合并数据
  const enrichedOrders = data.map((order) => ({
    ...order,
    user_email: userEmailMap.get(order.user_uuid) || "未知用户",
    user_avatar:
      usersData?.find((u) => u.uuid === order.user_uuid)?.avatar_url || "",
  }));

  return enrichedOrders || [];
}

// 支持状态筛选的订单总数
export async function getTotalOrdersCountWithFilter(
  status?: string
): Promise<number> {
  let result;

  if (!status || status === "all") {
    // 没有状态筛选，统计所有订单
    [result] = await db().select({ count: count() }).from(orders);
  } else if (status === "paid_activated") {
    // 特殊处理：同时包含已支付和已激活
    [result] = await db()
      .select({ count: count() })
      .from(orders)
      .where(inArray(orders.status, ["paid", "activated"]));
  } else {
    // 单个状态筛选
    [result] = await db()
      .select({ count: count() })
      .from(orders)
      .where(eq(orders.status, status));
  }

  return result.count;
}
