import { NextRequest, NextResponse } from "next/server";
import { findUserByInviteCode } from "@/models/user";

export async function GET(request: NextRequest) {
  try {
    // 获取邀请码
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Invite code cannot be empty" },
        { status: 400 }
      );
    }

    // 查找邀请人
    const inviter = await findUserByInviteCode(code);
    if (!inviter) {
      return NextResponse.json(
        { error: "Invite code is invalid" },
        { status: 404 }
      );
    }

    // 返回邀请人信息（去除敏感字段）
    const { signin_ip, signin_openid, signin_type, ...safeInviter } = inviter;

    return NextResponse.json({ inviter: safeInviter });
  } catch (error) {
    console.error("Error checking invite code:", error);
    return NextResponse.json(
      { error: "Error checking invite code" },
      { status: 500 }
    );
  }
}
