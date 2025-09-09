import { db } from "@/db";
import { users } from "@/db/schema";
import { affiliates } from "@/db/schema";
import { eq, desc, inArray, gte, lt, and, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

interface TrendData {
  name: string;
  [key: string]: number | string; // 支持动态字段名，如 users, orders 等
}


export async function findUserByUuid(
  uuid: string
): Promise<typeof users.$inferSelect | undefined> {
  const [user] = await db()
    .select()
    .from(users)
    .where(eq(users.uuid, uuid))
    .limit(1);

  return user;
}

export async function findUserByInviteCode(
  inviteCode: string
): Promise<typeof users.$inferSelect | undefined> {
  const [user] = await db()
    .select()
    .from(users)
    .where(eq(users.invite_code, inviteCode))
    .limit(1);

  return user;
}

export async function updateUser(
  uuid: string, 
  data:Partial<typeof users.$inferInsert>
): Promise<typeof users.$inferSelect | undefined> {
  const [user] = await db()
    .update(users)
    .set(data)
    .where(eq(users.uuid, uuid))
    .returning();

  return user;
}

/**
 * 生成唯一的邀请码
 * @returns 生成的邀请码
 */
export async function generateUniqueInviteCode() {
  let isUnique = false;
  let inviteCode = "";

  while (!isUnique) {
    // 生成6位随机字符串作为邀请码
    inviteCode = nanoid(6);

    // 检查邀请码是否已存在
    const existingUser = await findUserByInviteCode(inviteCode);
    if (!existingUser) {
      isUnique = true;
    }
  }

  return inviteCode;
}

/**
 * 更新用户的邀请关系
 * @param userUuid 用户UUID
 * @param invitedByUuid 邀请人UUID
 * @returns 更新后的用户信息
 */
export async function updateUserInviteRelation(
  userUuid: string,
  invitedByUuid: string
): Promise<typeof users.$inferSelect | undefined> {
  try {
    // 确保不是自己邀请自己
    if (userUuid === invitedByUuid) {
      console.log("用户不能邀请自己");
      return undefined;
    }

    // 检查用户是否已经有邀请人
    const user = await findUserByUuid(userUuid);
    if (!user) {
      console.log("用户不存在");
      return undefined;
    }

    if (user.invited_by) {
      // 已经有邀请人，不更新
      console.log("用户已经有邀请人，不更新");
      return user;
    }

   const [updatedUser] = await db()
      .update(users)
      .set({ invited_by: invitedByUuid })
      .where(eq(users.uuid, userUuid))
      .returning();


    return updatedUser;
  } catch (error) {
    console.error("更新用户邀请关系出错:", error);
    return undefined;
  }
}

export async function updateUserProfileByUuid(
  uuid: string,
  updates: Partial<typeof users.$inferInsert>
): Promise<typeof users.$inferSelect | undefined> {
  const [updatedUser] = await db()
    .update(users)
    .set(updates)
    .where(eq(users.uuid, uuid))
    .returning();

  return updatedUser;
}

export async function getUsers(
  page: number,
  limit: number
): Promise<(typeof users.$inferSelect)[] | undefined> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(users)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(users.created_at));

  return data;
}

/** 获取uuid相关的用户信息 */
export async function getUserByUuid(
  uuids: string[]
): Promise<(typeof users.$inferSelect)[] | undefined> {
  if (!uuids || uuids.length === 0) {
    return [];
  }

  const data = await db()
    .select()
    .from(users)
    .where(inArray(users.uuid, uuids));
  
  return data;
}

/** 获取被某个用户邀请的用户列表 */
export async function getInvitedUsersByInviter(
  inviterUuid: string
): Promise<(typeof users.$inferSelect)[] | undefined> {
  const data = await db()
    .select()
    .from(users)
    .where(eq(users.invited_by, inviterUuid))
    .orderBy(desc(users.created_at));

  return data;
}

