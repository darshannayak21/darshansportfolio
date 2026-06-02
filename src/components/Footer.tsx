export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left - Name */}
        <span className="font-mono text-xs text-txt-tertiary">
          Darshan Nayak
        </span>

        {/* Right - Year */}
        <span className="font-mono text-xs text-txt-tertiary">2026</span>
      </div>
    </footer>
  );
}
