// 语言配置 - 在这里添加新语言
export const locales = ["en", "zh"];

export const localeNames = {
  en: "English",
  zh: "中文"
};

export const defaultLocale = "en";

export const localePrefix = "as-needed";

// 类型定义
export type Locale = (typeof locales)[number];
