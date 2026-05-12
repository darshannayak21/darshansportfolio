import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  percentage: number;
}

const skills: Skill[] = [
  { name: "Python", level: "Expert", percentage: 95 },
  { name: "TensorFlow", level: "Advanced", percentage: 80 },
  { name: "PyTorch", level: "Advanced", percentage: 80 },
  { name: "React", level: "Advanced", percentage: 80 },
  { name: "Machine Learning", level: "Expert", percentage: 95 },
  { name: "NLP / LLMs", level: "Advanced", percentage: 80 },
  { name: "Computer Vision", level: "Intermediate", percentage: 60 },
  { name: "FastAPI", level: "Advanced", percentage: 80 },
  { name: "Docker", level: "Intermediate", percentage: 60 },
  { name: "AWS", level: "Intermediate", percentage: 60 },
];

const marqueeItems = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "React",
  "Node.js",
  "OpenAI",
  "LangChain",
  "Docker",
  "AWS",
  "MongoDB",
  "Git",
  "Linux",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Skill cards stagger in
      skillRefs.current.forEach((skill, i) => {
        if (!skill) return;
        gsap.fromTo(
          skill,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skill,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Progress bars animate
      barRefs.current.forEach((bar) => {
        if (!bar) return;
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
        bar.style.transformOrigin = "left";
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-black border-t border-white/[0.08]"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 pt-12 md:pt-16 pb-[clamp(80px,12vh,160px)]">
        <div className="max-w-[1400px] mx-auto">
          <SectionLabel text="SKILLS" className="mb-6 block" />
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-16">
            Technologies & Tools
          </h2>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0 mb-20">
            {skills.map((skill, i) => (
              <div
                key={skill.name}
                ref={(el) => { skillRefs.current[i] = el; }}
                className="border-b border-white/[0.08] py-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-body text-xl font-semibold text-white">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs uppercase text-orange">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full h-0.5 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    ref={(el) => { barRefs.current[i] = el; }}
                    className="h-full bg-orange rounded-full"
                    style={{
                      width: `${skill.percentage}%`,
                      transform: "scaleX(0)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tech Marquee */}
          <div className="overflow-hidden group">
            <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={`${item}-${i}`}
                  className="font-mono text-sm text-txt-secondary hover:text-white transition-colors duration-200 whitespace-nowrap flex items-center gap-4 px-4"
                >
                  {item}
                  <span className="text-orange">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
