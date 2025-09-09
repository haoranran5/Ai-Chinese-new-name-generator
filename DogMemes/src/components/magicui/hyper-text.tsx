"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useCallback, useEffect, useState } from "react"

interface HyperTextProps {
  text: string
  duration?: number
  className?: string
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export default function HyperText({
  text,
  duration = 800,
  className,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [trigger, setTrigger] = useState(false)

  const scramble = useCallback(async () => {
    if (!text) return

    const iterations = Math.floor(duration / 50)
    
    for (let i = 0; i < iterations; i++) {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
            if (index < i) {
              return text[index]
            }
            return alphabet[Math.floor(Math.random() * 26)]
          })
          .join("")
      )
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    
    setDisplayText(text)
  }, [text, duration])

  useEffect(() => {
    if (trigger) {
      scramble()
      setTrigger(false)
    }
  }, [trigger, scramble])

  return (
    <motion.div
      className={cn(
        "cursor-pointer overflow-hidden font-mono",
        className,
      )}
      onMouseEnter={() => setTrigger(true)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {displayText}
    </motion.div>
  )
} 