"use client";

import React, { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Zap, Layers, Code, Box, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  accentColor: string;
  borderHover: string;
  iconHover: string;
}

const CardDecorator = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    aria-hidden
    className={cn(
      "relative mx-auto size-36 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]",
      className
    )}
  >
    <div className="absolute inset-0 [--border:black] dark:[--border:hsl(217_33%_25%)] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-10 dark:opacity-20" />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l rounded-sm">
      {children}
    </div>
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  accentColor,
  borderHover,
  iconHover,
}: FeatureCardProps) => {
  return (
    <div className="group shadow-zinc-950/5">
      <CardHeader className="pb-3 relative">
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500",
            accentColor
          )}
        />

        <CardDecorator className={borderHover}>
          <Icon className={cn("size-6", iconHover)} aria-hidden />
        </CardDecorator>

        <h3 className="mt-6 font-medium text-foreground">{title}</h3>
        <CardContent className="px-0 pt-4">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </CardHeader>
    </div>
  );
};

export function Introduce() {
  const t = useTranslations("introduce");

  const features = [
    {
      icon: Layers,
      id: "templates",
      accentColor: "from-indigo-500 to-blue-500",
      borderHover:
        "group-hover:border-indigo-500/30 dark:group-hover:border-indigo-500/20",
      iconHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    },
    {
      icon: Code,
      id: "infrastructure",
      accentColor: "from-rose-500 to-pink-500",
      borderHover:
        "group-hover:border-rose-500/30 dark:group-hover:border-rose-500/20",
      iconHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    },
    {
      icon: Box,
      id: "deployment",
      accentColor: "from-emerald-500 to-teal-500",
      borderHover:
        "group-hover:border-emerald-500/30 dark:group-hover:border-emerald-500/20",
      iconHover:
        "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
  ];

  return (
    <section className="py-10 md:py-20 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-6 ">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-8 px-3 py-1 border-border hover:bg-muted transition-colors duration-300 dark:text-white dark:border-border/60"
          >
            <Zap className="mr-2 h-4 w-4 text-primary" />
            {t("badge")}
          </Badge>

          <h2 className="text-balance text-4xl font-semibold lg:text-5xl text-foreground">
            {t("title.first")}
            <span className="block mt-1 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">
                {t("title.highlight")}
              </span>
              <div className="absolute -bottom-1 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0"></div>
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="overflow-hidden border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 dark:border-border/60 dark:hover:border-border/80 "
            >
              <FeatureCard
                icon={feature.icon}
                title={t(`features.${feature.id}.title`)}
                description={t(`features.${feature.id}.description`)}
                accentColor={feature.accentColor}
                borderHover={feature.borderHover}
                iconHover={feature.iconHover}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
