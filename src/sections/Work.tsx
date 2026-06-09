import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/components/ThemeProvider";

gsap.registerPlugin(ScrollTrigger);

/* ──────────── DATA ──────────── */
interface ProjectCategory {
  tags: string[];
  titleBold: string;
  titleNormal: string;
  description: string;
  detailLeft: string;
  detailRight: string;
  images: string[];
  link: string;
}

const categories: ProjectCategory[] = [
  {
    tags: ["AI Engineering", "Deep Learning", "Computer Vision"],
    titleBold: "AI & Intelligent Systems",
    titleNormal: "",
    link: "/aisystems",
    description:
      "A collection of high-performance AI systems designed for real-world impact. From autonomous drone tracking and real-time traffic enforcement to live F1 race predictions, these projects leverage advanced deep learning and multi-model ensembles.",
    detailLeft:
      "These systems are engineered to process complex, high-velocity data streams in real-time. Whether extracting visual features for anchor-free object detection or analyzing live telemetry for lap forecasting, the focus is on absolute speed and accuracy.",
    detailRight:
      "Built with robust architectures that merge state-of-the-art neural networks with intuitive dashboards. Key features include GPU-accelerated ALPR, attention-based LSTMs for time-series prediction, and stacking ensembles deployed via dynamic interfaces.",
    images: [
      "/images/projects/rain.webp",
      "/images/projects/f1.webp",
      "/images/projects/helmet.webp",
      "/images/projects/flood.webp",
      "/images/projects/drone.webp",
      "/images/projects/f12.webp",
    ],
  },
  {
    tags: ["Hardware Integration", "AI Assistants", "Real-time Systems"],
    titleBold: "Hackathon winning Projects",
    titleNormal: "",
    link: "/hackathonprojects",
    description:
      "A showcase of award-winning solutions built under extreme time constraints. These projects focus on solving critical real-world problems through innovative hardware-software integration and AI-driven automation.",
    detailLeft:
      "From personalized robotic care assistants (STELLA) to embedded personal safety devices (Shrimati Setu), each project demonstrates the ability to execute highly complex, high-impact ideas with production-level feasibility.",
    detailRight:
      "Our architecture emphasizes real-time responsiveness and scalable cloud infrastructure. Whether deploying computer vision for physical rehabilitation or ensuring zero-latency emergency alerts, these systems bridge the gap between rapid prototypes and life-saving technologies.",
    images: [
      "/images/projects/remotion.webp",
      "/images/projects/stella.webp",
      "/images/projects/shrimati.webp",
      "/images/projects/remotion.webp",
      "/images/projects/stella.webp",
      "/images/projects/shrimati.webp",
    ],
  },
  {
    tags: ["AI Architectures", "IoT Integration", "Applied R&D"],
    titleBold: "Experimental Builds",
    titleNormal: "",
    link: "/experimental",
    description:
      "A collection of cutting-edge R&D projects actively being tested for real-world implementation. These experimental builds focus on bridging advanced AI concepts with practical utility.",
    detailLeft:
      "These systems are engineered as foundational prototypes for real-world deployment. From self-adaptive RAG models capable of dynamic retrieval strategies to AI-driven satellite monitoring for ecological restoration.",
    detailRight:
      "Built with a focus on scalability and impact. Each experiment tests the boundaries of current technologies, integrating Gemini AI, custom IoT endpoints, and blockchain verification layers to create robust, production-ready concepts.",
    images: [
      "/images/projects/rag.webp",
      "/images/projects/blue.webp",
      "/images/projects/rapid.webp",
      "/images/projects/rag.webp",
      "/images/projects/blue.webp",
      "/images/projects/rapid.webp",
    ],
  },
];

