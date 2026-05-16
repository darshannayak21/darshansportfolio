import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  // Instant scroll on mount if hash is present
  useLayoutEffect(() => {
    if (location.hash && !isLoading) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "center" });
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
  // Navigation handler — uses native smooth scroll
  const handleNavigate = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-orange"
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
  );
}
