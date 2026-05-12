import { useEffect, useRef, useCallback } from "react";

interface CursorState {
  x: number;
  y: number;
  hoverType: "none" | "interactive" | "text";
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CursorState>({ x: 0, y: 0, hoverType: "none" });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const state = stateRef.current;
    const ring = ringPosRef.current;

    // Dot follows instantly
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${state.x - 4}px, ${state.y - 4}px)`;
    }

    // Ring follows with lerp
    ring.x += (state.x - ring.x) * 0.15;
    ring.y += (state.y - ring.y) * 0.15;

    if (ringRef.current) {
      const ringSize =
        state.hoverType === "interactive" ? 24 : state.hoverType === "text" ? 12 : 16;
      ringRef.current.style.transform = `translate(${ring.x - ringSize}px, ${ring.y - ringSize}px)`;
      ringRef.current.style.width = `${ringSize * 2}px`;
      ringRef.current.style.height = `${ringSize * 2}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      stateRef.current.x = e.clientX;
      stateRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "interactive"
      ) {
        stateRef.current.hoverType = "interactive";
      } else if (
        target.tagName === "P" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "SPAN" ||
        target.dataset.cursor === "text"
      ) {
        stateRef.current.hoverType = "text";
      }
    };

    const handleMouseOut = () => {
      stateRef.current.hoverType = "none";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Don't render on mobile
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-orange rounded-full pointer-events-none z-[9999] hidden md:block transition-[width,height] duration-150"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
