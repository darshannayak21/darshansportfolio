import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SectionLabel from "@/components/SectionLabel";
import FolderInteraction from "@/components/ui/folder-interaction";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

const entries: TimelineEntry[] = [
  {
    period: "January 2024",
    title: "1st Place — Global AI Hackathon",
    description: "Developed 'Neural Canvas', an AI architecture tool, winning 1st place out of 500+ international teams. Awarded $20,000 and featured in TechCrunch.",
  },
  {
    period: "November 2023",
    title: "Published Research at NeurIPS",
    description: "First author on 'Efficient Transformer Architectures for Real-Time Mobile Inference'. Presented findings to an audience of 2,000+ researchers.",
  },
  {
    period: "August 2023",
    title: "Open Source Contributor of the Year",
    description: "Recognized by the TensorFlow community for critical optimization patches improving mobile deployment speeds by 40%.",
  },
  {
    period: "May 2023",
    title: "Best Startup Pitch — Tech Disrupt",
    description: "Secured seed funding and the 'Most Innovative MVP' award for building a decentralized emergency response network.",
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
      // Timeline line draws as user scrolls smoothly
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 65%",
              end: "bottom 65%",
              scrub: 1.5, // Super smooth falling motion
            },
          }
        );
      }

      // Each entry animates in with premium sleekness
      entryRefs.current.forEach((entry) => {
        if (!entry) return;

        const node = entry.querySelector(".timeline-node");
        const innerNode = entry.querySelector(".timeline-node-inner");
        const text = entry.querySelector(".timeline-text");

        if (node && innerNode) {
          gsap.to(node, {
            borderColor: "rgba(255, 85, 0, 0.8)",
            backgroundColor: "rgba(255, 85, 0, 0.1)",
            duration: 0.4,
            scrollTrigger: {
              trigger: entry,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.to(innerNode, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: entry,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 65%",
                toggleActions: "play none none reverse",
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
      id="achievements"
      ref={sectionRef}
      className="bg-[#050505] relative"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-[clamp(80px,12vh,160px)] relative z-10">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <div className="flex justify-center mb-6">
            <SectionLabel text="ACHIEVEMENTS" className="block" />
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-20 tracking-tight">
            Key Milestones
          </h2>

          <div className="relative pl-12 md:pl-20 max-w-3xl mx-auto text-left timeline-container pb-8 mb-20">
            {/* Subtle Background Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08]" />
            
            {/* Animated Glowing Fill Line */}
            <div
              ref={lineRef}
              className="absolute left-[-1px] top-0 w-[3px] bg-gradient-to-b from-transparent via-[#ff5500] to-[#ff5500] origin-top shadow-[0_0_15px_rgba(255,85,0,0.6)]"
            />

            {/* Entries */}
            <div className="space-y-24">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  ref={(el) => { entryRefs.current[i] = el; }}
                  className="relative group"
                >
                  {/* Outer Sleek Node */}
                  <div
                    className="timeline-node absolute -left-12 md:-left-20 top-2 w-4 h-4 rounded-full bg-[#0a0a0a] border border-white/20 transition-colors duration-500 z-10"
                    style={{ transform: "translateX(calc(-50% + 1px))" }}
                  />
                  
                  {/* Inner Glowing Node (Lights up on scroll) */}
                  <div
                    className="timeline-node-inner absolute -left-12 md:-left-20 top-2 w-4 h-4 rounded-full bg-[#ff5500] opacity-0 shadow-[0_0_15px_#ff5500] z-20"
                    style={{ transform: "translateX(calc(-50% + 1px)) scale(0.3)" }}
                  />

                  {/* Text Content */}
                  <div className="timeline-text">
                    <span className="font-mono text-sm tracking-wider text-[#ff5500] block mb-3">
                      {entry.period}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                      {entry.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-white/60 max-w-[600px] leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Certificate Box */}
          <div className="w-full max-w-5xl mx-auto mt-16 md:mt-20 pb-12 overflow-visible px-4 md:px-0">
            <motion.div 
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[2.5rem] md:rounded-[3rem] w-full bg-[#ff5500] shadow-2xl py-6 md:py-16 px-4 md:px-12 text-[#111] flex flex-col md:flex-row items-center justify-center gap-0 md:gap-16"
            >
              {/* CERTIFICATES text */}
              <motion.h1 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[10vw] sm:text-[8vw] md:text-[6vw] font-bold tracking-tighter leading-none text-white text-center relative z-20"
              >
                CERTIFICATES
              </motion.h1>
              
              {/* Folder Interaction */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 mt-2 sm:mt-4 md:mt-0 relative z-10"
              >
                <div className="scale-75 sm:scale-90 md:scale-100 origin-center flex items-center justify-center">
                  <FolderInteraction />
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}