"use client";

import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Layers,
  Code,
  Box,
} from "lucide-react";
import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useTranslations } from "next-intl";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

import { MagicCard } from "@/components/magicui/magic-card";
import { BentoGrid } from "@/components/magicui/bento-grid";
import { BoxReveal } from "@/components/magicui/box-reveal";
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";

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

const features = [
  {
    icon: Layers,
    id: "templates",
    accentFrom: "from-indigo-500",
    accentTo: "to-blue-500",
  },
  {
    icon: Code,
    id: "infrastructure",
    accentFrom: "from-rose-500",
    accentTo: "to-pink-500",
  },
  {
    icon: Box,
    id: "deployment",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
  },
];

export function HeroSection() {
  const t = useTranslations("hero");
  const usage = useTranslations("usage");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white via-70% to-purple-50/80 dark:from-slate-950 dark:via-slate-900/95 dark:via-70% dark:to-blue-950/90 py-8 sm:py-10 md:py-14 lg:py-18">
      {/* 动感背景 - 仅在亮色模式显示 */}
      <div className="dark:hidden">
        <AnimatedGridPattern
          className="absolute inset-0 z-0"
          gridSize={48}
          strokeColor="#e0e7ef"
          maxOpacity={0.12}
        />
      </div>

      {/* 特色徽章 */}
      <div className="mb-6 sm:mb-8 flex justify-center">
        <Badge
          variant="outline"
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-200/60 dark:border-blue-700/60 text-blue-700 dark:text-blue-300 hover:bg-blue-50/80 dark:hover:bg-blue-900/40 hover:border-blue-300/80 dark:hover:border-blue-600/80 transition-all duration-300 shadow-sm dark:shadow-blue-900/20"
        >
          <Sparkles className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
          {t("specialOffer")}
          <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
        </Badge>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="mx-auto max-w-3xl text-center mb-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">
            {t("title")}
            <span className="block mt-4">
              <AnimatedGradientText className="text-4xl sm:text-5xl font-extrabold">
                {t("description")}
              </AnimatedGradientText>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {t("subtitle.main")}
          </p>
          <p className="mt-6 text-base font-bold leading-8 text-slate-700 dark:text-slate-200">
            {t("subtitle.highlight")}
          </p>
        </div>
      </div>
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-16 sm:-right-32 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-br from-blue-400/15 to-purple-600/15 dark:from-blue-500/20 dark:to-purple-700/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-16 sm:-left-32 w-60 sm:w-96 h-60 sm:h-96 bg-gradient-to-tr from-purple-400/15 to-pink-600/15 dark:from-purple-500/20 dark:to-pink-700/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[30rem] h-80 sm:h-[30rem] bg-gradient-to-r from-blue-400/8 to-purple-600/8 dark:from-blue-500/12 dark:to-purple-700/12 rounded-full blur-[100px]"></div>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Terminal className="min-h-[200px] sm:min-h-[250px] overflow-x-auto bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-slate-900/50 w-full max-w-[90vw] sm:max-w-[600px]">
              <TypingAnimation className="text-slate-700 dark:text-slate-300">{`> ${t("terminal.start")}`}</TypingAnimation>

              <AnimatedSpan
                delay={2000}
                className="text-green-600 dark:text-green-400 whitespace-pre-wrap break-words"
              >
                <span>✔ {usage("steps.get.title")}</span>
              </AnimatedSpan>

              <AnimatedSpan delay={2500} className="text-green-600 dark:text-green-400">
                <span>✔ {usage("steps.customize.title")}</span>
              </AnimatedSpan>

              <AnimatedSpan delay={3000} className="text-green-600 dark:text-green-400">
                <span>✔ {usage("steps.deploy.title")}</span>
              </AnimatedSpan>

              <AnimatedSpan delay={3500} className="text-blue-600 dark:text-blue-400">
                <span>ℹ Updated 1 file:</span>
                <span className="pl-2 text-slate-600 dark:text-slate-400">- SaaS/Raven</span>
              </AnimatedSpan>

              <TypingAnimation
                delay={4000}
                className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap break-words"
              >
                {`${t("success")}`}
              </TypingAnimation>
            </Terminal>
          </div>

          {/* 用户头像群组 */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="flex -space-x-1.5 sm:-space-x-2">
              <AvatarCircles numPeople={99} avatarUrls={avatars} />
            </div>
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 sm:mt-0">
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {t("users.count")}
              </span>{" "}
              {t("users.chooseRaven")}
            </div>
          </div>

          {/* CTA 按钮 */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="#pricing">
              <AnimatedGradientText className="w-36">
                {t("cta.getStarted")}
              </AnimatedGradientText>
            </Link>
            <Link href="https://docs.ravensaas.io" className="w-full sm:w-auto">
              <RainbowButton className="w-36">{t("cta.doc")}</RainbowButton>
            </Link>
          </div>

          {/* 特性标签 */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-yellow-50/80 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-700/30">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-600 dark:text-yellow-400" />
              <span className="text-yellow-700 dark:text-yellow-300">{t("features.lifetimeUpdates")}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/30">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-700 dark:text-blue-300">{t("features.unlimitedProjects")}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-purple-50/80 dark:bg-purple-900/20 border border-purple-200/50 dark:border-purple-700/30">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-purple-700 dark:text-purple-300">{t("features.technicalSupport")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
