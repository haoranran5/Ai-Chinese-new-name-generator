"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Star,
  Zap,
  Gift,
  Users,
  Shield,
  Infinity,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function CTASection() {
  const t = useTranslations("cta");

  const features = t.raw("features");

  const stats = [
    { icon: Users, value: "30+", label: t("stats.customers") },
    { icon: Star, value: "340+", label: t("stats.components") },
    { icon: Zap, value: "600+", label: t("stats.commits") },
  ];

  return (
    <section className="relative overflow-hidden bg-indigo-900 py-24 sm:py-32 dark:bg-gray-900">
      {/* 波浪图形背景 */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-48 opacity-20 text-indigo-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,176C384,160,480,96,576,90.7C672,85,768,139,864,149.3C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute top-0 left-0 right-0 w-full h-48 opacity-20 text-indigo-600 transform rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,176C384,160,480,96,576,90.7C672,85,768,139,864,149.3C960,160,1056,128,1152,101.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-xl leading-8 text-indigo-100">
            {t("subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Button
            variant="outline"
            className="bg-white text-indigo-900 hover:bg-indigo-50"
          >
           <a href="#pricing">
              {t("buttons.get")}
              </a>
          </Button>
          <Button
            variant="outline"
            className="border-white text-black hover:bg-white/10 dark:text-white"
          >
           <a href="https://docs.ravensaas.io" target="_blank" rel="noopener noreferrer">
              {t("buttons.docs")}
              </a>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
