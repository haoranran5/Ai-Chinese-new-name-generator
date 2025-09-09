"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Circle } from "@/components/magicui/circle";

export function Usage() {
  const t = useTranslations("usage");
  const containerRef = useRef<HTMLDivElement>(null);

  // 中心节点
  const centerRef = useRef<HTMLDivElement>(null);

  // 四个步骤节点
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  const steps = [
    { number: "1", id: "get", ref: step1Ref },
    { number: "2", id: "start", ref: step2Ref },
    { number: "3", id: "customize", ref: step3Ref },
    { number: "4", id: "deploy", ref: step4Ref },
  ];

  return (
    <section className="py-10 sm:py-16 lg:py-20 relative overflow-hidden dark:bg-gray-900">
      <div className="absolute inset-0 opacity-30" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t("title")}
          </h2>
        </div>

        {/* 动画展示区域 - 移动端隐藏，桌面端显示 */}
        <div className="hidden lg:block relative h-[200px] mb-12" ref={containerRef}>
          {/* 四个步骤的圆，位于水平线上 */}
          <div className="absolute left-[10%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step1Ref}
              className="size-16 border-indigo-100 dark:border-indigo-800 bg-white dark:bg-gray-800"
            >
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
            </Circle>
          </div>

          <div className="absolute left-[35%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step2Ref}
              className="size-16 border-indigo-100 dark:border-indigo-800 bg-white dark:bg-gray-800"
            >
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
            </Circle>
          </div>

          <div className="absolute left-[60%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step3Ref}
              className="size-16 border-indigo-100 dark:border-indigo-800 bg-white dark:bg-gray-800"
            >
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
            </Circle>
          </div>

          <div className="absolute left-[85%] top-1/2 -translate-y-1/2 z-20">
            <Circle
              ref={step4Ref}
              className="size-16 border-indigo-100 dark:border-indigo-800 bg-white dark:bg-gray-800"
            >
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">4</span>
            </Circle>
          </div>

          {/* 连接线放在底层 */}
          <div className="z-10">
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step1Ref}
              toRef={step2Ref}
              pathColor="#E0E7FF"
              pathOpacity={0.8}
              gradientStartColor="#4F46E5"
              gradientStopColor="#818CF8"
              pathWidth={3}
            />

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step2Ref}
              toRef={step3Ref}
              pathColor="#E0E7FF"
              pathOpacity={0.8}
              gradientStartColor="#4F46E5"
              gradientStopColor="#818CF8"
              pathWidth={3}
            />

            <AnimatedBeam
              containerRef={containerRef}
              fromRef={step3Ref}
              toRef={step4Ref}
              pathColor="#E0E7FF"
              pathOpacity={0.8}
              gradientStartColor="#4F46E5"
              gradientStopColor="#818CF8"
              pathWidth={3}
            />
          </div>
        </div>

        {/* 步骤卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-200 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="flex justify-center items-center h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mr-3 flex-shrink-0">
                  <span className="font-bold">{step.number}</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                  {t(`steps.${step.id}.title`)}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t(`steps.${step.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
