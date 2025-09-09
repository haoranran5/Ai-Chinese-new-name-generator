"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useId } from "react";
import { CheckoutButton } from "@/components/stripe/checkout-button";

interface PricingFeature {
  id: string;
  text?: string;
}

interface PricingPlan {
  id: string;
  title?: string;
  name?: string;
  originalPrice?: string;
  price?: string;
  description?: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText?: string;
  additionalText?: string;
  additionalFeatures?: string;
  color?: string;
  paymentType?: string;
}

export function Pricing() {
  const t = useTranslations("pricing");

  // 从国际化文件中读取计划配置
  const plansData = t.raw("plans") as Record<string, any>;
  const planIds = Object.keys(plansData);

  const plans: PricingPlan[] = planIds.map((planId, index) => {
    // 从国际化文件中获取功能列表
    const featuresFromI18n = t.raw(`plans.${planId}.features`) as string[] || [];
    const features = featuresFromI18n.map(featureId => ({ id: featureId }));

    // 从国际化文件中获取价格信息
    const amount = t.raw(`plans.${planId}.amount`) as number || 0;
    const price = `$${(amount / 100).toFixed(0)}`;
    const originalAmount = t.raw(`plans.${planId}.originalPrice`) as number || 0;
    const originalPrice = originalAmount ? `$${(originalAmount / 100).toFixed(0)}` : "";
    

    return {
      id: planId,
      price,
      features,
      originalPrice,
      isPopular: t.raw(`plans.${planId}.isPopular`) || false,
      color: index === 0 ? "from-blue-400 to-cyan-400" :
             index === 1 ? "from-violet-400 to-purple-400" :
             "from-rose-400 to-pink-400",
      paymentType: t(`plans.${planId}.paymentType`),
    };
  });

  return (
    <section id="pricing" className="relative py-10 lg:py-20 overflow-hidden dark:bg-gray-900">
      <div className="absolute inset-0 to-white dark:bg-gray-900"></div>
      <Grid />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative">
              <Card
                className={cn(
                  "h-full bg-gradient-to-b from-white to-slate-50/30 dark:from-zinc-900 dark:to-slate-900/10 rounded-2xl overflow-hidden group",
                  "border border-slate-100 dark:border-slate-800",
                  "transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30",
                  plan.isPopular &&
                    "ring-2 ring-violet-400 dark:ring-violet-500"
                )}
              >
                {plan.isPopular && (
                  <>
                    <div className="absolute top-0 left-2 right-2 h-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-b-full"></div>
                    <div className="absolute top-0 left-[8px] w-1 h-1 bg-violet-400 rounded-full"></div>
                    <div className="absolute top-0 right-[8px] w-1 h-1 bg-purple-400 rounded-full"></div>
                  </>
                )}

                <div className="flex flex-col h-full p-8">
                  <div className="mb-8 relative">
                    {plan.isPopular && (
                      <Badge className="absolute -top-3 right-0 bg-gradient-to-r from-violet-400 to-purple-400 text-white hover:from-violet-500 hover:to-purple-500">
                        {t("popularBadge")}
                      </Badge>
                    )}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {plan.title || t(`plans.${plan.id}.title`)}
                    </h3>
                    <div className="flex items-baseline mb-4">
                      {plan.originalPrice && (
                        <span className="text-gray-400 line-through text-lg mr-2">
                          {plan.originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        {t("currency")}
                      </span>
                    </div>

                    {/* 付费类型标签 */}
                    {plan.paymentType && (
                      <div className="mb-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-medium",
                            plan.paymentType === "one-time" && "border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:bg-blue-950",
                            plan.paymentType === "month" && "border-violet-200 text-violet-700 bg-violet-50 dark:border-violet-800 dark:text-violet-300 dark:bg-violet-950",
                            plan.paymentType === "year" && "border-rose-200 text-rose-700 bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:bg-rose-950"
                          )}
                        >
                          {t(`paymentTypes.${plan.paymentType}`)}
                        </Badge>
                      </div>
                    )}

                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                      {plan.description || t(`plans.${plan.id}.description`)}
                    </p>
                    {t.raw(`plans.${plan.id}.more`) && (
                      <p className="text-gray-600 dark:text-gray-300 mt-4 font-bold">
                        {t.raw(`plans.${plan.id}.more`) as string}
                      </p>
                    )}
                  </div>

                  <div className="flex-grow">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div
                            className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mr-3 shrink-0 shadow-sm`}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-200">
                            {feature.text || t(`features.${feature.id}`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {t.raw(`plans.${plan.id}.additionalText`) && (
                      <CheckoutButton
                        key={`additional-${plan.id}-${index}`}
                        className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 mb-4 bg-transparent hover:bg-transparent border-none shadow-none p-0 h-auto font-normal underline hover:no-underline"
                        productId={plan.id}
                        productName={t(`plans.${plan.id}.name`)}
                        amount={t.raw(`plans.${plan.id}.amount`) as number || 0}
                        credits={t.raw(`plans.${plan.id}.credits`) as number || 0}
                        orderDetail={t(`plans.${plan.id}.description`)}
                        validMonths={t.raw(`plans.${plan.id}.vaild_months`) as number || 0}
                        interval={t(`plans.${plan.id}.paymentType`)}
                        allowPromotionCodes={true}
                      >
                        {t.raw(`plans.${plan.id}.additionalText`) as string}
                      </CheckoutButton>
                    )}

                    <CheckoutButton
                      key={`checkout-${plan.id}-${index}`}
                      className={cn(
                        "w-full text-base font-medium",
                        plan.isPopular
                          ? `bg-gradient-to-r ${plan.color} text-white hover:opacity-90 shadow-md shadow-slate-200/50 dark:shadow-slate-900/30`
                          : "bg-white dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-slate-50 dark:hover:bg-zinc-700 border border-slate-100 dark:border-slate-800"
                      )}
                      productId={plan.id}
                      productName={t(`plans.${plan.id}.name`)}
                      amount={t.raw(`plans.${plan.id}.amount`) as number || 0}
                      credits={t.raw(`plans.${plan.id}.credits`) as number || 0}
                      orderDetail={t(`plans.${plan.id}.description`)}
                      validMonths={t.raw(`plans.${plan.id}.vaild_months`) as number || 0}
                      interval={t(`plans.${plan.id}.paymentType`)}
                      // 折扣码配置：根据计划类型设置不同的折扣策略
                      allowPromotionCodes={false} // 允许用户输入折扣码
                      discountCode={plan.id === "standard" || plan.id === "premium" || plan.id === "starter"} // premium 使用折扣码
                    >
                      
                      {t(`plans.${plan.id}.buttonText`)}
                    </CheckoutButton>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                      {plan.paymentType === "one-time" ? t("payOnce") : plan.paymentType === "month" ? t("payMonthly") : t("payYearly")}
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 dark:to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Grid = () => {
  const patternId = useId();
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
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
                className="stroke-slate-200/40 dark:stroke-slate-700/20"
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
