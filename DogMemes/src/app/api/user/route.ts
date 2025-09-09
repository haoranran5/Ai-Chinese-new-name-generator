import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { findUserByUuid } from "@/models/user";
import { respErr, respOk } from "@/lib/response";

export async function GET(request: NextRequest) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return respErr("Unauthorized");
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

    // 查询用户信息
    const user = await findUserByUuid(uuid);
    if (!user) {
      return respErr("User does not exist");
    }

    // 返回用户信息（去除敏感字段）
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { signin_ip, signin_openid, signin_type, ...safeUser } = user;

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("Error getting user information:", error);
    return NextResponse.json(
      { error: "Error getting user information" },
      { status: 500 }
    );
  }
}
