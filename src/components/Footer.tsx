const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-black">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left - Name */}
        <span className="font-mono text-xs text-txt-tertiary">
          Darshan Nayak
        </span>

        {/* Center - Socials */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative font-body text-sm text-txt-secondary hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-orange scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </a>
          ))}
        </div>

        {/* Right - Year */}
        <span className="font-mono text-xs text-txt-tertiary">2026</span>
      </div>
    </footer>
  );
}
