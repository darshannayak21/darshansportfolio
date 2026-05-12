interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-[0.15em] text-orange ${className}`}
    >
      // {text}
    </span>
  );
}
