"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

interface WordRotateProps {
  words: string[]
  duration?: number
  className?: string
}

export default function WordRotate({
  words,
  duration = 2500,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <div className={cn("overflow-hidden py-2", className)}>
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
          }}
          className={cn(
            "relative block text-left font-semibold text-black dark:text-white",
          )}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  )
} 