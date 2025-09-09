"use client";

import { useTranslations } from "next-intl";
import { ReactNode } from "react";

// 组件预览数据
export const componentPreviews = {
  hero: {},
  header: {},
  feature: {},
  stats: {},
  cta: {},
  footer: {},
  pricing: {},
  table: {},
  form: {},
  benefit: {},
  usage: {},
  showcase: {},
  testimonial: {},
  faq: {},
};

interface ComponentPreviewProps {
  componentId: string;
}

interface PreviewData {
  title: string;
  description: string;
  component?: ReactNode;
}

export function ComponentPreview({ componentId }: ComponentPreviewProps) {
  const t = useTranslations("componentLibrary");
  return {
    title: t(`${componentId}.title`),
    description: t(`${componentId}.description`),
    component: null,
  };
}

export function getComponentPreview(componentId: string): PreviewData {
  return {
    title: componentId,
    description: componentId,
    component: null,
  };
}
