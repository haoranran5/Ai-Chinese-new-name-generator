"use client";

import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const techLogos = [
  {
    name: "Next.js",
    logo: "/imgs/logos/next.svg",
  },
  {
    name: "React",
    logo: "/imgs/logos/react.svg",
  },
  {
    name: "Tailwind",
    logo: "/imgs/logos/tailwind.svg",
  },
  {
    name: "Vercel",
    logo: "/imgs/logos/vercel.svg",
  },
  {
    name: "Shadcn",
    logo: "/imgs/logos/shadcn.svg",
  },
  {
    name: "Magic UI",
    logo: "/imgs/logos/magic-ui.svg",
  },
];

const TechCard = ({ tech }: { tech: (typeof techLogos)[0] }) => {
  return (
    <div className="flex items-center px-8 py-4">
      <div className="w-12 h-12">
        <Image
          src={tech.logo}
          alt={`${tech.name} logo`}
          width={48}
          height={48}
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
};

export function TechMarquee() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,200,255,0.05),transparent)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(200,200,255,0.025),transparent)]"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            使用现代
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {" "}
              技术栈{" "}
            </span>
            构建
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            深度集成流行的开发工具与服务，打造现代化应用
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-20"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-20"></div>

          <div className="mb-8">
            <Marquee className="[--duration:35s]">
              {techLogos.map((tech, index) => (
                <TechCard key={`first-${index}`} tech={tech} />
              ))}
            </Marquee>
          </div>

          <div>
            <Marquee reverse className="[--duration:40s]">
              {techLogos.map((tech, index) => (
                <TechCard key={`second-${index}`} tech={tech} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
