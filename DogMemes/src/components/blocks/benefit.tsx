"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CheckCircle, Package, Zap } from "lucide-react";

interface BenefitItem {
  id: string;
  icon: React.ReactNode;
}

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full dark:opacity-[0.1] opacity-[0.3]">
    <div className="absolute h-full w-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="h-full w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      />
    </div>
  </div>
);

const GradientBlob = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="h-[300px] w-[300px] rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-3xl"
    />
  </div>
);

export function Benefit() {
  const t = useTranslations("benefit");

  const benefits: BenefitItem[] = [
    {
      id: "framework",
      icon: <CheckCircle className="size-5" />,
    },
    {
      id: "templates",
      icon: <Package className="size-5" />,
    },
    {
      id: "guidance",
      icon: <Zap className="size-5" />,
    },
  ];

  return (
    <section className="relative overflow-hidden py-4 md:py-12 dark:bg-gray-900">
      <div className="container relative mx-auto px-4 sm:px-6 dark:bg-gray-900">
        <div className="grid min-h-[400px] md:min-h-[400px] gap-8 md:gap-12 lg:grid-cols-2 lg:gap-8">
          {/* 左侧视频 */}
          <div className="relative flex min-h-[300px] md:min-h-[400px] items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg overflow-hidden rounded-xl md:rounded-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-video w-full"
              >
                <video
                  className="h-full w-full rounded-xl md:rounded-2xl object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/benefit.mov" type="video/mp4" />
                  您的浏览器不支持视频标签。
                </video>
              </motion.div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="relative pt-4 md:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4 md:gap-6"
            >
              <h2 className="text-balance text-3xl md:text-4xl font-medium tracking-tight lg:text-5xl">
                {t("title")}
              </h2>

              <div className="mt-4 md:mt-8 grid gap-4 md:gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group relative rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="flex size-8 md:size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {t(`items.${benefit.id}.title`)}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t(`items.${benefit.id}.description`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
