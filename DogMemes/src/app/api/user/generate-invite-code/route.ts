import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  findUserByUuid,
  updateUser,
  generateUniqueInviteCode,
} from "@/models/user";

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 获取请求数据
    const { uuid } = await request.json();

    if (!uuid) {
      return NextResponse.json(
        { error: "User uuid cannot be empty" },
        { status: 400 }
      );
    }

    // 确保只能更新自己的信息
    if (uuid !== session.user.uuid) {
      return NextResponse.json(
        { error: "You can only update your own information" },
        { status: 403 }
      );
    }

    // 查询用户信息
    const user = await findUserByUuid(uuid);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    // 生成唯一邀请码
    const inviteCode = await generateUniqueInviteCode();

    // 更新用户邀请码
    const updatedUser = await updateUser(user.uuid, {
      invite_code: inviteCode,
    });
    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update invite code" },
        { status: 500 }
      );
    }

    return NextResponse.json({ inviteCode });
  } catch (error) {
    console.error("Error generating invite code:", error);
    return NextResponse.json(
      { error: "Error generating invite code" },
      { status: 500 }
    );
  }
}
