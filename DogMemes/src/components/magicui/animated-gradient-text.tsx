"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded bg-white/50 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#8fdfff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] dark:bg-slate-900/60 dark:shadow-[inset_0_-8px_10px_#1e293b3f] dark:hover:shadow-[inset_0_-5px_10px_#1e293b5f]",
        className
      )}
    >
      <div
        className={`absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#ffaa40]/60 via-[#9c40ff]/60 to-[#ffaa40]/60 dark:from-[#fbbf24]/70 dark:via-[#a855f7]/70 dark:to-[#fbbf24]/70 bg-[length:var(--bg-size)_100%] p-[1px] ![mask-composite:subtract] [border-radius:inherit] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]`}
      />

      <div
        className={cn(
          `animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] dark:from-[#fbbf24] dark:via-[#a855f7] dark:to-[#fbbf24] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export { AnimatedGradientText };
