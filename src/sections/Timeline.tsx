import { useEffect, useRef, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const InfiniteGallery = lazy(() => import("@/components/ui/3d-gallery-photography"));

const galleryImages = [
  { src: 'https://picsum.photos/seed/img1/600/800', alt: 'Image 1' },
  { src: 'https://picsum.photos/seed/img2/800/600', alt: 'Image 2' },
  { src: 'https://picsum.photos/seed/img3/600/800', alt: 'Image 3' },
  { src: 'https://picsum.photos/seed/img4/800/600', alt: 'Image 4' },
  { src: 'https://picsum.photos/seed/img5/600/800', alt: 'Image 5' },
  { src: 'https://picsum.photos/seed/img6/800/600', alt: 'Image 6' },
  { src: 'https://picsum.photos/seed/img7/600/800', alt: 'Image 7' },
  { src: 'https://picsum.photos/seed/img8/800/600', alt: 'Image 8' },
];

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

const entries: TimelineEntry[] = [
  {
    period: "2025 — Present",
    title: "AI Engineer & Creative Developer",
    description:
      "Building intelligent applications and exploring the frontiers of machine learning, creative coding, and human-AI interaction.",
  },
  {
    period: "2023 — 2025",
    title: "Machine Learning Specialist",
    description:
      "Developed and deployed NLP models, built recommendation systems, and automated data pipelines for production environments.",
  },
  {
    period: "2021 — 2023",
    title: "Software Developer",
    description:
      "Full-stack development with a growing focus on AI integration. Built web applications and began specializing in intelligent systems.",
  },
  {
    period: "2019 — 2021",
    title: "Computer Science Student",
    description:
      "Foundational years in algorithms, data structures, and software engineering. Discovered a passion for artificial intelligence.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Timeline line draws as user scrolls
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
        lineRef.current.style.transformOrigin = "top";
      }

      // Each entry animates in
      entryRefs.current.forEach((entry) => {
        if (!entry) return;

        const node = entry.querySelector(".timeline-node");
        const text = entry.querySelector(".timeline-text");

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: entry,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              delay: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      if (galleryRef.current) {
        ScrollTrigger.create({
          trigger: galleryRef.current,
          start: "center center",
          end: "+=1500",
          pin: true,
          scrub: true,
          onToggle: (self) => {
            window.dispatchEvent(new CustomEvent('gallery-toggle', { detail: { isActive: self.isActive } }));
          }
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="bg-black"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-[clamp(80px,12vh,160px)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel text="ACHIEVEMENTS" className="mb-6 block" />
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-16">
            My Achievements
          </h2>

          <div className="relative pl-10 md:pl-16">
            {/* Timeline line */}
            <div
              ref={lineRef}
              className="absolute left-0 top-0 bottom-0 w-0.5"
              style={{
                background:
                  "linear-gradient(to bottom, #ff5500, rgba(255,85,0,0.1))",
              }}
            />

            {/* Entries */}
            <div className="space-y-16">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  ref={(el) => { entryRefs.current[i] = el; }}
                  className="relative"
                >
                  {/* Node */}
                  <div
                    className="timeline-node absolute -left-10 md:-left-16 top-1 w-3 h-3 rounded-full bg-orange border-2 border-black"
                    style={{ transform: "translateX(calc(-50% + 1px))" }}
                  />

                  {/* Text */}
                  <div className="timeline-text">
                    <span className="font-mono text-sm text-orange block mb-2">
                      {entry.period}
                    </span>
                    <h3 className="font-body text-2xl font-semibold text-white mb-3">
                      {entry.title}
                    </h3>
                    <p className="font-body text-base text-txt-tertiary max-w-[560px] leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Integrated Gallery */}
        <div ref={galleryRef} className="w-full mt-32 max-w-[1400px] mx-auto pb-12">
          <h3 className="font-display text-3xl font-bold text-white mb-8">Visual Memories</h3>
          <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-3xl overflow-hidden">
            <ErrorBoundary fallback={<div className="h-full w-full flex items-center justify-center text-white bg-white/5">Gallery failed to load images. Please check the URLs.</div>}>
              <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-white/30"><span className="text-sm font-body">Loading gallery...</span></div>}>
                <InfiniteGallery
                  images={galleryImages}
                  speed={0.4}
                  zSpacing={3}
                  visibleCount={8}
                  falloff={{ near: 0.8, far: 14 }}
                  className="w-full h-full"
                />
              </Suspense>
            </ErrorBoundary>
            
            {/* Subtle overlay gradients for depth */}
            <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
