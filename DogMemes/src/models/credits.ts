import { db } from "@/db";
import { credits } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function insertCredit(
  data: typeof credits.$inferInsert
): Promise<typeof credits.$inferSelect | undefined> {
  const [post] = await db().insert(credits).values(data).returning();

  return post;
}

/**
 * 根据用户UUID查询积分记录
 * @param userUuid 用户UUID
 * @returns 积分记录列表
 */
export async function getCreditsByUserUuid(
  userUuid: string
): Promise<(typeof credits.$inferSelect)[] | undefined> {
  const data = await db()
    .select()
    .from(credits)
    .where(eq(credits.user_uuid, userUuid))
    .orderBy(desc(credits.created_at));

  return data;
}

/**
 * 分页查询用户积分记录
 * @param userUuid 用户UUID
 * @param page 页码
 * @param limit 每页数量
 * @returns 积分记录列表
 */
export async function getCreditsByUserUuidPaginated(
  userUuid: string,
  page: number = 1,
  limit: number = 10
): Promise<(typeof credits.$inferSelect)[] | undefined> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(credits)
    .where(eq(credits.user_uuid, userUuid))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(credits.created_at));

  return data;
}

/**
 * 获取用户积分记录总数
 * @param userUuid 用户UUID
 * @returns 记录总数
 */
export async function getUserCreditsCount(
  userUuid: string
): Promise<number> {
  const count = await db()
    .$count(credits, eq(credits.user_uuid, userUuid));

  return count;
}

/**
 * 获取用户积分统计信息
 * @param userUuid 用户UUID
 * @returns 积分统计
 */
export async function getUserCreditsStats(
  userUuid: string
): Promise<{
  totalEarned: number;
  totalSpent: number;
  totalTransactions: number;
}> {
  const records = await getCreditsByUserUuid(userUuid);

  if (!records || records.length === 0) {
    return {
      totalEarned: 0,
      totalSpent: 0,
      totalTransactions: 0,
    };
  }

  const totalEarned = records
    .filter(record => record.credits > 0)
    .reduce((sum, record) => sum + record.credits, 0);

  const totalSpent = Math.abs(records
    .filter(record => record.credits < 0)
    .reduce((sum, record) => sum + record.credits, 0));

  return {
    totalEarned,
    totalSpent,
    totalTransactions: records.length,
  };
}