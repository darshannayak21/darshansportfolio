import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
const ScrollReveal = ({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const variants: Record<string, { x?: number; y?: number; opacity: number }> =
    {
      up: { y: 50, opacity: 0 },
      down: { y: -50, opacity: 0 },
      left: { x: -60, opacity: 0 },
      right: { x: 60, opacity: 0 },
      fade: { opacity: 0 },
    };
  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : variants[direction]}
      transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            const easeProgress =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default function MoreAbout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end 80%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // If there's a specific hash other than the first section, scroll to it
    if (location.hash && location.hash !== "#more-about") {
      // Small timeout to ensure DOM is ready and layout is settled
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          const topPosition =
            element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: topPosition, behavior: "instant" });
        }
      }, 20);
    } else {
      // Force absolute top for the first section to avoid layout offset glitches
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return (
    <div className="bg-[#f8f8f8] text-gray-900 min-h-screen overflow-x-clip w-full relative">
      {/* Scroll Indicator */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 ${scrolled ? "opacity-0" : "opacity-100"}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Scroll
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/40 animate-bounce-subtle"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      {/* Back Button */}
      <Link
        to="/#bento-grid"
        className="fixed top-6 right-6 z-[100] group flex items-center justify-center gap-2 bg-[#ffffff]/80 hover:bg-[#f5f5f7]/80 text-[#1d1d1f] border-black/[0.04] shadow-[0_4px_14px_rgba(0,0,0,0.05)] backdrop-blur-2xl border px-4 py-2 rounded-full font-body text-[14px] font-medium transition-all duration-300 active:scale-95"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </Link>

      <FlowArt aria-label="More About Sections">
        {/* More About Me! Section */}
        <FlowSection
          id="more-about"
          aria-label="More About Me!"
          className="min-h-[100vh] md:min-h-[120vh] relative"
          style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}
        >
          {/* Sticky Visual Container */}
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
            {/* Yellow Circle */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 2.0,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute w-[90vw] h-[90vw] max-w-[450px] max-h-[450px] lg:max-w-[600px] lg:max-h-[600px] rounded-full bg-[#ff5500] mt-56 md:mt-0 md:w-[75vw] md:h-[75vw] opacity-80"
            />

            {/* Profile Image */}
            <motion.img
              src="/sideprofile.PNG"
              alt="Darshan Side Profile"
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 2.2,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute z-10 w-auto h-[60vh] md:h-[80vh] lg:h-[90vh] object-contain object-bottom bottom-0 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
            />

            {/* Typography Overlays */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 lg:p-20">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2.0,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-32 md:mt-0 pt-0"
              >
                <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-bold leading-[0.9] uppercase tracking-tight text-gray-900 mix-blend-difference">
                  More
                  <br />
                  About
                  <br />
                  Me!
                </h1>
              </motion.div>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2.0,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute bottom-4 left-6 right-6 md:bottom-auto md:left-auto md:right-12 lg:right-20 md:top-[35%] text-left md:text-right"
              >
                <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-display font-bold leading-[0.85] tracking-tight text-gray-900">
                  Driven
                  <br />
                  by
                  <br />
                  Curiosity
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Scrolling content */}
          <div className="relative z-30 w-full px-5 md:px-12 pb-[20vh] md:pb-10 lg:pb-12 mt-0 pt-8 md:pt-16 pointer-events-auto">
            {/* Stylish "More About Me" Paragraphs */}
            <ScrollReveal direction="fade" delay={0}>
              <div className="w-full max-w-5xl mx-auto text-center mb-6 md:mb-8 space-y-6 md:space-y-8 text-gray-700 font-body text-sm md:text-lg lg:text-xl leading-relaxed">
                <p>
                  Growing up across three countries — Cambodia, Singapore, and
                  India — taught me to adapt fast and think differently. That
                  global upbringing combined with an obsession for technology
                  pushed me toward building things that actually matter, from
                  embedded circuits to intelligent AI systems. I don't just
                  write code — I engineer experiences. Whether it's a computer
                  vision rehabilitation assistant, an AI memory architecture, or
                  a full-stack web platform, every system I build is driven by
                  one question: does this actually solve something real?
                </p>
                <p>
                  Four national hackathon wins, a published research paper, and
                  a filed patent — all before finishing my degree. I'm not
                  waiting to be ready. I'm learning by shipping, pushing
                  boundaries, and figuring things out faster than most. I
                  believe the most powerful technology is the kind that
                  disappears into the background and just works. My goal is to
                  build intelligent systems that are so well designed, so
                  thoughtful, that they feel less like software and more like a
                  natural extension of how people live and work.
                </p>
              </div>
            </ScrollReveal>

            {/* Split Layout: Football on left, Text on right */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-12 lg:gap-16 relative z-20 mt-4 md:mt-6 lg:mt-8 mb-10 md:mb-12 lg:mb-12">
              {/* Left Side: Football Image */}
              <ScrollReveal
                direction="left"
                delay={0.1}
                className="w-full md:w-[45%]"
              >
                <div className="flex justify-center md:justify-end pr-0 md:pr-4">
                  <img
                    src="/football.PNG"
                    alt="Football"
                    loading="lazy"
                    className="w-full max-w-[380px] md:max-w-[450px] lg:max-w-[600px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] scale-[1.15] md:scale-100 lg:scale-[1.05] md:translate-y-4 lg:translate-y-6"
                  />
                </div>
              </ScrollReveal>
              {/* Right Side: Hobbies Text */}
              <ScrollReveal
                direction="right"
                delay={0.2}
                className="w-full md:w-[55%]"
              >
                <div className="flex flex-col justify-center">
                  <div className="bg-white/80 backdrop-blur-3xl border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border rounded-2xl md:rounded-[2rem] p-6 md:p-10">
                    <h3 className="font-display text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                      Beyond Code
                    </h3>
                    <div className="space-y-3 md:space-y-4 text-gray-700 font-body text-sm md:text-lg leading-relaxed">
                      <p>
                        When I'm not building intelligent systems, you'll find
                        me on the pitch or mid-run. Football and long distance
                        running are how I reset, stay sharp, and think clearly.
                        Music is a big part of my life too — I play drums,
                        piano, guitar, ukulele, and harmonica. I just love the
                        process of picking something up and figuring it out from
                        scratch.
                      </p>
                      <p>
                        Away from screens, I create with my hands. I'm a
                        national award-winning sculptor and spend a lot of time
                        drawing realistic portraits — the precision and patience
                        that art demands feeds directly into how I approach
                        engineering.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </FlowSection>

        {/* Current Interests Section */}
        <FlowSection
          id="interests"
          aria-label="Current Interests"
          className="min-h-[100vh] md:min-h-[120vh] relative"
          style={{ backgroundColor: "#f5f5f7", color: "#1d1d1f" }}
        >
          <div className="relative z-10 flex flex-col pt-12 md:pt-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full pb-16 md:pb-32">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight mb-10 md:mb-16">
              Current
              <br />
              Interests
            </h1>

            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 w-full">
              {/* Left Column: Philosophy & Progress Bars */}
              <div className="flex flex-col space-y-8 md:space-y-12">
                <p className="font-body text-base md:text-xl lg:text-2xl font-medium leading-snug text-gray-800">
                  AI shouldn't replicate us — it should extend us. I build
                  systems that understand humans deeply enough to fill the gaps
                  we can't fill ourselves. That belief drives everything I
                  research and build.
                </p>
                <ScrollReveal direction="fade" delay={0.1}>
                  <p className="font-body italic text-sm md:text-base text-gray-600">
                    "The goal isn't artificial general intelligence. It's
                    artificial genuine helpfulness."
                  </p>
                </ScrollReveal>

                <div className="space-y-8 mt-10 md:mt-14">
                  <ScrollReveal direction="fade" delay={0.1}>
                    <h3 className="font-body text-[13px] font-medium tracking-[0.08em] uppercase text-black/40">
                      Currently Learning & Sharpening
                    </h3>
                  </ScrollReveal>
                  <div className="space-y-6 lg:space-y-7">
                    {[
                      { label: "DSA & Problem Solving", percent: 75 },
                      { label: "Web Development", percent: 85 },
                      { label: "AI & Machine Learning", percent: 80 },
                      { label: "Computer Vision", percent: 78 },
                    ].map((skill, idx) => (
                      <div key={idx} className="space-y-2.5">
                        <div className="flex justify-between items-baseline">
                          <span className="font-body text-[15px] md:text-base font-medium text-black/80 tracking-tight">
                            {skill.label}
                          </span>
                          <span className="font-body text-[13px] text-black/30 tabular-nums">
                            {skill.percent}%
                          </span>
                        </div>
                        <div className="w-full h-[3px] bg-black/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-black/70 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Topic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {[
                  {
                    title: "AI Memory & Knowledge Graphs",
                    desc: "Researching how agents store, reason and retrieve across disconnected information domains.",
                    num: "01",
                  },
                  {
                    title: "Human-Centered AI Systems",
                    desc: "Building AI that understands human context and intent, not just processes language.",
                    num: "02",
                  },
                  {
                    title: "Computer Vision & Pose Estimation",
                    desc: "Applying real-time visual intelligence to physiotherapy, sports analytics and beyond.",
                    num: "03",
                  },
                  {
                    title: "Data Structures & Algorithms",
                    desc: "Sharpening problem-solving fundamentals to build faster, cleaner and more scalable systems.",
                    num: "04",
                  },
                ].map((card, idx) => (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                    <div className="group bg-white/60 backdrop-blur-2xl border-black/[0.04] hover:bg-white hover:border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] border rounded-2xl p-6 md:p-7 transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden">
                      <span className="font-body text-[11px] font-medium tracking-[0.15em] text-black/20 uppercase mb-5">
                        {card.num}
                      </span>
                      <h4 className="font-display font-semibold text-[17px] md:text-lg mb-2.5 text-black/90 leading-snug">
                        {card.title}
                      </h4>
                      <p className="font-body text-[13px] md:text-sm text-black/50 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Quick Stats & Currently Exploring */}
            <div className="mt-8 md:mt-12 mb-24 w-full flex flex-col gap-6 md:gap-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { value: 4, suffix: "", label: "National Awards" },
                  { value: 3, suffix: "", label: "Articles Written" },
                  { value: 20, suffix: "+", label: "Projects Completed" },
                  { value: 2022, suffix: "", label: "Journey Started" },
                ].map((stat, idx) => (
                  <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                    <div className="bg-white/70 backdrop-blur-2xl border-black/[0.03] hover:bg-white hover:border-black/[0.06] shadow-sm hover:shadow-lg border rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-400">
                      <span className="font-display text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-2 md:mb-3 font-light tracking-tight">
                        <Counter
                          end={stat.value}
                          suffix={stat.suffix}
                          duration={2000}
                        />
                      </span>
                      <span className="font-body text-[10px] md:text-xs tracking-[0.2em] text-gray-500 uppercase font-semibold">
                        {stat.label}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Featured Articles Box */}
              <ScrollReveal direction="up" delay={0.2}>
                <div className="bg-white/80 backdrop-blur-3xl border-black/[0.03] hover:bg-white hover:border-black/[0.06] shadow-md hover:shadow-xl border rounded-2xl md:rounded-[2rem] p-8 md:p-12 flex flex-col lg:flex-row items-stretch gap-10 lg:gap-16 transition-all duration-400 group/featured">
                  {/* Left Side: Title */}
                  <div className="flex flex-col justify-between shrink-0 text-center lg:text-left lg:w-[320px] relative z-10">
                    <div>
                      <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-white/40 uppercase mb-4 block">
                        Publications
                      </span>
                      <h4 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-none mb-6">
                        Featured
                        <br className="hidden lg:block" /> Articles.
                      </h4>
                      <p className="font-body text-sm md:text-base text-white/50 leading-relaxed max-w-sm mx-auto lg:mx-0">
                        Deep dives into AI architectures, knowledge graphs, and
                        scalable systems. My thoughts on the future of
                        intelligent systems.
                      </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 mt-12">
                      <div className="w-12 h-[1px] bg-white/20" />
                      <span className="font-body text-xs text-white/30 uppercase tracking-widest">
                        Scroll to read
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Article Links */}
                  <div className="w-full flex flex-col gap-4 md:gap-5 relative z-10">
                    {/* Article 1 */}
                    <a
                      href="https://medium.com/@ndarshan507/from-static-rag-to-systems-that-think-building-a-self-adaptive-hybrid-search-rag-120fb4ce80af"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 overflow-hidden relative"
                    >
                      <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-500" />

                      <div className="flex flex-col pr-4 relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-[10px] md:text-xs text-white/60 uppercase tracking-wider bg-white/10 px-2 py-1 rounded">
                            AI Systems
                          </span>
                          <span className="font-body text-xs text-white/40">
                            8 min read
                          </span>
                        </div>
                        <h5 className="font-display font-bold text-white text-lg md:text-xl lg:text-2xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                          From Static RAG to Systems that Think
                        </h5>
                        <p className="font-body text-xs md:text-sm text-white/50 line-clamp-2">
                          An architectural breakdown of building a self-adaptive
                          hybrid search RAG.
                        </p>
                      </div>

                      <div className="mt-6 md:mt-0 shrink-0 relative z-10 flex items-center text-[#0066cc] font-body text-base font-medium group-hover:text-[#0055b3] transition-colors duration-300">
                        Read
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </a>

                    {/* Article 2 */}
                    <a
                      href="https://medium.com/@ndarshan507/navigating-the-unnavigable-building-indias-first-real-time-flood-navigation-system-f31419874f0d"
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 overflow-hidden relative"
                    >
                      <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-500" />

                      <div className="flex flex-col pr-4 relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-mono text-[10px] md:text-xs text-white/60 uppercase tracking-wider bg-white/10 px-2 py-1 rounded">
                            Engineering
                          </span>
                          <span className="font-body text-xs text-white/40">
                            6 min read
                          </span>
                        </div>
                        <h5 className="font-display font-bold text-white text-lg md:text-xl lg:text-2xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                          Building India's First Flood Navigation System
                        </h5>
                        <p className="font-body text-xs md:text-sm text-white/50 line-clamp-2">
                          A technical deep dive into navigating the unnavigable
                          through real-time systems.
                        </p>
                      </div>

                      <div className="mt-6 md:mt-0 shrink-0 relative z-10 flex items-center text-[#0066cc] font-body text-base font-medium group-hover:text-[#0055b3] transition-colors duration-300">
                        Read
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </div>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </FlowSection>

        {/* Experiences Section */}
        <FlowSection
          id="work"
          aria-label="Experiences"
          className="min-h-[100vh] md:min-h-[120vh] relative"
          style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}
        >
          <div className="relative z-10 flex flex-col pt-12 md:pt-24 pb-16 md:pb-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight mb-10 md:mb-16">
              Experiences
            </h1>

            <div className="flex flex-col gap-6 md:gap-8 w-full">
              {/* Row 1: Internships & Freelance */}
              <ScrollReveal direction="left" delay={0}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-7 flex">
                    <div className="group/card bg-white/80 backdrop-blur-2xl border-black/[0.03] hover:bg-white hover:border-black/[0.06] shadow-sm hover:shadow-lg rounded-2xl p-6 md:p-8 transition-all duration-500 w-full flex flex-col justify-center relative overflow-hidden">
                      {/* Subtle top accent */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      <div className="flex items-center mb-6">
                        <h3 className="font-display font-bold text-lg md:text-xl tracking-tight text-[#1d1d1f]">
                          Internships & Freelance
                        </h3>
                      </div>

                      <div className="space-y-5 pl-1 border-l border-black/10 ml-4">
                        <div className="pl-5 relative">
                          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-black/30" />
                          <div className="flex flex-wrap items-baseline mb-1.5 gap-2">
                            <h4 className="font-body font-semibold text-sm md:text-base text-[#1d1d1f]">
                              Software Developer — VSQC <span className="font-normal text-black/50 ml-1">Jan 2026 – Feb 2026</span>
                            </h4>
                          </div>
                          <ul className="font-body text-xs md:text-sm space-y-1 text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Developed and enhanced software features within a
                              collaborative team.
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Translated requirements into technical solutions
                              and optimized systems.
                            </li>
                          </ul>
                        </div>

                        <div className="pl-5 relative">
                          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-black/30" />
                          <div className="flex flex-wrap items-baseline mb-1.5 gap-2">
                            <h4 className="font-body font-semibold text-sm md:text-base text-[#1d1d1f]">
                              Freelance Web Developer <span className="font-normal text-black/50 ml-1">2024 – Present</span>
                            </h4>
                          </div>
                          <ul className="font-body text-xs md:text-sm space-y-1 text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Delivered end-to-end responsive business websites
                              and UI/UX design.
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Collaborated with clients to implement custom
                              technical requirements.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex min-h-[200px]">
                    <div className="w-full h-full bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group hover:border-white/20 transition-all duration-500">
                      <img
                        src="/images/WORK.jpeg"
                        alt="Internships"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Row 2: Research */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-7 flex">
                    <div className="group/card bg-white/80 backdrop-blur-2xl border-black/[0.03] hover:bg-white hover:border-black/[0.06] shadow-sm hover:shadow-lg rounded-2xl p-6 md:p-8 transition-all duration-500 w-full flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      <div className="flex items-center mb-6">
                        <h3 className="font-display font-bold text-lg md:text-xl tracking-tight text-[#1d1d1f]">
                          Research
                        </h3>
                      </div>

                      <div className="space-y-5 pl-1 border-l border-black/10 ml-4">
                        <div className="pl-5 relative">
                          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-black/30" />
                          <div className="flex flex-wrap items-baseline mb-2 gap-2">
                            <h4 className="font-body font-semibold text-sm md:text-base text-[#1d1d1f]">
                              Research Author — GraphMind <span className="font-normal text-black/50 ml-1">2025 – Present</span>
                            </h4>
                          </div>
                          <ul className="font-body text-xs md:text-sm space-y-1 text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Designed a dual-layer knowledge graph architecture
                              for AI memory systems.
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Conducted experiments proving higher retrieval
                              accuracy and context efficiency.
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Authored findings for publication focusing on
                              agentic AI representation.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex min-h-[200px]">
                    <div className="w-full h-full bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group hover:border-white/20 transition-all duration-500">
                      <img
                        src="/images/RESEARCH.PNG"
                        alt="Research"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Row 3: Competitions */}
              <ScrollReveal direction="left" delay={0.2}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-7 flex">
                    <div className="group/card bg-white/80 backdrop-blur-2xl border-black/[0.03] hover:bg-white hover:border-black/[0.06] shadow-sm hover:shadow-lg rounded-2xl p-6 md:p-8 transition-all duration-500 w-full flex flex-col justify-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      <div className="flex items-center mb-6">
                        <h3 className="font-display font-bold text-lg md:text-xl tracking-tight text-[#1d1d1f]">
                          Competitions
                        </h3>
                      </div>

                      <div className="space-y-5 pl-1 border-l border-black/10 ml-4">
                        <div className="pl-5 relative">
                          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-black/30" />
                          <div className="flex flex-wrap items-baseline mb-2 gap-2">
                            <h4 className="font-body font-semibold text-sm md:text-base text-[#1d1d1f]">
                              Team Lead / Solo Competitor · 10+ Hackathons <span className="font-normal text-black/50 ml-1">2024 – Present</span>
                            </h4>
                          </div>
                          <ul className="font-body text-xs md:text-sm space-y-1 text-gray-600">
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Participated in over 10 national-level hackathons
                              and technical competitions.
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Won multiple national hackathons including VIT
                              Code Apex 2.0 and Pragyantara.
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="mt-0.5 shrink-0 text-black/30">
                                ›
                              </span>
                              Built production-ready prototypes under strict
                              24-hour deadlines.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5 flex min-h-[200px]">
                    <div className="w-full h-full bg-white/[0.05] backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden relative group hover:border-white/20 transition-all duration-500">
                      <img
                        src="/images/COMPETITIONS.jpeg"
                        alt="Competitions"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* CTA Resume Banner */}
              <ScrollReveal direction="up" delay={0.15}>
                <div className="mt-4 bg-[#f5f5f7]/80 backdrop-blur-3xl border-black/[0.03] hover:bg-[#e8e8ed]/90 hover:border-black/[0.06] shadow-md hover:shadow-xl rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500">
                  <div className="flex flex-col text-center md:text-left">
                    <h3 className="font-display font-semibold text-2xl md:text-3xl mb-2 tracking-tight text-[#1d1d1f]">
                      View my complete resume.
                    </h3>
                    <p className="font-body text-sm md:text-base text-gray-500">
                      A detailed overview of my professional experience,
                      technical skills, and research background.
                    </p>
                  </div>
                  <a
                    href="/Darshans%20Resume.pdf"
                    download="Darshans_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="group shrink-0 flex items-center justify-center gap-2 text-[#0066cc] font-body text-base font-medium transition-all duration-300"
                  >
                    Download Resume
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </FlowSection>

        {/* My Journey and Education Section */}
        <FlowSection
          id="journey"
          aria-label="My Journey and Education"
          className="min-h-[100vh] md:min-h-[120vh] relative"
          style={{ backgroundColor: "#f5f5f7", color: "#1d1d1f" }}
        >
          <div className="relative z-10 flex flex-col pt-12 md:pt-24 pb-16 md:pb-32 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full">
            {/* Section Header */}
            <ScrollReveal direction="up" delay={0.1}>
              <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight mb-6 md:mb-8 text-[#1d1d1f]">
                My
                <br />
                Journey &<br />
                Education
              </h1>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full mt-4 md:mt-8">
              {/* Left Column: Intro & Philosophy */}
              <div className="lg:col-span-5 flex flex-col space-y-8">
                <ScrollReveal direction="up" delay={0.2}>
                  <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight text-[#1d1d1f]">
                    From Curiosity to Building Intelligent Systems
                  </h3>
                  <p className="font-body text-base md:text-lg font-medium mt-4 text-gray-600">
                    A story of how curiosity evolved into a passion for
                    Artificial Intelligence, software engineering, research, and
                    innovation.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="fade" delay={0.3}>
                  <div className="space-y-5 font-body text-sm md:text-base leading-relaxed border-l-2 pl-6 text-[#1d1d1f]/60 border-black/10">
                    <p className="transition-colors duration-300 hover:text-[#1d1d1f]">
                      My interest in computer science truly began after 10th
                      grade when I was introduced to the world of Artificial
                      Intelligence and Data Science. I instantly realized this
                      was the future—and the space where I wanted to make my
                      mark.
                    </p>
                    <p className="transition-colors duration-300 hover:text-[#1d1d1f]">
                      The idea of building intelligent systems capable of
                      learning, reasoning, and solving real-world problems
                      fascinated me. What started as curiosity quickly evolved
                      into a passion for creating meaningful technology.
                    </p>
                    <p className="transition-colors duration-300 hover:text-[#1d1d1f]">
                      Since then, I have dedicated myself to mastering AI,
                      software engineering, and innovation through projects,
                      research, hackathons, and real-world development
                      experiences. My goal is to become among the first in my
                      family to pursue a career in Artificial Intelligence while
                      building technologies that create meaningful impact on
                      people's lives.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Education Timeline */}
              <div className="lg:col-span-7 relative">
                {/* Timeline Line */}
                <div
                  ref={timelineRef}
                  className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-black/10 via-black/10 to-transparent z-0"
                >
                  <motion.div
                    style={{ height: lineHeight }}
                    className="absolute top-0 left-0 w-full rounded-full bg-black shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="flex flex-col space-y-10 md:space-y-12 relative z-10">
                  {/* Timeline Item 1 */}
                  <ScrollReveal direction="up" delay={0.2}>
                    <div className="relative pl-12 md:pl-16 group">
                      <div className="absolute left-0 top-1.5 w-8 h-8 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full ring-4 group-hover:scale-125 transition-transform duration-300 bg-black ring-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="border rounded-2xl p-6 transition-all duration-500 bg-[#f5f5f7]/80 backdrop-blur-2xl border-black/[0.03] hover:bg-[#e8e8ed]/90 hover:border-black/[0.06] shadow-sm hover:shadow-md">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                          <h4 className="font-display font-bold text-lg md:text-xl text-gray-900">
                            MIT World Peace University, Pune <span className="font-normal text-base text-gray-500 ml-1">2023 – Present</span>
                          </h4>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-body text-xs md:text-sm font-medium text-gray-700">
                            Integrated B.Tech Computer Science & Engineering (AI
                            & Data Science)
                          </span>
                        </div>
                        <p className="font-body text-sm text-gray-500">
                          Current Degree
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Timeline Item 2 */}
                  <ScrollReveal direction="up" delay={0.3}>
                    <div className="relative pl-12 md:pl-16 group">
                      <div className="absolute left-0 top-1.5 w-8 h-8 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full ring-4 group-hover:scale-125 transition-transform duration-300 bg-black ring-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="border rounded-2xl p-6 transition-all duration-500 bg-[#f5f5f7]/80 backdrop-blur-2xl border-black/[0.03] hover:bg-[#e8e8ed]/90 hover:border-black/[0.06] shadow-sm hover:shadow-md">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                          <h4 className="font-display font-bold text-lg md:text-xl text-gray-900">
                            BK Birla Centre of Education, Pune <span className="font-normal text-base text-gray-500 ml-1">2021 – 2023</span>
                          </h4>
                        </div>
                        <p className="font-body text-xs md:text-sm font-medium mb-1 text-gray-700">
                          Secondary Education (Grade 9–10)
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Timeline Item 3 */}
                  <ScrollReveal direction="up" delay={0.4}>
                    <div className="relative pl-12 md:pl-16 group">
                      <div className="absolute left-0 top-1.5 w-8 h-8 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full ring-4 group-hover:scale-125 transition-transform duration-300 bg-black ring-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="border rounded-2xl p-6 transition-all duration-500 bg-[#f5f5f7]/80 backdrop-blur-2xl border-black/[0.03] hover:bg-[#e8e8ed]/90 hover:border-black/[0.06] shadow-sm hover:shadow-md">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                          <h4 className="font-display font-bold text-lg md:text-xl text-gray-900">
                            British International School of Phnom Penh <span className="font-normal text-base text-gray-500 ml-1">2010 – 2021</span>
                          </h4>
                        </div>
                        <p className="font-body text-xs md:text-sm font-medium mb-3 text-gray-700">
                          Primary & Middle School (Kindergarten – Grade 8)
                        </p>
                        <p className="font-body text-sm text-gray-500">
                          International education experience that helped develop
                          a global perspective.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Timeline Item 4 */}
                  <ScrollReveal direction="up" delay={0.5}>
                    <div className="relative pl-12 md:pl-16 group">
                      <div className="absolute left-0 top-1.5 w-8 h-8 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full ring-4 group-hover:scale-125 transition-transform duration-300 bg-black ring-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                      </div>
                      <div className="border rounded-2xl p-6 transition-all duration-500 bg-[#f5f5f7]/80 backdrop-blur-2xl border-black/[0.03] hover:bg-[#e8e8ed]/90 hover:border-black/[0.06] shadow-sm hover:shadow-md">
                        <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                          <h4 className="font-display font-bold text-lg md:text-xl text-gray-900">
                            Global Indian International School, Singapore <span className="font-normal text-base text-gray-500 ml-1">2014 – 2016</span>
                          </h4>
                        </div>
                        <p className="font-body text-xs md:text-sm font-medium mb-3 text-gray-700">
                          Primary School (Grade 2 – 3)
                        </p>
                        <p className="font-body text-sm text-gray-500">
                          Strong early academic foundation.
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </FlowSection>
      </FlowArt>
    </div>
  );
}
