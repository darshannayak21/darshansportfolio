import { useRef } from "react";
import IntegrationHero from "@/components/ui/integration-hero";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-[#ff5500] border-t border-black/10 overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-[clamp(80px,12vh,120px)]">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <div className="flex justify-center mb-8">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-black">
              // SKILLS
            </span>
          </div>

          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-black mb-8">
            Expertise
          </h2>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-black/80 font-body leading-relaxed mb-16">
            I build intelligent digital experiences at the intersection of AI, full-stack development, and embedded systems. My work combines machine learning, modern web technologies, electronics, and UI/UX design to create scalable, data-driven, and user-focused solutions.

With experience across Python, React, Node.js, TensorFlow, IoT, and data visualization, I enjoy developing systems that merge functionality, performance, and thoughtful design into impactful real-world applications.


          </p>

          {/* Integration Hero Component */}
          <div className="w-full">
            <IntegrationHero />
          </div>
          
        </div>
      </div>
    </section>
  );
}
