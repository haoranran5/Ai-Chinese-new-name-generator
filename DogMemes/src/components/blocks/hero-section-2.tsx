"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useTranslations } from "next-intl";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white via-70% to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:via-70% dark:to-blue-950 py-12 sm:py-16 md:py-20 lg:py-24">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-16 sm:-right-32 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-16 sm:-left-32 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-tr from-purple-400/10 to-pink-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-gradient-to-r from-blue-400/5 to-purple-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* 特色徽章 */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <Badge
              variant="outline"
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-all duration-300"
            >
              <Sparkles className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {t("specialOffer")}
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Badge>
          </div>

          {/* 主标题 */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="block">{t("title")}</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI SaaS
            </span>
            <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl mt-2">
              {t("description")}
            </span>
          </h1>

          {/* 副标题 */}
          <p className="mt-4 sm:mt-8 text-base sm:text-lg md:text-xl leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle.main")}
            <span className="block mt-2 font-semibold text-gray-900 dark:text-white">
              {t("subtitle.highlight")}
            </span>
          </p>

          {/* 用户头像群组 */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="flex -space-x-1.5 sm:-space-x-2">
              <AvatarCircles numPeople={99} avatarUrls={avatars} />
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0">
              <span className="font-semibold text-gray-900 dark:text-white">
                {t("users.count")}
              </span>{" "}
              {t("users.chooseRaven")}
            </div>
          </div>

          {/* CTA 按钮 */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/magicui">
              <AnimatedGradientText className="w-36">
                {t("cta.getStarted")}
              </AnimatedGradientText>
            </Link>
            <Link href="/magicui" className="w-full sm:w-auto">
              <RainbowButton className="w-36">{t("cta.doc")}</RainbowButton>
            </Link>
          </div>

          {/* 特性标签 */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500" />
              <span>{t("features.lifetimeUpdates")}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
              <span>{t("features.unlimitedProjects")}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-500" />
              <span>{t("features.technicalSupport")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
