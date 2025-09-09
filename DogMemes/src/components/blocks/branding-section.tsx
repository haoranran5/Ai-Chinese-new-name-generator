"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function BrandingSection() {
  const t = useTranslations("branding");

  const technologies = [
    { name: "Next.js", logo: "/imgs/logos/next.svg" },
    { name: "React", logo: "/imgs/logos/react.svg" },
    { name: "TailwindCSS", logo: "/imgs/logos/tailwind.svg" },
    { name: "Shadcn/UI", logo: "/imgs/logos/shadcn.svg" },
    { name: "Vercel", logo: "/imgs/logos/vercel.svg" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t("title")}
        </h2>

        <div className="flex flex-wrap justify-center gap-8 items-center">
          {technologies.map((tech) => (
            <div key={tech.name} className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center mb-2">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={128}
                  height={128}
                  className="dark:filter dark:invert"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t("description")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.modern")}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.fast")}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.seo")}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              {t("badges.responsive")}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
