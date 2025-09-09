"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation"; // 从 next-intl 导航工具导入
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, localeNames } from "@/i18n/locale";

// 从集中配置生成语言列表
const languages = locales.map(code => ({
  code,
  name: localeNames[code as keyof typeof localeNames]
}));

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // 获取当前路径

  // 切换语言函数
  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      // 使用 next-intl 提供的 router.replace，保持当前路径但切换语言
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="flex items-center gap-2 w-auto px-2"
          title="切换语言"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm">
            {languages.find((lang) => lang.code === locale)?.name}
          </span>
          <span className="sr-only">切换语言</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={`cursor-pointer ${
              locale === lang.code ? "font-medium" : ""
            }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
