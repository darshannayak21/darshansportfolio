import { useCallback, useEffect, useLayoutEffect, useState } from "react";
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
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
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
  // Navigation handler — uses a dynamic custom scroll to account for GSAP height changes mid-scroll
  const handleNavigate = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (!el) return;
    
    const duration = 1200; // 1.2 seconds for a premium smooth feel
    const startY = window.scrollY;
    let startTime: number | null = null;
    let isUserScrolling = false;
    
    // Allow user to break the animation if they start scrolling manually
    const cancelLock = () => { isUserScrolling = true; };
    window.addEventListener("wheel", cancelLock, { once: true });
    window.addEventListener("touchstart", cancelLock, { once: true });
    
    const easeInOutQuart = (t: number) => {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    };
    
    const animateScroll = (currentTime: number) => {
      if (isUserScrolling) return; // Abort if user takes over
      
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      let progress = Math.min(timeElapsed / duration, 1);
      progress = easeInOutQuart(progress);
      
      // Dynamically recalculate the target's position every frame.
      const targetY = el.getBoundingClientRect().top + window.scrollY;
      
      if (progress < 1) {
        const currentScroll = startY + (targetY - startY) * progress;
        window.scrollTo(0, currentScroll);
        requestAnimationFrame(animateScroll);
      } else {
        // Lock Phase: GSAP scrub animations have a 1.5s delay. 
        // We must lock the camera to the target for an extra 2 seconds so it doesn't slide away
        // as the page shrinks beneath it.
        window.scrollTo(0, targetY);
        
        if (timeElapsed < duration + 2000) {
          requestAnimationFrame(animateScroll);
        } else {
          window.removeEventListener("wheel", cancelLock);
          window.removeEventListener("touchstart", cancelLock);
        }
      }
    };
    
    requestAnimationFrame(animateScroll);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="bg-black min-h-screen">
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
