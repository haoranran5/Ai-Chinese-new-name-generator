import React from "react";
import { useTranslations } from "next-intl";

interface StatItemProps {
  id: string;
  title?: string;
  value?: string;
  description?: string;
}

const StatItem: React.FC<StatItemProps> = ({
  id,
  title,
  value,
  description,
}) => {
  const t = useTranslations("stats");

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-gray-600 font-medium mb-2">
        {title || t(`items.${id}.title`)}
      </h3>
      <p className="text-7xl font-bold mb-2">
        {value || t(`items.${id}.value`)}
      </p>
      <p className="text-gray-500">
        {description || t(`items.${id}.description`)}
      </p>
    </div>
  );
};

export function Stats() {
  const t = useTranslations("stats");

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">{t("title")}</h2>
          <p className="text-gray-500">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatItem id="customers" />
          <StatItem id="components" />
          <StatItem id="time" />
        </div>
      </div>
    </section>
  );
}
