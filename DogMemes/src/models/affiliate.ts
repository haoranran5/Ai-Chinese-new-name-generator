import { db } from "@/db";
import { affiliates } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/**
 * 查询用户的邀请记录
 * @param userUuid 用户UUID
 * @returns 邀请记录列表
 */
export async function findAffiliatesByUserUuid(
  userUuid: string
): Promise<(typeof affiliates.$inferSelect)[] | undefined> {
  const data = await db()
    .select()
    .from(affiliates)
    .where(eq(affiliates.invited_by, userUuid))
    .orderBy(desc(affiliates.created_at));

  return data;
}

/**
 * 通过用户UUID查询该用户的邀请记录（被邀请的记录）
 * @param userUuid 用户UUID
 * @returns 邀请记录
 */
export async function findAffiliateByUserUuid(
  userUuid: string
):  Promise<(typeof affiliates.$inferSelect) | undefined> {
  const [affiliate] = await db()
    .select()
    .from(affiliates)
    .where(eq(affiliates.user_uuid, userUuid))
    .limit(1);

  return affiliate;
}

/**
 * 通过订单号查询邀请记录
 * @param orderNo 订单号
 * @returns 邀请记录
 */
export async function findAffiliateByOrderNo(
  orderNo: string
): Promise<(typeof affiliates.$inferSelect) | undefined> {
  const [affiliate] = await db()
    .select()
    .from(affiliates)
    .where(eq(affiliates.paid_order_no, orderNo))
    .limit(1);

  return affiliate;
}

/**
 * 创建邀请记录
 * @param affiliate 邀请记录数据
 * @returns 创建结果
 */
export async function insertAffiliate(
  data: typeof affiliates.$inferInsert
): Promise<(typeof affiliates.$inferSelect) | undefined> {
  const [affiliate] = await db().insert(affiliates).values(data).returning();

  return affiliate;
}

/**
 * 更新邀请记录
 * @param id 记录ID
 * @param affiliate 邀请记录数据
 * @returns 更新结果
 */
export async function updateAffiliate(
  id: number,
  data: Partial<typeof affiliates.$inferInsert>
): Promise<(typeof affiliates.$inferSelect) | undefined> {
  const [affiliate] = await db()
    .update(affiliates)
    .set(data)
    .where(eq(affiliates.id, id))
    .returning();

    return affiliate;
}

/**
 * 获取用户的邀请统计信息
 * @param userUuid 用户UUID
 * @returns 统计信息
 */
export async function getAffiliateStats(
  userUuid: string
): Promise<{
    totalInviteCount: number;
    totalPaidCount: number;
    totalRewardAmount: number;
  }> {
  try {
    // 获取所有邀请记录
    const affiliatesData = await findAffiliatesByUserUuid(userUuid);

    // 计算统计数据
    const totalInviteCount = affiliatesData?.length || 0;
    const totalPaidCount = affiliatesData?.filter(
      (a) => a.status === "completed"
    ).length || 0;

    const totalRewardAmount = affiliatesData?.reduce(
      (sum, a) => sum + (a.reward_amount || 0),
      0
    ) || 0;

    return {
      totalInviteCount,
      totalPaidCount,
      totalRewardAmount,
    };
  } catch (error) {
    console.error("获取邀请统计信息出错:", error);
    return {
      totalInviteCount: 0,
      totalPaidCount: 0,
      totalRewardAmount: 0,
    };
  }
}

/** 获取所有邀请记录 */
export async function getAllAffiliates(): Promise<typeof affiliates.$inferSelect[]> {
  const data = await db()
    .select()
    .from(affiliates)
    .orderBy(desc(affiliates.created_at));

  return data;
}

/** 获取分页邀请记录 */
export async function getAllAffiliatesPaginated(
  page: number = 1,
  limit: number = 10
): Promise<typeof affiliates.$inferSelect[]> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(affiliates)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(affiliates.created_at));

  return data;
}

/** 获取邀请记录总数 */
export async function getAffiliatesTotal(): Promise<number> {
  const total = await db().$count(affiliates);
  return total;
}
