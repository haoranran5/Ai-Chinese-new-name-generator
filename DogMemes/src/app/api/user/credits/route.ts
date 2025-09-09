import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { respErr, respData } from "@/lib/response";
import { 
  getCreditsByUserUuidPaginated, 
  getUserCreditsCount,
  getUserCreditsStats 
} from "@/models/credits";
import { findUserByUuid } from "@/models/user";

export async function GET(request: NextRequest) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return respErr("Unauthorized", 401);
    }

    // 获取查询参数
    const searchParams = request.nextUrl.searchParams;
    const userUuid = searchParams.get("user_uuid");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // 根据参数添加过滤条件
    if (userUuid) {
      // 确保用户只能查看自己的积分记录
      if (userUuid !== session.user.uuid) {
        return respErr("Forbidden", 403);
      }
    } else {
      return respErr("Missing required parameters", 400);
    }

    // 验证用户是否存在
    const user = await findUserByUuid(userUuid);
    if (!user) {
      return respErr("User not found", 404);
    }

    // 获取积分记录和统计信息
    const [credits, totalCredits, stats] = await Promise.all([
      getCreditsByUserUuidPaginated(userUuid, page, limit),
      getUserCreditsCount(userUuid),
      getUserCreditsStats(userUuid),
    ]);

    if (!credits) {
      console.error("Failed to fetch credits");
      return respErr("Failed to fetch credits", 500);
    }

    const totalPages = Math.ceil(totalCredits / limit);

    return respData({
      credits,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords: totalCredits,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      stats,
      userCredits: user.credits || 0,
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    return respErr("Internal server error", 500);
  }
}
