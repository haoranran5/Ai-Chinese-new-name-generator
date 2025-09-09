import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径，但排除静态文件和特定API路径
  matcher: [
    "/",
    "/(en|en-uS|zh|zh-CN|zh-TW|zh-HK|zh-Mo|ja|ko|ru|fr|de|ar|es|it)/:path*",
    "/((?!api|admin|_next|_vercel|.*\\..*).*)"
  ],
};
