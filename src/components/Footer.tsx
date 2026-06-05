import { useTheme } from "@/components/ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <footer className={`w-full border-t ${dark ? 'border-white/[0.08] bg-black' : 'border-black/10 bg-[#f8f8f8]'}`}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left - Name */}
        <span className={`font-mono text-xs ${dark ? 'text-txt-tertiary' : 'text-[#000000]/60'}`}>
          Darshan Nayak
        </span>

        {/* Right - Year */}
        <span className={`font-mono text-xs ${dark ? 'text-txt-tertiary' : 'text-[#000000]/60'}`}>2026</span>
      </div>
    </footer>
  );
}
