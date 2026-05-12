import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
}

const categories: ProjectCategory[] = [
  {
    tags: ["AI Engineering", "Deep Learning", "Computer Vision"],
    titleBold: "Neural Canvas:",
    titleNormal:
      "an intelligent creative platform where AI generates art from natural language descriptions",
    description:
      "Neural Canvas is an AI-powered image generation platform that understands artistic intent. Users describe their vision in natural language, and the system composes original artwork using a custom-trained diffusion model with precise style control.",
    detailLeft:
      "The platform was designed to bridge the gap between human creativity and machine intelligence. It processes complex multi-modal inputs and generates contextually aware artistic outputs with real-time feedback loops.",
    detailRight:
      "We built a flexible architecture that merges state-of-the-art diffusion principles with intuitive UX. The system features adaptive style transfer, prompt engineering pipelines, and a responsive gallery that showcases generated artwork.",
    images: [
      "/images/projects/ai-tools.png",
      "/images/projects/neural-art.png",
      "/images/projects/chatbot-ui.png",
      "/images/projects/data-viz.png",
      "/images/projects/ml-pipeline.png",
      "/images/projects/nlp-analytics.png",
    ],
  },
  {
    tags: ["NLP", "Analytics", "Real-time Systems"],
    titleBold: "Sentiment Engine:",
    titleNormal:
      "real-time sentiment analysis for understanding brand perception across digital channels",
    description:
      "Sentiment Engine processes social media streams, news feeds, and customer feedback to deliver actionable brand intelligence dashboards. Built on transformer architectures with fine-tuned BERT models for domain-specific accuracy.",
    detailLeft:
      "The system was crafted to process millions of data points in real-time, maintaining sub-second latency while delivering nuanced sentiment classifications across 12 emotional dimensions and 40+ languages.",
    detailRight:
      "A modular pipeline architecture enables seamless integration with existing business tools. Custom dashboards provide executives with clear, actionable insights while data scientists access granular analytics and model performance metrics.",
    images: [
      "/images/projects/nlp-analytics.png",
      "/images/projects/data-viz.png",
      "/images/projects/ml-pipeline.png",
      "/images/projects/ai-tools.png",
      "/images/projects/chatbot-ui.png",
      "/images/projects/neural-art.png",
    ],
  },
  {
    tags: ["Machine Learning", "Automation", "Cloud"],
    titleBold: "Predictive Analytics:",
    titleNormal:
      "end-to-end ML pipelines for time-series forecasting and intelligent business automation",
    description:
      "A production-grade ML pipeline that processes historical data, automatically selects optimal models, and delivers predictions with confidence intervals. Deployed on cloud infrastructure with auto-scaling capabilities.",
    detailLeft:
      "The pipeline was engineered for reliability and scale — processing terabytes of time-series data daily with automated feature engineering, model selection, and hyperparameter optimization across distributed compute clusters.",
    detailRight:
      "Built with a focus on explainability and trust. Every prediction comes with interpretable confidence bounds, feature importance rankings, and drift detection alerts that keep stakeholders informed and models accurate.",
    images: [
      "/images/projects/ml-pipeline.png",
      "/images/projects/data-viz.png",
      "/images/projects/neural-art.png",
      "/images/projects/chatbot-ui.png",
      "/images/projects/ai-tools.png",
      "/images/projects/nlp-analytics.png",
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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const timer = setTimeout(() => {
      const totalWidth = track.scrollWidth / 2;
      if (totalWidth <= 0) return;

      const from = direction === "left" ? 0 : -totalWidth;
      const to = direction === "left" ? -totalWidth : 0;

      const tween = gsap.fromTo(
        track,
        { x: from },
        {
          x: to,
          duration: speed,
          ease: "none",
          repeat: -1,
        }
      );

      return () => {
        tween.kill();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [direction, speed]);

  const doubled = [...images, ...images];

  return (
    <div className="marquee-strip w-full">
      <div
        ref={trackRef}
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
              loading="lazy"
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
  return (
    <div className="project-panel w-full bg-black flex flex-col pt-10 md:pt-16">
      {/* ── HEADER (The "Smaller Bar") ── */}
      <div className="project-header mb-6 md:mb-10">
        {/* Tags + See Full Case */}
        <div className="px-5 md:px-10 lg:px-16 mb-6 md:mb-8">
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
            <button className="group flex-shrink-0 font-body text-[11px] md:text-[12px] font-medium text-black bg-white border border-white rounded-full px-5 py-2 hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 tracking-wide">
              See Full Case
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
            </button>
          </div>
        </div>

        {/* Title + Description */}
        <div className="px-5 md:px-10 lg:px-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-6 md:mb-10 max-w-[1100px]">
              <h3 className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.1] text-white tracking-tight">
                <span className="font-bold">{category.titleBold}</span>{" "}
                <span className="font-normal text-white/70">
                  {category.titleNormal}
                </span>
              </h3>
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-12">
              <div />
              <p className="font-body text-[13px] lg:text-[14px] text-white/50 leading-[1.6]">
                {category.detailLeft}
              </p>
              <p className="font-body text-[13px] lg:text-[14px] text-white/50 leading-[1.6]">
                {category.detailRight}
              </p>
            </div>
            <div className="md:hidden">
              <p className="font-body text-[13px] text-white/50 leading-[1.6]">
                {category.description}
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
        // Entrance animation
        gsap.fromTo(
          panel,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // Snap/Push up animation for ALL panels, including the last one.
        // Shrinking the last panel's image will automatically pull up the next section (Skills/Tools).
        const marqueeWrapper = panel.querySelector(".marquee-wrapper");
        if (marqueeWrapper) {
          // Instead of scrub: true (which goes gradually with scroll),
          // this uses a fixed duration and an expo ease.
          // When you scroll past the start point, it rapidly collapses the image,
          // which "snaps" or "pushes" the next section up into view satisfyingly.
          gsap.to(marqueeWrapper, {
            height: 0,
            duration: 0.9,
            ease: "power3.inOut", // Smoother, luxurious fluid push rather than a sharp snap
            onComplete: () => ScrollTrigger.refresh(), // Ensures following sections stay synced
            onReverseComplete: () => ScrollTrigger.refresh(),
            scrollTrigger: {
              trigger: marqueeWrapper,
              start: "top 20%", // Triggers later, when the image is near the top, so the next section is visible
              toggleActions: "play none none reverse", // Play instantly, reverse if scrolled back
            },
          });
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
      <div className="px-5 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-white/30 uppercase">
            Projects
          </span>
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
