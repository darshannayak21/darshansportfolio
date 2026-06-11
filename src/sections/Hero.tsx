import { useEffect, useRef, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { TextEffect } from "@/components/ui/text-effect";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { useTheme } from "@/components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

// Lazy-load the heavy WebGL shader so it doesn't block initial page render
// on slow mobile data connections (this is ~395KB of shader code)
const LazyMeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.MeshGradient,
  }))
);

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const dark = theme === 'dark';

  // Detect if the connection can handle heavy WebGL shaders
  // Skip MeshGradient on slow connections (2G/3G) to prevent Safari timeout
  const [canLoadShader, setCanLoadShader] = useState(false);
  useEffect(() => {
    // Use Network Information API if available
    const conn = (navigator as any).connection;
    if (conn) {
      const dominated = conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g';
      setCanLoadShader(!dominated);
    } else {
      // If the API is not available (Safari), load after a short delay
      // This ensures the page renders first, then the shader loads
      const timer = setTimeout(() => setCanLoadShader(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

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
      className={`relative min-h-[100dvh] flex flex-col items-center justify-center ${dark ? 'bg-[#050505]' : 'bg-[#f8f8f8]'} overflow-hidden`}
    >
      {/* Interactive Mesh Gradient Background — lazy loaded and skipped on slow connections */}
      <div className="absolute inset-0 z-0">
        {canLoadShader && (
          <Suspense fallback={
            <div className={`absolute inset-0 ${dark ? 'bg-[#050505]' : 'bg-[#f8f8f8]'}`} />
          }>
            <LazyMeshGradient
              className="absolute inset-0 w-full h-full"
              colors={dark ? ["#000000", "#000000", "#000000", "#ff5500", "#000000"] : ["#ffffff", "#ffffff", "#ff5500", "#ffffff", "#111111"]}
              speed={0.3}
              {...({ backgroundColor: dark ? "#000000" : "#ffffff" } as any)}
            />
          </Suspense>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 text-center flex flex-col items-center justify-center pointer-events-none">

        <TextEffect
          as="h1"
          per="char"
          preset="blur"
          trigger={isLoaded}
          className={`font-display text-[clamp(4rem,10vw,8rem)] font-bold ${dark ? 'text-white' : 'text-gray-900'} leading-[1.1] tracking-[-0.04em] mb-4 pointer-events-auto`}
        >
          Darshan Nayak
        </TextEffect>

        <TextEffect
          as="p"
          per="word"
          preset="blur"
          trigger={isLoaded}
          delay={1.2}
          className={`font-body text-[clamp(1.2rem,2.5vw,1.8rem)] ${dark ? 'text-white/80' : 'text-black font-medium'} mb-6 pointer-events-auto`}
        >
          Aspiring AI Engineer and Creative Problem Solver
        </TextEffect>

        <TextEffect
          as="p"
          per="word"
          preset="fade"
          trigger={isLoaded}
          delay={1.8}
          className={`font-body text-base md:text-lg ${dark ? 'text-white/50' : 'text-black font-medium'} max-w-[500px] leading-relaxed mb-10 pointer-events-auto`}
        >
          From embedded electronics to intelligent agents — engineering AI systems that think, adapt, and make a real difference.
        </TextEffect>

        <div ref={ctaRef} className="pointer-events-auto mt-6">
          <LiquidButton
            size="xl"
            className={`font-body tracking-wide ${dark ? 'text-white/90 group-hover:text-[#ffffff]' : 'text-[#000000] font-medium group-hover:text-[#000000]'}`}
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
          className={`${dark ? 'text-white/40' : 'text-gray-400'} animate-bounce-subtle`}
        />
      </div>
    </section>
  );
}
