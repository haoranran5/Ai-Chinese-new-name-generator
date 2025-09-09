import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// 为了向后兼容，重新导出 services/user 中的函数
export {
  getUserInfo,
  serverGetUserInfo,
  getUserUuid,
  serverGetUserUuid,
  getUserBasicInfo,
  serverGetUserBasicInfo,
} from "@/services/user";

// 检查是否是管理员
export const checkIsAdminAndLogin = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) return false;
  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
  return adminEmails.includes(session.user.email as string);
};

// 检查登录的status
export const checkLoginStatus = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
