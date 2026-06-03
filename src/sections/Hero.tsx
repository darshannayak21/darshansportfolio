import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";
import { TextEffect } from "@/components/ui/text-effect";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

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
          Aspiring AI Engineer and Creative Problem Solver  
        </TextEffect>

        <TextEffect
          as="p"
          per="word"
          preset="fade"
          trigger={isLoaded}
          delay={1.8}
          className="font-body text-base md:text-lg text-white/50 max-w-[500px] leading-relaxed mb-10 pointer-events-auto"
        >
          From embedded electronics to intelligent agents — engineering AI systems that think, adapt, and make a real difference.
        </TextEffect>

        <div ref={ctaRef} className="pointer-events-auto mt-6">
          <LiquidButton
            size="xl"
            className="text-white/90 group-hover:text-white font-body tracking-wide"
            onClick={() => {
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            View My Work
          </LiquidButton>
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
