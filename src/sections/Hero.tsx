import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import OrangeCTAButton from "@/components/OrangeCTAButton";
import HeroIcosahedron from "@/components/HeroIcosahedron";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();
    const elements = [labelRef, line1Ref, line2Ref, subRef, descRef, ctaRef];

    elements.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: i < 2 ? 40 : 20 });
        tl.to(
          ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          0.1 + i * 0.1
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
      className="relative min-h-[100dvh] flex items-center bg-black overflow-hidden"
    >
      {/* 3D Element */}
      <HeroIcosahedron />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="lg:w-[55%]">
            <div ref={labelRef} className="mb-4">
              <SectionLabel text="AI Engineer" />
            </div>

            <h1
              ref={line1Ref}
              className="font-display text-[clamp(4rem,12vw,10rem)] font-black text-white leading-[0.9] tracking-[-0.03em] uppercase"
            >
              DARSHAN
            </h1>

            <h1
              ref={line2Ref}
              className="font-display text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] tracking-[-0.03em] uppercase"
            >
              NAYA
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #ff5500" }}>
                K
              </span>
            </h1>

            <p
              ref={subRef}
              className="font-body text-[clamp(1.25rem,3vw,2rem)] text-txt-tertiary font-normal mt-6"
            >
              Creative Problem Solver
            </p>

            <p
              ref={descRef}
              className="font-body text-base text-txt-secondary max-w-[480px] mt-4 leading-relaxed"
            >
              Building intelligent digital experiences at the intersection of
              artificial intelligence and human-centered design.
            </p>

            <div ref={ctaRef} className="mt-10">
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
        </div>
      </div>

      {/* Scroll Cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown
          size={20}
          className="text-txt-secondary animate-bounce-subtle"
        />
      </div>
    </section>
  );
}
