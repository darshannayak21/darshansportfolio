import { ArrowUpRight } from "lucide-react";

interface OrangeCTAButtonProps {
  text: string;
  onClick?: ((e?: React.MouseEvent) => void) | (() => void);
  href?: string;
  large?: boolean;
  className?: string;
  showArrow?: boolean;
}

export default function OrangeCTAButton({
  text,
  onClick,
  href,
  large = false,
  className = "",
  showArrow = true,
}: OrangeCTAButtonProps) {
  const baseClasses = `
    group inline-flex items-center gap-2 font-body font-semibold
    bg-orange text-black rounded-pill
    transition-all duration-250 ease-out
    hover:bg-[#ff6a1a] hover:-translate-y-0.5
    active:scale-[0.98]
    ${large ? "px-12 py-4.5 text-base" : "px-8 py-3.5 text-sm"}
    ${className}
  `;

  const content = (
    <>
      <span>{text}</span>
      {showArrow && (
        <ArrowUpRight
          size={large ? 18 : 16}
          className="transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {content}
    </button>
  );
}
