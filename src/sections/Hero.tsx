import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";
import { TextEffect } from "@/components/ui/text-effect";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();
    const elements = [ctaRef];

    elements.forEach((ref) => {
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
          2.5 // Delay CTA button slightly so it appears after the text effects
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
      {/* Interactive Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#000000", "#000000", "#ff5500", "#000000"]}
          speed={0.3}
          {...({ backgroundColor: "#000000" } as any)}
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-60"
          colors={["#000000", "#000000", "#ff5500", "#000000"]}
          speed={0.2}
          {...({ wireframe: true, backgroundColor: "transparent" } as any)}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 text-center flex flex-col items-center justify-center pointer-events-none">
        
        <TextEffect
          as="h1"
          per="char"
          preset="blur"
          trigger={isLoaded}
          className="font-display text-[clamp(4rem,10vw,8rem)] font-bold text-white leading-[1.1] tracking-[-0.04em] mb-4 pointer-events-auto"
        >
          Darshan Nayak
        </TextEffect>

        <TextEffect
          as="p"
          per="word"
          preset="blur"
          trigger={isLoaded}
          delay={1.2}
          className="font-body text-[clamp(1.2rem,2.5vw,1.8rem)] text-white/80 font-light mb-6 pointer-events-auto"
        >
          Creative Problem Solver
        </TextEffect>

        <TextEffect
          as="p"
          per="word"
          preset="fade"
          trigger={isLoaded}
          delay={1.8}
          className="font-body text-base md:text-lg text-white/50 max-w-[500px] leading-relaxed mb-10 pointer-events-auto"
        >
          Building intelligent digital experiences at the intersection of artificial intelligence and human-centered design.
        </TextEffect>

        <div ref={ctaRef} className="pointer-events-auto mt-6">
          <button
            onClick={() => {
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group relative flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 px-8 py-3.5 md:px-10 md:py-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.05] hover:bg-white/10 hover:border-white/20 active:scale-[0.95]"
          >
            <span className="relative font-body text-[13px] md:text-[14px] font-medium tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
              View My Work
            </span>
          </button>
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
