import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  findAffiliatesByUserUuid,
  getAffiliateStats,
} from "@/models/affiliate";
import { findUserByUuid } from "@/models/user";
import {respErr} from "@/lib/response";
import { getUserByUuid } from "@/models/user";


export async function GET(request: NextRequest) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 获取请求参数
    const { searchParams } = new URL(request.url);
    const uuid = searchParams.get("uuid");

    if (!uuid) {
      return respErr("User uuid cannot be empty");
    }

    // 确保只能查询自己的信息
    if (uuid !== session.user.uuid) {
      return respErr("You can only query your own information");
    }

    const user = await findUserByUuid(uuid);
    if (!user) {
      return respErr("User does not exist");
    }

    // 查询邀请记录
    const affiliates = await findAffiliatesByUserUuid(user.uuid);

    // 获取所有相关的用户信息
    const userUuids = [...new Set(affiliates?.map((a) => a.user_uuid))];
    const usersData = await getUserByUuid(userUuids);

    // 创建UUID到邮箱的映射
    const userEmailMap = new Map();
    if (usersData) {
      usersData.forEach((user) => {
        userEmailMap.set(user.uuid, user.email);
      });
    }

    // 合并数据
    const enrichedAffiliates = affiliates?.map((affiliate) => ({
      ...affiliate,
      user_email: userEmailMap.get(affiliate.user_uuid) || "Unknown user",
    }));

    // 获取统计信息
    const stats = await getAffiliateStats(user.uuid);

    return NextResponse.json({
      affiliates: enrichedAffiliates,
      stats,
    });
  } catch (error) {
    console.error("Error getting affiliates:", error);
    return NextResponse.json(
      { error: "Error getting affiliates" },
      { status: 500 }
    );
  }
}
