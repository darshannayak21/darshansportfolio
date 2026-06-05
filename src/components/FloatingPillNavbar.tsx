import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MenuItem, MenuContainer } from "./ui/fluid-menu";
import { Menu as MenuIcon, X, Briefcase, User, Code, Clock, Mail } from "lucide-react";
import ThemeSwitch from "./ui/theme-switch";
import { useTheme } from "./ThemeProvider";
import { ThemeToggleButton2 } from "./ui/theme-toggle-buttons";

interface FloatingPillNavbarProps {
  onNavigate: (target: string) => void;
}

const navLinks = [
  { label: "About", target: "#about" },
  { label: "Projects", target: "#work" },
  { label: "Skills", target: "#skills" },
  { label: "Achievements", target: "#achievements" },
];

export default function FloatingPillNavbar({
  onNavigate,
}: FloatingPillNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const dark = theme === 'dark';

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
      {/* Mobile Fluid Menu (Top Right) */}
      <div className="fixed top-6 right-6 z-[60] md:hidden">
        <MenuContainer>
          <MenuItem
            icon={
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180 ${dark ? 'text-white' : 'text-black'} group-hover:text-[#ff5500]`}>
                  <MenuIcon size={24} strokeWidth={1.5} />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0 text-[#ff5500]">
                  <X size={24} strokeWidth={1.5} />
                </div>
              </div>
            }
          />
          <MenuItem onClick={() => handleNav("#hero")} icon={<span className="font-logo font-bold text-lg tracking-[-0.08em]">DN</span>} />
          <MenuItem onClick={() => handleNav("#about")} icon={<User size={22} strokeWidth={1.5} />} />
          <MenuItem onClick={() => handleNav("#work")} icon={<Briefcase size={22} strokeWidth={1.5} />} />
          <MenuItem onClick={() => handleNav("#skills")} icon={<Code size={22} strokeWidth={1.5} />} />
          <MenuItem onClick={() => handleNav("#achievements")} icon={<Clock size={22} strokeWidth={1.5} />} />
          <MenuItem onClick={() => handleNav("#contact")} icon={<Mail size={22} strokeWidth={1.5} />} />
          <MenuItem onClick={() => setTheme(dark ? 'light' : 'dark')} icon={<ThemeToggleButton2 className="w-[22px] h-[22px]" />} />
        </MenuContainer>
      </div>

      {/* Desktop Bottom Navbar */}
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed bottom-10 md:bottom-16 left-0 right-0 z-50 flex justify-center items-center gap-2 md:gap-3 px-4 pointer-events-none hidden md:flex"
      >
        {/* PILL 1: Logo */}
        <div
          className={`pointer-events-auto flex items-center justify-center rounded-full transition-all duration-500
            ${scrolled
              ? `${dark ? 'bg-white/[0.08]' : 'bg-black/[0.06]'} backdrop-blur-md border ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'} px-3 md:px-4 py-1 md:py-1.5`
              : `${dark ? 'bg-white/[0.08]' : 'bg-black/[0.06]'} backdrop-blur-md border ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'} px-4 md:px-5 py-1.5 md:py-2`
            }
          `}
        >
          <button
            onClick={() => handleNav("#hero")}
            className={`font-logo text-[16px] md:text-[18px] font-bold tracking-[-0.08em] ${dark ? 'text-white' : 'text-gray-900'} hover:text-[#ff5500] transition-colors duration-300`}
          >
            DN
          </button>
        </div>

        {/* PILL 2: Nav Links */}
        <div
          className={`pointer-events-auto flex items-center justify-center rounded-full transition-all duration-500 border ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}
            ${scrolled
              ? `${dark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'} backdrop-blur-md px-4 md:px-6 py-2 md:py-2.5`
              : `${dark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'} backdrop-blur-md px-4 md:px-6 py-2.5 md:py-3`
            }
          `}
        >
          <div className="flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.target)}
                className={`relative font-body text-[11px] md:text-[12px] font-medium ${dark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-gray-900'} transition-colors duration-300 group tracking-wide`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 w-full h-[1.5px] bg-[#ff5500] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="pointer-events-auto">
          <div
            className={`flex items-center justify-center rounded-full transition-all duration-500 border ${dark ? 'border-white/[0.06]' : 'border-black/[0.06]'}
              ${scrolled
                ? `${dark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'} backdrop-blur-md px-2 py-1`
                : `${dark ? 'bg-white/[0.06]' : 'bg-black/[0.06]'} backdrop-blur-md px-2 py-1.5`
              }
            `}
          >
            <ThemeSwitch />
          </div>
        </div>

        {/* PILL 3: CTA */}
        <div className="pointer-events-auto">
          <button
            onClick={() => handleNav("#contact")}
            className={`flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md ${dark ? 'bg-white/[0.06] text-white' : 'bg-black/[0.06] text-black'} hover:bg-[#ff5500] hover:text-white hover:border-[#ff5500] dark:hover:bg-[#ff5500] hover:animate-vibrate origin-center transition-all duration-300
              ${scrolled
                ? "px-4 md:px-6 py-2.5 md:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(255,248,235,0.15)]"
                : "px-4 md:px-6 py-3 md:py-[14px]"
              }
            `}
          >
            <span className="font-lacquer text-[14px] leading-none tracking-widest pt-[2px]">
              CONNECT
            </span>
          </button>
        </div>
      </motion.nav>
    </>
  );
}
