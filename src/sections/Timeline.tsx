import { useEffect, useRef, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const InfiniteGallery = lazy(() => import("@/components/ui/3d-gallery-photography"));

const galleryImages = [
  { src: '/images/gallery/Untitled3.webp', alt: 'Image 1' },
  { src: '/images/gallery/Untitled1.webp', alt: 'Image 2' },
  { src: '/images/gallery/Untitled7.webp', alt: 'Image 3' },
  { src: '/images/gallery/Untitled.webp', alt: 'Image 4' },
  { src: '/images/gallery/Untitled4.webp', alt: 'Image 5' },
  { src: '/images/gallery/Untitled5.webp', alt: 'Image 6' },
  { src: '/images/gallery/Untitled6.webp', alt: 'Image 7' },
  { src: '/images/gallery/Untitled2.webp', alt: 'Image 8' },
];

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  period: string;
  title: string;
  description: string;
}

const entries: TimelineEntry[] = [
  {
    period: "January 2024",
    title: "1st Place — Global AI Hackathon",
    description: "Developed 'Neural Canvas', an AI architecture tool, winning 1st place out of 500+ international teams. Awarded $20,000 and featured in TechCrunch.",
  },
  {
    period: "November 2023",
    title: "Published Research at NeurIPS",
    description: "First author on 'Efficient Transformer Architectures for Real-Time Mobile Inference'. Presented findings to an audience of 2,000+ researchers.",
  },
  {
    period: "August 2023",
    title: "Open Source Contributor of the Year",
    description: "Recognized by the TensorFlow community for critical optimization patches improving mobile deployment speeds by 40%.",
  },
  {
    period: "May 2023",
    title: "Best Startup Pitch — Tech Disrupt",
    description: "Secured seed funding and the 'Most Innovative MVP' award for building a decentralized emergency response network.",
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
      // Timeline line draws as user scrolls smoothly
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-container",
              start: "top 65%",
              end: "bottom 65%",
              scrub: 1.5, // Super smooth falling motion
            },
          }
        );
      }

      // Each entry animates in with premium sleekness
      entryRefs.current.forEach((entry) => {
        if (!entry) return;

        const node = entry.querySelector(".timeline-node");
        const innerNode = entry.querySelector(".timeline-node-inner");
        const text = entry.querySelector(".timeline-text");

        if (node && innerNode) {
          gsap.to(node, {
            borderColor: "rgba(255, 85, 0, 0.8)",
            backgroundColor: "rgba(255, 85, 0, 0.1)",
            duration: 0.4,
            scrollTrigger: {
              trigger: entry,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.to(innerNode, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: entry,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          });
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 65%",
                toggleActions: "play none none reverse",
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
          anticipatePin: 1,
          invalidateOnRefresh: true,
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
      className="bg-[#050505] relative"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-[clamp(80px,12vh,160px)] relative z-10">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-20 tracking-tight">
            Key Milestones
          </h2>

          <div className="relative pl-12 md:pl-20 max-w-3xl mx-auto text-left timeline-container pb-8">
            {/* Subtle Background Track */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.08]" />
            
            {/* Animated Glowing Fill Line */}
            <div
              ref={lineRef}
              className="absolute left-[-1px] top-0 w-[3px] bg-gradient-to-b from-transparent via-[#ff5500] to-[#ff5500] origin-top shadow-[0_0_15px_rgba(255,85,0,0.6)]"
            />

            {/* Entries */}
            <div className="space-y-24">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  ref={(el) => { entryRefs.current[i] = el; }}
                  className="relative group"
                >
                  {/* Outer Sleek Node */}
                  <div
                    className="timeline-node absolute -left-12 md:-left-20 top-2 w-4 h-4 rounded-full bg-[#0a0a0a] border border-white/20 transition-colors duration-500 z-10"
                    style={{ transform: "translateX(calc(-50% + 1px))" }}
                  />
                  
                  {/* Inner Glowing Node (Lights up on scroll) */}
                  <div
                    className="timeline-node-inner absolute -left-12 md:-left-20 top-2 w-4 h-4 rounded-full bg-[#ff5500] opacity-0 shadow-[0_0_15px_#ff5500] z-20"
                    style={{ transform: "translateX(calc(-50% + 1px)) scale(0.3)" }}
                  />

                  {/* Text Content */}
                  <div className="timeline-text">
                    <span className="font-mono text-sm tracking-wider text-[#ff5500] block mb-3">
                      {entry.period}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                      {entry.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-white/60 max-w-[600px] leading-relaxed">
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