"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CreditCard,
  Zap,
  Palette,
  Code,
  Mail,
  BarChart3,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useId } from "react";

export function FeaturesSection() {
  const t = useTranslations("features");

  const features = [
    {
      icon: Shield,
      id: "auth",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
    },
    {
      icon: CreditCard,
      id: "payment",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/50",
    },
    {
      icon: Mail,
      id: "marketing",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/50",
    },
    {
      icon: Palette,
      id: "config",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/50",
    },
    {
      icon: Code,
      id: "developer",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/50",
    },
    {
      icon: BarChart3,
      id: "analytics",
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50 dark:bg-teal-950/50",
    },
  ];

  const problems = [
    {
      icon: Code,
      id: "ui",
      bgColor: "from-red-500 to-pink-500",
    },
    {
      icon: CreditCard,
      id: "payment",
      bgColor: "from-yellow-500 to-orange-500",
    },
    {
      icon: Zap,
      id: "foundation",
      bgColor: "from-blue-500 to-purple-500",
    },
  ];

  return (
    <section className="relative py-10 lg:py-20 overflow-hidden">
      <div className="absolute inset-0  to-white dark:bg-gray-900"></div>
      <Grid />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 dark:bg-gray-900">
        {/* 标题部分 */}
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t("title.first")}
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("title.highlight")}
            </span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        {/* 功能网格 - 新设计 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 dark:to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <CardHeader className="relative space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 flex items-center justify-center`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">
                  {t(`items.${feature.id}.title`)}
                </CardTitle>
                <CardDescription className="text-base">
                  {t(`items.${feature.id}.description`)}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative pt-4">
                <ul className="space-y-3">
                  {t
                    .raw(`items.${feature.id}.details`)
                    .map((detail: string, detailIndex: number) => (
                      <li
                        key={detailIndex}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full mr-3 bg-gradient-to-r ${feature.color}`}
                        ></div>
                        {detail}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 问题解决部分 - 新设计 */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("problems.title")}
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("problems.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 group hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${problem.bgColor} opacity-10`}
                ></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <problem.icon className="h-8 w-8 text-gray-900 dark:text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {t(`problems.items.${problem.id}.title`)}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t(`problems.items.${problem.id}.description`)}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const Grid = () => {
  const patternId = useId();
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900">
      <div className="absolute h-full w-full [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]">
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern
              id={patternId}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              x="-12"
              y="4"
            >
              <path
                d="M.5 40V.5H40"
                fill="none"
                className="stroke-zinc-200/30 dark:stroke-zinc-700/30"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill={`url(#${patternId})`}
          />
        </svg>
      </div>
    </div>
  );
};
