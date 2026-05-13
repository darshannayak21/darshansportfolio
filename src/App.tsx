import { useCallback, useEffect } from "react";
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
