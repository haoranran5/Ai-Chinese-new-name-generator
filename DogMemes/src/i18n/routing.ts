import { defineRouting } from "next-intl/routing";
import { locales, defaultLocale, localePrefix } from "./locale";

export const routing = defineRouting({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 语言前缀
  localePrefix,
});
