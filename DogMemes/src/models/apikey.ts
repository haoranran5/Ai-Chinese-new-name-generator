import { db } from "@/db";
import { apikeys, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

/**
 * 生成 API Key
 * @returns 生成的 API Key 字符串
 */
export function generateApiKey(): string {
  const prefix = "sk-";
  // 使用 Web Crypto API 生成随机字符串，生成22.5字节(45个十六进制字符)
  const array = new Uint8Array(23);
  crypto.getRandomValues(array);
  const randomPart = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').substring(0, 48);
  return `${prefix}${randomPart}`; // sk-48字符
}

/**
 * 创建新的 API Key
 * @param userUuid 用户 UUID
 * @param name API Key 名称
 * @returns 创建的 API Key 记录
 */
export async function createApiKey(
  userUuid: string,
  name?: string
): Promise<typeof apikeys.$inferSelect | undefined> {
  const apikey = generateApiKey();

  const [newApiKey] = await db()
    .insert(apikeys)
    .values({
      apikey,
      user_uuid: userUuid,
      name: name || `API Key ${new Date().toLocaleDateString()}`,
      created_at: new Date().toISOString(),
      status: "active"
    })
    .returning();

  return newApiKey;
}

/**
 * 根据 API Key 查找记录
 * @param apikey API Key 字符串
 * @returns API Key 记录
 */
export async function findApiKeyByKey(
  apikey: string
): Promise<typeof apikeys.$inferSelect | undefined> {
  const [record] = await db()
    .select()
    .from(apikeys)
    .where(eq(apikeys.apikey, apikey))
    .limit(1);

  return record;
}

/**
 * 验证 API Key 是否有效
 * @param apikey API Key 字符串
 * @returns 是否有效
 */
export async function validateApiKey(apikey: string): Promise<boolean> {
  const record = await findApiKeyByKey(apikey);
  return record !== undefined && record.status === "active";
}

/**
 * 获取所有 API Keys (管理员用)
 * @returns API Key 列表
 */
export async function getAllApiKeys(): Promise<(typeof apikeys.$inferSelect)[]> {
  const data = await db()
    .select()
    .from(apikeys)
    .orderBy(desc(apikeys.created_at));

  return data;
}

/**
 * 获取用户的 API Keys
 * @param userUuid 用户 UUID
 * @returns 用户的 API Key 列表
 */
export async function getUserApiKeys(
  userUuid: string
): Promise<(typeof apikeys.$inferSelect)[]> {
  const data = await db()
    .select()
    .from(apikeys)
    .where(eq(apikeys.user_uuid, userUuid))
    .orderBy(desc(apikeys.created_at));

  return data;
}

/**
 * 更新 API Key 状态
 * @param id API Key ID
 * @param status 新状态
 * @returns 更新后的记录
 */
export async function updateApiKeyStatus(
  id: number,
  status: string
): Promise<typeof apikeys.$inferSelect | undefined> {
  const [updatedRecord] = await db()
    .update(apikeys)
    .set({ status })
    .where(eq(apikeys.id, id))
    .returning();

  return updatedRecord;
}

/**
 * 更新 API Key 信息
 * @param id API Key ID
 * @param name 新名称
 * @param status 新状态
 * @returns 更新后的记录
 */
export async function updateApiKey(
  id: number,
  name?: string,
  status?: string
): Promise<typeof apikeys.$inferSelect | undefined> {
  const updateData: Partial<typeof apikeys.$inferInsert> = {};

  if (name !== undefined) {
    updateData.name = name;
  }

  if (status !== undefined) {
    updateData.status = status;
  }

  const [updatedRecord] = await db()
    .update(apikeys)
    .set(updateData)
    .where(eq(apikeys.id, id))
    .returning();

  return updatedRecord;
}

/**
 * 删除 API Key
 * @param id API Key ID
 * @returns 是否删除成功
 */
export async function deleteApiKey(id: number): Promise<boolean> {
  try {
    await db()
      .delete(apikeys)
      .where(eq(apikeys.id, id));
    
    return true;
  } catch (error) {
    console.error("删除 API Key 失败:", error);
    return false;
  }
}

/**
 * 根据 ID 查找 API Key
 * @param id API Key ID
 * @returns API Key 记录
 */
export async function findApiKeyById(
  id: number
): Promise<typeof apikeys.$inferSelect | undefined> {
  const [record] = await db()
    .select()
    .from(apikeys)
    .where(eq(apikeys.id, id))
    .limit(1);

  return record;
}

/**
 * 根据 API Key 查找用户信息
 * @param apikey API Key 字符串
 * @returns 用户信息
 */
export async function findUserByApiKey(
  apikey: string
): Promise<typeof users.$inferSelect | undefined> {
  const [result] = await db()
    .select({
      id: users.id,
      uuid: users.uuid,
      email: users.email,
      nickname: users.nickname,
      avatar_url: users.avatar_url,
      signin_type: users.signin_type,
      signin_ip: users.signin_ip,
      signin_provider: users.signin_provider,
      signin_openid: users.signin_openid,
      invite_code: users.invite_code,
      invited_by: users.invited_by,
      created_at: users.created_at,
      credits: users.credits,
      credits_expired_at: users.credits_expired_at,
    })
    .from(apikeys)
    .innerJoin(users, eq(apikeys.user_uuid, users.uuid))
    .where(eq(apikeys.apikey, apikey))
    .limit(1);

  return result;
}
