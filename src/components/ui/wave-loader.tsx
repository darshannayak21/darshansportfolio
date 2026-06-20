"use client"

import { cva } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"
import { useTheme } from "@/components/ThemeProvider"

import { cn } from "@/lib/utils"

const waveLoaderVariants = cva("flex gap-2 items-center justify-center", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
})

export interface WaveLoaderProps {
  /**
   * The number of bouncing dots to display.
   * @default 5
   */
  bars?: number
  /**
   * Optional message to display alongside the bouncing dots.
   */
  message?: string
  /**
   * Position of the message relative to the spinner.
   * @default bottom
   */
  messagePlacement?: "bottom" | "left" | "right"
}

export function WaveLoader({
  bars = 5,
  message,
  messagePlacement,
  className,
  ...props
}: HTMLMotionProps<"div"> & WaveLoaderProps) {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div className={cn(waveLoaderVariants({ messagePlacement }))}>
      <div className={cn("flex gap-1 items-center justify-center")}>
        {Array(bars)
          .fill(undefined)
          .map((_, index) => (
            <motion.div
              key={index}
              className={cn(`w-2 h-5 ${dark ? 'bg-white' : 'bg-black'} origin-bottom`, className)}
              animate={{ scaleY: [1, 1.5, 1] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.1,
              }}
              {...props}
            />
          ))}
      </div>
      {message && <div className={`${dark ? 'text-white' : 'text-black'} font-mono font-bold tracking-widest`}>{message}</div>}
    </div>
  )
}
