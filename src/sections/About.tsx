import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const sentences = [
  "I am an AI engineer who believes technology should feel invisible and intelligence should feel human. I build systems that understand context, learn from interaction, and adapt to the people who use them.",
  "My work lives at the intersection of machine learning and creative problem solving — where algorithms meet aesthetics, and where data-driven decisions are guided by human intuition.",
  "Every project I take on is an opportunity to push boundaries. I don't just write code — I craft experiences that think, learn, and evolve.",
  "Currently focused on building intelligent applications using modern AI frameworks, neural networks, and natural language processing.",
  "Open to collaborations that challenge the status quo.",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const sentenceRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      sentenceRefs.current.forEach((sentence) => {
        if (!sentence) return;

        gsap.fromTo(
          sentence,
          { color: "#555555" },
          {
            color: "#ffffff",
            ease: "none",
            scrollTrigger: {
              trigger: sentence,
              start: "top 80%",
              end: "top 40%",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-[100dvh] flex items-center bg-black"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-[clamp(80px,12vh,160px)]">
        <div className="max-w-[900px] mx-auto lg:mx-0 lg:ml-[10%]">
          <SectionLabel text="ABOUT" className="mb-6 block" />

          <div className="space-y-[1.5em]">
            {sentences.map((sentence, i) => (
              <p
                key={i}
                ref={(el) => { sentenceRefs.current[i] = el; }}
                className="font-body text-[clamp(1.25rem,2.5vw,1.75rem)] font-normal leading-[1.7] transition-colors"
                style={{ color: "#555555" }}
              >
                {sentence}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
