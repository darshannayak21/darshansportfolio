import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FloatingPillNavbar from "@/components/FloatingPillNavbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Work from "@/sections/Work";
import Skills from "@/sections/Skills";
import Timeline from "@/sections/Timeline";
import Contact from "@/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Bridge Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Navigation handler
  const handleNavigate = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (el) {
      lenisRef.current?.scrollTo(el as HTMLElement, { offset: 0 });
    }
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <FloatingPillNavbar onNavigate={handleNavigate} />

      <main>
        <Hero isLoaded={true} />
        <About />
        <Work />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
