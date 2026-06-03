import { useCallback, useEffect, useLayoutEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from 'lenis/react';

import FloatingPillNavbar from "@/components/FloatingPillNavbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import { WaveLoader } from "@/components/ui/wave-loader";
import About from "@/sections/About";
import Work from "@/sections/Work";
import Skills from "@/sections/Skills";
import Timeline from "@/sections/Timeline";
import Contact from "@/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

let hasShownLoader = false;

export default function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(!hasShownLoader);
  const lenisRef = useRef<any>(null);

  // Minimum loading screen time
  useEffect(() => {
    if (hasShownLoader) return;

    const finishLoading = () => {
      setIsLoading(false);
      hasShownLoader = true;
    };

    const timer = setTimeout(() => {
      if (document.readyState === 'complete') {
        finishLoading();
      } else {
        window.addEventListener("load", finishLoading);
        return () => window.removeEventListener("load", finishLoading);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Force scroll to top on refresh/load
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If it's a fresh load (loader is showing), clear hash and scroll to top
    if (!hasShownLoader) {
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    } else if (location.hash && !isLoading) {
      // If navigating internally with a hash after loaded
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.scrollTo(location.hash, { offset: 0 });
      } else {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }, [location.hash, isLoading]);

  // Recalculate all ScrollTrigger positions once everything is loaded
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);
    // Also refresh after a delay for lazy-loaded content
    const timer = setTimeout(() => ScrollTrigger.refresh(), 2000);
    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  // Sync GSAP with Lenis for smooth ScrollTrigger animations
  useEffect(() => {
    if (!lenisRef.current?.lenis) return;
    
    const lenis = lenisRef.current.lenis;
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.lagSmoothing(0);
    
    return () => {
      lenis.off('scroll', ScrollTrigger.update);
    };
  }, [isLoading]);

  // Navigation handler using robust Lenis scrollTo instead of buggy manual requestAnimationFrame loop
  const handleNavigate = useCallback((target: string) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(target, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="bg-black min-h-screen overflow-x-clip w-full relative">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
            >
              <div className="scale-125 md:scale-150">
                <WaveLoader bars={5} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <FloatingPillNavbar onNavigate={handleNavigate} />

        <main>
          <Hero isLoaded={!isLoading} />
          <About />
          <Work />
          <Skills />
          <Timeline />
          <Contact />
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}
