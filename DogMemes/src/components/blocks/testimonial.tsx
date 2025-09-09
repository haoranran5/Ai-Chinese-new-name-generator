import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BoxReveal } from "@/components/magicui/box-reveal";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface TestimonialProps {
  id: string;
  name?: string;
  title?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  content?: string;
  image?: string;
  className?: string;
}

interface TestimonialGridProps {
  testimonials: TestimonialProps[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Testimonial({
  id,
  name,
  title,
  avatarSrc,
  avatarFallback,
  content,
  image,
  className,
}: TestimonialProps) {
  const t = useTranslations("testimonial");

  return (
    <Card
      className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <CardContent className="p-8">
        <div className="mb-6 flex items-start space-x-4">
          <Image
            src={avatarSrc || "/imgs/head/1.jpg"}
            alt={name || t(`items.${id}.name`)}
            width={48}
            height={48}
            className="rounded-full ring-2 ring-primary/10"
          />

          <div className="space-y-1">
            <div className="font-semibold text-lg">
              {name || t(`items.${id}.name`)}
            </div>
            {(title || t(`items.${id}.title`, { fallback: "" }) !== "") && (
              <div className="text-sm text-muted-foreground/80">
                {title || t(`items.${id}.title`)}
              </div>
            )}
          </div>
        </div>
        <p className="text-foreground/90 leading-relaxed mb-6">
          {content || t(`items.${id}.content`)}
        </p>
        {image && (
          <div className="mt-6 rounded-xl overflow-hidden shadow-sm">
            <img
              src={image}
              alt={t("screenshot", { name: name || t(`items.${id}.name`) })}
              className="w-full h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TestimonialGrid({
  testimonials,
  title,
  subtitle,
  className,
}: TestimonialGridProps) {
  const t = useTranslations("testimonial");

  return (
    <section className={cn("py-20", className)}>
      <div className="container px-4 mx-auto">
        {(title || t("title", { fallback: "" }) !== "") && (
          <div className="mb-8 text-center">
            <AnimatedGradientText className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title || t("title")}
            </AnimatedGradientText>
            {(subtitle || t("subtitle", { fallback: "" }) !== "") && (
              <p className="mt-4 mx-auto max-w-3xl text-lg text-muted-foreground/90 leading-relaxed">
                {subtitle || t("subtitle")}
              </p>
            )}
          </div>
        )}
        <BoxReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </BoxReveal>
      </div>
    </section>
  );
}