/* ──────────── IMAGE MARQUEE (single row) ──────────── */
function ImageMarquee({
  images,
  direction = "left",
  speed = 45,
}: {
  images: string[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [imagesReady, setImagesReady] = useState(false);

  // Wait for all images inside the track to finish loading before starting the animation
  const handleTrackRef = useCallback((node: HTMLDivElement | null) => {
    (trackRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    if (!node) return;

    const imgs = node.querySelectorAll('img');
    if (imgs.length === 0) { setImagesReady(true); return; }

    let loaded = 0;
    const total = imgs.length;
    const check = () => { loaded++; if (loaded >= total) setImagesReady(true); };

    imgs.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) { check(); }
      else { img.addEventListener('load', check, { once: true }); img.addEventListener('error', check, { once: true }); }
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !imagesReady) return;

    let tween: gsap.core.Tween;
    let handleMouseEnter: () => void;
    let handleMouseLeave: () => void;

    // Small rAF delay to ensure layout has settled
    const raf = requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth / 2;
      if (totalWidth <= 0) return;

      const from = direction === "left" ? 0 : -totalWidth;
      const to = direction === "left" ? -totalWidth : 0;

      tween = gsap.fromTo(
        track,
        { x: from },
        {
          x: to,
          duration: speed,
          ease: "none",
          repeat: -1,
        }
      );

      // Smoothly slow down the animation on hover
      handleMouseEnter = () => {
        if (tween) gsap.to(tween, { timeScale: 0.60, duration: 0.6, ease: "power2.out" });
      };
      // Smoothly return to normal speed
      handleMouseLeave = () => {
        if (tween) gsap.to(tween, { timeScale: 1.6, duration: 0.6, ease: "power2.out" });
      };

      track.addEventListener("mouseenter", handleMouseEnter);
      track.addEventListener("mouseleave", handleMouseLeave);
      // For mobile support
      track.addEventListener("touchstart", handleMouseEnter, { passive: true });
      track.addEventListener("touchend", handleMouseLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (tween) tween.kill();
      if (track && handleMouseEnter && handleMouseLeave) {
        track.removeEventListener("mouseenter", handleMouseEnter);
        track.removeEventListener("mouseleave", handleMouseLeave);
        track.removeEventListener("touchstart", handleMouseEnter);
        track.removeEventListener("touchend", handleMouseLeave);
      }
    };
  }, [direction, speed, imagesReady]);

  const doubled = [...images, ...images];

  return (
    <div className="marquee-strip w-full">
      <div
        ref={handleTrackRef}
        className="flex gap-4 md:gap-5 will-change-transform"
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[220px] h-[160px] md:w-[320px] md:h-[220px] lg:w-[380px] lg:h-[260px] rounded-xl overflow-hidden bg-[#111]"
          >
            <img
              src={src}
              alt="Project preview"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────── SINGLE PROJECT PANEL ──────────── */
function ProjectPanel({
  category,
  index,
}: {
  category: ProjectCategory;
  index: number;
}) {
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div className="project-panel w-full bg-black flex flex-col pt-10 md:pt-16">
      {/* ── HEADER ── */}
      <div className="project-header mb-6 md:mb-10 flex flex-col">

        {/* Title — shown first on mobile, second on desktop */}
        <div className="px-5 md:px-10 lg:px-16 mb-4 md:mb-6 order-1 md:order-2">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-0 md:mb-10 max-w-[1100px]">
              <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.1] text-white tracking-tight">
                <span className="font-bold">{category.titleBold}</span>{" "}
                <span className="font-normal text-white/70">
                  {category.titleNormal}
                </span>
              </h3>
            </div>
          </div>
        </div>

        {/* Tags + See All Projects — shown second on mobile, first on desktop */}
        <div className="px-5 md:px-10 lg:px-16 mb-4 md:mb-8 order-2 md:order-1">
          <div className="max-w-[1400px] mx-auto flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {category.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[11px] md:text-[12px] font-medium text-white/80 bg-white/[0.08] border border-white/[0.05] rounded-full px-4 py-1.5 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link to={category.link} className={`group flex-shrink-0 font-body text-[11px] md:text-[12px] font-medium ${dark ? 'text-black bg-white border-white hover:bg-black hover:text-[#ffffff]' : 'text-[#ffffff] bg-[#333] border-transparent hover:bg-black hover:text-[#ffffff]'} border rounded-full px-5 py-2 transition-all duration-300 flex items-center gap-2 tracking-wide`}>
              See all projects
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Description — shown third on both, different content per breakpoint */}
        <div className="px-5 md:px-10 lg:px-16 order-3">
          <div className="max-w-[1400px] mx-auto">
            {/* Desktop: 3-column layout with empty first col */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-12">
              <div />
              <p className="font-body text-[13px] lg:text-[14px] text-white/50 leading-[1.6]">
                {category.detailLeft}
              </p>
              <p className="font-body text-[13px] lg:text-[14px] text-white/50 leading-[1.6]">
                {category.detailRight}
              </p>
            </div>
            {/* Mobile: both detail paragraphs stacked */}
            <div className="md:hidden space-y-3">
              <p className="font-body text-[12px] text-white/50 leading-[1.6]">
                {category.detailLeft}
              </p>
              <p className="font-body text-[12px] text-white/50 leading-[1.6]">
                {category.detailRight}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── IMAGE MARQUEE (The part that collapses) ── */}
      <div className="marquee-wrapper w-full overflow-hidden">
        {/* Inner padding so spacing shrinks with the image */}
        <div className="pb-10 md:pb-16">
          <ImageMarquee
            images={category.images}
            direction={index % 2 === 0 ? "left" : "right"}
            speed={50}
          />
        </div>
      </div>
    </div>
  );
}

/* ──────────── MAIN WORK SECTION ──────────── */
export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length === 0) return;

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        // Entrance animation — fast and immediate, same as before
        gsap.fromTo(
          panel,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Scroll-scrubbed collapse — tied directly to scroll position
        // This creates the buttery smooth poch.studio effect where the
        // marquee area shrinks proportionally as you scroll (1:1 feel)
        const marqueeWrapper = panel.querySelector<HTMLElement>(".marquee-wrapper");
        if (marqueeWrapper) {
          // Store the natural height so we can animate from it
          const naturalHeight = marqueeWrapper.offsetHeight;
          gsap.set(marqueeWrapper, { overflow: "hidden" });

          // Trigger earlier on mobile since panels are shorter
          const isMobile = window.innerWidth < 768;

          gsap.fromTo(
            marqueeWrapper,
            { height: naturalHeight, opacity: 1 },
            {
              height: 0,
              opacity: 0,
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: marqueeWrapper,
                start: isMobile ? "top 45%" : "top 50%",
                end: isMobile ? "top 10%" : "top 5%",
                scrub: isMobile ? 0.8 : 1.2,
                onLeave: () => ScrollTrigger.refresh(),
                onEnterBack: () => ScrollTrigger.refresh(),
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-black pt-16 md:pt-24"
    >
      {/* Section Header */}
      <div className="px-5 md:px-10 lg:px-16 mb-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white">
            Selected Work
          </h2>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-0 w-full relative">
        {categories.map((cat, i) => (
          <div
            key={cat.titleBold}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
            <ProjectPanel category={cat} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}