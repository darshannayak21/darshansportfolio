"use client";

import { useRef } from "react";
import type { FC, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
  header?: ReactNode;
}

const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
  header,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 flex flex-col justify-end lg:justify-center h-screen bg-transparent pb-12 lg:pb-0 lg:py-[5rem]"
        }
      >
        {/* Optional header (e.g., mobile photo) */}
        {header && <div className="flex-shrink-0">{header}</div>}

        <p
          className={
            "flex flex-wrap text-[1.75rem] font-bold text-white/30 sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.35] mt-auto lg:mt-0"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { TextRevealByWord };
