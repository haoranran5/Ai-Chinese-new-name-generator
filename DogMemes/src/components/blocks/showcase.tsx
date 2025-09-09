// ... 其他 import ...
import React from "react";
import { useTranslations } from "next-intl";

export function Showcase() {
  const t = useTranslations("showcase");

  const showcases = [
    {
      id: "raphael",
      img: "/imgs/example.png",
    },
    {
      id: "sitesnapper",
      img: "/imgs/example.png",
    },
    {
      id: "seo",
      img: "/imgs/example.png",
    },
    {
      id: "trends",
      img: "/imgs/example.png",
    },
    {
      id: "deepseek",
      img: "/imgs/example.png",
    },
    {
      id: "rednote",
      img: "/imgs/example.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">{t("title")}</h2>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ">
        {showcases.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
          >
            <img
              src={item.img}
              alt={t(`items.${item.id}.title`)}
              className="w-full object-cover rounded mb-4 border"
            />
            <h3 className="text-xl font-semibold mb-2">
              {t(`items.${item.id}.title`)}
            </h3>
            <p className="text-gray-500 text-center">
              {t(`items.${item.id}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
