import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

interface FloatingPillNavbarProps {
  onNavigate: (target: string) => void;
}

const navLinks = [
  { label: "Work", target: "#work" },
  { label: "About", target: "#about" },
  { label: "Skills", target: "#skills" },
  { label: "Timeline", target: "#timeline" },
];

export default function FloatingPillNavbar({
  onNavigate,
}: FloatingPillNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = useCallback(
    (target: string) => {
      onNavigate(target);
      setMobileOpen(false);
    },
    [onNavigate]
  );

  const containerVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any },
    },
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed bottom-8 md:bottom-12 left-0 right-0 z-50 flex justify-center items-center gap-2 md:gap-3 px-4 pointer-events-none"
      >
        {/* PILL 1: Logo */}
        <div
          className={`pointer-events-auto flex items-center justify-center rounded-full transition-all duration-500
            ${scrolled
              ? "bg-[#1c1c1c] shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 md:px-5 py-2 md:py-2.5"
              : "bg-[#1c1c1c]/90 backdrop-blur-md px-4 md:px-5 py-2.5 md:py-3"
            }
          `}
        >
          <button
            onClick={() => handleNav("#hero")}
            className="font-logo text-base md:text-[20px] font-bold tracking-[-0.08em] text-white hover:text-[#ff5500] transition-colors duration-300"
          >
            DN
          </button>
        </div>

        {/* PILL 2: Nav Links */}
        <div
          className={`pointer-events-auto flex items-center justify-center rounded-full transition-all duration-500
            ${scrolled
              ? "bg-[#1c1c1c] shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-4 md:px-6 py-2.5 md:py-3"
              : "bg-[#1c1c1c]/90 backdrop-blur-md px-4 md:px-6 py-3 md:py-3.5"
            }
          `}
        >
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.target)}
                className="relative font-body text-[11px] md:text-[12px] font-medium text-white hover:text-white transition-colors duration-300 group tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-full h-[1.5px] bg-[#ff5500] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>
            ))}
          </div>

          {/* Mobile Hamburger (visible only on mobile) */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[4px] p-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[16px] h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[5.5px]" : ""
                }`}
            />
            <span
              className={`block w-[16px] h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""
                }`}
            />
            <span
              className={`block w-[16px] h-[1.5px] bg-white transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[5.5px]" : ""
                }`}
            />
          </button>
        </div>

        {/* PILL 3: CTA */}
        <div className="pointer-events-auto">
          <button
            onClick={() => handleNav("#contact")}
            className={`flex items-center justify-center rounded-full bg-[#fff8eb] text-black hover:bg-white hover:animate-vibrate origin-center transition-colors duration-300
              ${scrolled
                ? "px-4 md:px-5 py-2 md:py-2.5 shadow-[0_8px_32px_rgba(255,248,235,0.15)]"
                : "px-4 md:px-5 py-2.5 md:py-3"
              }
            `}
          >
            <span className="font-marker text-[11px] md:text-[13px] leading-none tracking-widest pt-[2px]">
              CONNECT
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{
              background: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.35,
                  ease: "easeOut",
                }}
                onClick={() => handleNav(link.target)}
                className="font-display text-3xl font-bold text-white hover:text-[#ff5500] transition-colors duration-200"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: 0.32, duration: 0.35, ease: "easeOut" }}
              onClick={() => handleNav("#contact")}
              className="mt-4 font-marker text-xl tracking-widest bg-[#fff8eb] text-black rounded-full px-10 py-3 font-semibold hover:bg-white transition-colors duration-200 pt-4"
            >
              CONNECT
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
