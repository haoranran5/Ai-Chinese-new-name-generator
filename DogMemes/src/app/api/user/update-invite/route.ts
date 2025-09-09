import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { findUserByInviteCode, updateUserInviteRelation } from "@/models/user";
import { respErr, respOk } from "@/lib/response";

export async function POST(request: NextRequest) {
  try {
    // 获取当前用户会话
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return respErr("Unauthorized");
    }

    // 获取请求数据
    const { inviteCode } = await request.json();

    if (!inviteCode) {
      return respErr("Invite code cannot be empty");
    }

    // 查找邀请人
    const inviter = await findUserByInviteCode(inviteCode);
    if (!inviter) {
      return respErr("Invite code is invalid");
    }

    // 更新用户的邀请关系
    const updatedUser = await updateUserInviteRelation(
      session.user.uuid,
      inviter.uuid
    );

    if (!updatedUser ||updatedUser === undefined) {
      return respErr("Failed to update invite relation");
    }

    // 检查是否用户已经有邀请人（返回的是原用户数据）
    if (updatedUser.invited_by && updatedUser.invited_by !== inviter.uuid) {
      return respErr("User already has an inviter");
    }

    return NextResponse.json({
      success: true,
      inviter: {
        uuid: inviter.uuid,
        email: inviter.email,
        nickname: inviter.nickname
      }
    });
  } catch (error) {
    console.error("Error updating invite relation:", error);
    return respErr("Error updating invite relation");
  }
}
