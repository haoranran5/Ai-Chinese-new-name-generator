import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc, gte, and } from "drizzle-orm";

//前端显示[过滤已发布文章]
export async function getPosts(
  page: number = 1,
  limit: number = 10,
): Promise<(typeof posts.$inferSelect)[] | undefined> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(posts.created_at));

  return data;
}

export async function getPostsByLocale(
  locale: string,
  page: number = 1,
  limit: number = 10
): Promise<(typeof posts.$inferSelect)[] | undefined> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(posts)
    .where(and(eq(posts.status, "published"), eq(posts.locale, locale)))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(posts.created_at));

  return data;
}

export async function getPostsLocaleTotal(locale: string): Promise<number> {
  const total = await db().$count(posts, and(eq(posts.status, "published"), eq(posts.locale, locale)));
  
  return total;
}

//后台显示
export async function getAllPosts(
  page: number = 1,
  limit: number = 10
): Promise<(typeof posts.$inferSelect)[] | undefined> {
  const offset = (page - 1) * limit;

  const data = await db()
    .select()
    .from(posts)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(posts.created_at));

  return data;
}

export async function getPostsTotal(): Promise<number> {
  const total = await db().$count(posts);
  
  return total;
}

export async function getPostById(
  id: string
): Promise<typeof posts.$inferSelect | undefined> {
  const [post] = await db()
      .select()
      .from(posts)
      .where(eq(posts.id, parseInt(id)))
      .limit(1);

    return post;
}

export async function getPostBySlug(
  slug: string
  // locale: string
): Promise<typeof posts.$inferSelect | undefined> {
  const [post] = await db()
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      // .where(and(eq(posts.slug, slug), eq(posts.locale, locale)))
      .limit(1);

    return post;
}

export async function updatePost(
  id: string,
  data: Partial<typeof posts.$inferInsert>
): Promise<typeof posts.$inferSelect | undefined> {
  const [post] = await db()
    .update(posts)
    .set(data)
    .where(eq(posts.id, parseInt(id)))
    .returning();
 
  return post;
}

export async function insertPost(
  data: typeof posts.$inferInsert
): Promise<typeof posts.$inferSelect | undefined> {
  const [post] = await db().insert(posts).values(data).returning();

  return post;
}

/**
 * 获取今日新增文章数量
 * @returns 今日新增文章数量
 */
export async function getTodayPostsCount(): Promise<number> {
  // 获取今天的开始时间
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  const todayPosts = await db()
    .$count(posts, gte(posts.created_at, todayISOString));

  return todayPosts;
}