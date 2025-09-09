"use client";

import { useInviteCode } from "@/hooks/useInviteCode";

export function InviteCodeHandler() {
  // 使用邀请码钩子来处理登录后的邀请码逻辑
  useInviteCode();

  // 这个组件不渲染任何内容，只是处理邀请码逻辑
  return null;
}
