import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

const entries: TimelineEntry[] = [
  {
    period: "2025 — Present",
    title: "AI Engineer & Creative Developer",
    description:
      "Building intelligent applications and exploring the frontiers of machine learning, creative coding, and human-AI interaction.",
  },
  {
    period: "2023 — 2025",
    title: "Machine Learning Specialist",
    description:
      "Developed and deployed NLP models, built recommendation systems, and automated data pipelines for production environments.",
  },
  {
    period: "2021 — 2023",
    title: "Software Developer",
    description:
      "Full-stack development with a growing focus on AI integration. Built web applications and began specializing in intelligent systems.",
  },
  {
    period: "2019 — 2021",
    title: "Computer Science Student",
    description:
      "Foundational years in algorithms, data structures, and software engineering. Discovered a passion for artificial intelligence.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Timeline line draws as user scrolls
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
        lineRef.current.style.transformOrigin = "top";
      }

      // Each entry animates in
      entryRefs.current.forEach((entry) => {
        if (!entry) return;

        const node = entry.querySelector(".timeline-node");
        const text = entry.querySelector(".timeline-text");

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: entry,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="bg-black"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-[clamp(80px,12vh,160px)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel text="EXPERIENCE" className="mb-6 block" />
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-16">
            Journey So Far
          </h2>

          <div className="relative pl-10 md:pl-16">
            {/* Timeline line */}
            <div
              ref={lineRef}
              className="absolute left-0 top-0 bottom-0 w-0.5"
              style={{
                background:
                  "linear-gradient(to bottom, #ff5500, rgba(255,85,0,0.1))",
              }}
            />

            {/* Entries */}
            <div className="space-y-16">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  ref={(el) => { entryRefs.current[i] = el; }}
                  className="relative"
                >
                  {/* Node */}
                  <div
                    className="timeline-node absolute -left-10 md:-left-16 top-1 w-3 h-3 rounded-full bg-orange border-2 border-black"
                    style={{ transform: "translateX(calc(-50% + 1px))" }}
                  />

                  {/* Text */}
                  <div className="timeline-text">
                    <span className="font-mono text-sm text-orange block mb-2">
                      {entry.period}
                    </span>
                    <h3 className="font-body text-2xl font-semibold text-white mb-3">
                      {entry.title}
                    </h3>
                    <p className="font-body text-base text-txt-tertiary max-w-[560px] leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