/** 获取基于用户表的邀请统计信息 */
export async function getUserBasedInviteStats(
  inviterUuid: string
): Promise<{
    totalInviteCount: number;
    totalPaidCount: number;
    totalRewardAmount: number;
  }> {
  try {
    // 获取被邀请的用户列表
    const invitedUsers = await getInvitedUsersByInviter(inviterUuid);

    // 基本统计：总邀请数就是被邀请用户的数量
    const totalInviteCount = invitedUsers?.length || 0;

    // 对于支付统计，我们仍然需要查询 affiliates 表
    // 因为支付信息存储在那里
    const data = await db()
      .select()
      .from(affiliates)
      .where(eq(affiliates.invited_by, inviterUuid))
      .orderBy(desc(affiliates.created_at));

    if (!affiliates) {
      console.error("获取邀请记录失败:", affiliates);
      // 如果查询失败，返回基本统计
      return {
        totalInviteCount,
        totalPaidCount: 0,
        totalRewardAmount: 0,
      };
    }

    // 计算支付相关统计
    const totalPaidCount = data?.filter(
      (a) => a.status === "completed"
    ).length || 0;

    const totalRewardAmount = data?.reduce(
      (sum, a) => sum + (Number(a.reward_amount) || 0),
      0
    ) || 0;

    return {
      totalInviteCount,
      totalPaidCount,
      totalRewardAmount,
    };
  } catch (error) {
    console.error("获取用户邀请统计信息出错:", error);
    return {
      totalInviteCount: 0,
      totalPaidCount: 0,
      totalRewardAmount: 0,
    };
  }
}

// 根据邮箱查找用户
export async function findUserByEmail(
  email: string
): Promise<typeof users.$inferSelect | undefined> {
  const [user] = await db()
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user;
}

export async function insertUser(
  data: typeof users.$inferInsert
): Promise<typeof users.$inferSelect | undefined> {
  const [user] = await db()
    .insert(users)
    .values(data)
    .returning();

  return user;
}

/**
 * 获取用户总数
 * @returns 用户总数
 */
export async function getTotalUsersCount(): Promise<number> {
  const totalUsers = await db().$count(users);
  return totalUsers;
}

/**
 * 获取今日新增用户数
 * @returns 今日新增用户数
 */
export async function getTodayUsersCount(): Promise<number> {
  // 获取今天的开始时间
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const todayUsers = await db()
    .$count(users, gte(users.created_at, todayISOString));

  return todayUsers;
}

/**
 * 获取用户注册趋势数据
 * @param days 查询天数，默认7天
 * @returns 用户注册趋势数据
 */
export async function getUserTrend(days: number = 7): Promise<TrendData[]> {
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

    const dayCount = await db()
      .$count(users, and(
        gte(users.created_at, startDate),
        lt(users.created_at, endDate)
      ));

    result.push({
      name: dates[i].label,
      users: dayCount,
    });
  }

  // 添加最后一天（今天）
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const lastDayCount = await db()
    .$count(users, and(
      gte(users.created_at, dates[dates.length - 1].date),
      lt(users.created_at, today.toISOString())
    ));

  result.push({
    name: dates[dates.length - 1].label,
    users: lastDayCount,
  });

  return result;
}

/**
 * 获取指定日期范围内的用户数量
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @returns 用户数量
 */
export async function getUsersCountByDateRange(
  startDate: string,
  endDate: string
): Promise<number> {
  const count = await db()
    .$count(users, and(
      gte(users.created_at, startDate),
      lt(users.created_at, endDate)
    ));

  return count;
}

export async function updateUserCredits(
  uuid: string,
  credits: number
): Promise<typeof users.$inferSelect | undefined> {
  const [updatedUser] = await db()
    .update(users)
    .set({ credits: sql`COALESCE(${users.credits}, 0) + ${credits}` })
    .where(eq(users.uuid, uuid))
    .returning();

  return updatedUser;
}

export async function getUserCredits(
  uuid: string
): Promise<number> {
  const [user] = await db()
    .select({ credits: users.credits })
    .from(users)
    .where(eq(users.uuid, uuid))
    .limit(1);

  return user?.credits || 0;
}
