"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { ReactNode, useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface AnimatedGridPatternProps {
  children?: ReactNode;
  className?: string;
  gridSize?: number;
  strokeWidth?: number;
  strokeColor?: string;
  darkStrokeColor?: string;
  animationDuration?: number;
  maxOpacity?: number;
  numSquares?: number;
}

export default function AnimatedGridPattern({
  children,
  className,
  gridSize = 50,
  strokeWidth = 1,
  strokeColor = "#e5e7eb",
  darkStrokeColor = "#020617",
  animationDuration = 4,
  maxOpacity = 0.5,
  numSquares = 50,
}: AnimatedGridPatternProps) {
  const { theme, resolvedTheme } = useTheme();

  // 使用状态来存储方块数据，初始为空数组
  const [squares, setSquares] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  // 只在客户端渲染时生成方块
  useEffect(() => {
    const generatedSquares = Array.from({ length: numSquares }, (_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 20) * gridSize,
      y: Math.floor(Math.random() * 20) * gridSize,
      delay: Math.random() * animationDuration,
    }));
    setSquares(generatedSquares);
  }, [numSquares, gridSize, animationDuration]);

  // 根据主题选择合适的颜色
  const currentStrokeColor = resolvedTheme === 'dark' ? darkStrokeColor : strokeColor;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* 背景网格 */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={currentStrokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* 动画方块 - 只在客户端渲染 */}
      {squares.map((square) => (
        <motion.div
          key={square.id}
          className="absolute"
          style={{
            left: square.x,
            top: square.y,
            width: gridSize,
            height: gridSize,
            opacity: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, maxOpacity, 0],
          }}
          transition={{
            duration: animationDuration,
            delay: square.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="h-full w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-slate-600 dark:to-slate-700"
            style={{
              borderRadius: 2,
            }}
          />
        </motion.div>
      ))}

      {/* 内容 */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
