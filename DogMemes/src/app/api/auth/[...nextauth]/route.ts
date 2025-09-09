import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";// 登录回调处理文件

// 全部在@/lib/auth处理
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
