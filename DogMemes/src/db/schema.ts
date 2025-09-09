import { pgTable, serial, varchar, text, timestamp, integer, uuid as pgUuid } from "drizzle-orm/pg-core";

// Posts 表
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  uuid: pgUuid("uuid").defaultRandom().notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description"),
  content: text("content"),
  status: varchar("status", { length: 50 }).notNull().default("draft"),
  locale: varchar("locale", { length: 10 }).notNull().default("zh"),
  author_avatar_url: varchar("author_avatar_url", { length: 500 }),
  author_name: varchar("author_name", { length: 100 }),
  cover_url: varchar("cover_url", { length: 500 }),
  created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

// Users 表
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uuid: pgUuid("uuid").defaultRandom().notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  nickname: varchar("nickname", { length: 100 }).notNull(),
  avatar_url: varchar("avatar_url", { length: 500 }),
  signin_type: varchar("signin_type", { length: 50 }).notNull(),
  signin_ip: varchar("signin_ip", { length: 45 }),
  signin_provider: varchar("signin_provider", { length: 50 }),
  signin_openid: varchar("signin_openid", { length: 255 }),
  invite_code: varchar("invite_code", { length: 50 }),
  invited_by: varchar("invited_by", { length: 50 }),
  created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
  credits: integer("credits").notNull().default(0),
  credits_expired_at: timestamp("credits_expired_at", { mode: 'string' }),
});

// Orders 表
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  order_no: varchar("order_no", { length: 100 }).notNull().unique(),
  user_uuid: pgUuid("user_uuid").notNull(),
  user_email: varchar("user_email", { length: 255 }).notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("usd"),
  interval: varchar("interval", { length: 20 }),
  credits: integer("credits"),
  product_id: varchar("product_id", { length: 100 }),
  product_name: varchar("product_name", { length: 255 }),
  valid_months: integer("valid_months"),
  order_detail: text("order_detail"),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  expired_at: timestamp("expired_at", { mode: 'string' }),
  // 订阅相关字段
  sub_id: varchar("sub_id", { length: 100 }),
  sub_interval_count: integer("sub_interval_count"),
  sub_cycle_anchor: timestamp("sub_cycle_anchor", { mode: 'string' }),
  sub_period_end: timestamp("sub_period_end", { mode: 'string' }),
  sub_period_start: timestamp("sub_period_start", { mode: 'string' }),
  sub_times: integer("sub_times"),
  // 支付相关字段
  stripe_session_id: varchar("stripe_session_id", { length: 255 }),
  paid_at: timestamp("paid_at", { mode: 'string' }),
  paid_email: varchar("paid_email", { length: 255 }),
  paid_detail: text("paid_detail"),
  created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull()
});

// Affiliate 表
export const affiliates = pgTable("affiliates", {
  id: serial("id").primaryKey(),
  user_uuid: pgUuid("user_uuid").notNull(),
  paid_order_no: varchar("paid_order_no", { length: 100 }),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  paid_amount: integer("paid_amount"),
  reward_percent: integer("reward_percent"),
  reward_amount: integer("reward_amount"),
  invited_by: varchar("invited_by", { length: 50 }),
  created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull()
});

// Credits 表
export const credits = pgTable("credits", {
  id: serial("id").primaryKey(),
  trans_no: varchar("trans_no", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at", { mode: 'string', withTimezone: true }),
  user_uuid: varchar("user_uuid", { length: 255 }).notNull(),
  trans_type: varchar("trans_type", { length: 50 }).notNull(),
  credits: integer("credits").notNull(),
  order_no: varchar("order_no", { length: 255 }),
  expired_at: timestamp("expired_at", { mode: 'string', withTimezone: true })
});

// API Keys 表
export const apikeys = pgTable("apikeys", {
  id: serial("id").primaryKey(),
  apikey: varchar("apikey", { length: 255 }).notNull().unique(),
  user_uuid: varchar("user_uuid", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  created_at: timestamp("created_at", { mode: 'string', withTimezone: true }).defaultNow(),
  status: varchar("status", { length: 50 }).notNull().default("active")
});



// 导出类型
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type Affiliate = typeof affiliates.$inferSelect;
export type NewAffiliate = typeof affiliates.$inferInsert;
export type Credit = typeof credits.$inferSelect;
export type NewCredit = typeof credits.$inferInsert;
