"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [ref, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-[#f8f8f8] font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-semibold text-[#000000] tracking-tight">
            Key Milestones
          </h2>
          <p className="text-[#000000]/50 font-body text-sm md:text-base">
            A timeline of my journey and major achievements.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#e8e8e8] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#ff5500] shadow-[0_0_10px_#ff5500] border border-black/10 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-[#000000]/60">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-[#000000]/60">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-black/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#ff5500] via-[#ff5500] to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_15px_rgba(255,85,0,0.8)]"
          />
        </div>
      </div>
    </div>
  );
};
