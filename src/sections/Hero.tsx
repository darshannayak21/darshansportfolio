import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import OrangeCTAButton from "@/components/OrangeCTAButton";
import { ShaderAnimation } from "@/components/ui/shader-animation";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();
    const elements = [titleRef, subRef, descRef, ctaRef];

    elements.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 30 });
        tl.to(
          ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.2 + i * 0.15
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!scrollCueRef.current || !sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      onUpdate: (self) => {
        if (scrollCueRef.current) {
          scrollCueRef.current.style.opacity = String(
            Math.max(0, 1 - self.scroll() / 100)
          );
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
    >
      {/* Interactive Shader Background */}
      <div className="absolute inset-0 z-0">
        <ShaderAnimation />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 text-center flex flex-col items-center justify-center pointer-events-none">
        
        <h1
          ref={titleRef}
          className="font-display text-[clamp(4rem,10vw,8rem)] font-bold text-white leading-[1.1] tracking-[-0.04em] mb-4 pointer-events-auto"
        >
          Darshan Nayak
        </h1>

        <p
          ref={subRef}
          className="font-body text-[clamp(1.2rem,2.5vw,1.8rem)] text-white/80 font-light mb-6 pointer-events-auto"
        >
          Creative Problem Solver
        </p>

        <p
          ref={descRef}
          className="font-body text-base md:text-lg text-white/50 max-w-[500px] leading-relaxed mb-10 pointer-events-auto"
        >
          Building intelligent digital experiences at the intersection of
          artificial intelligence and human-centered design.
        </p>

        <div ref={ctaRef} className="pointer-events-auto">
          <OrangeCTAButton
            text="View My Work"
            href="#work"
            onClick={() => {
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <ChevronDown
          size={20}
          className="text-white/40 animate-bounce-subtle"
        />
      </div>
    </section>
  );
}
