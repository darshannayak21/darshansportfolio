import { useRef } from "react";
import { motion } from "framer-motion";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  const slideUpVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      skills: [
        "Python",
        "TensorFlow / Keras",
        "PyTorch",
        "Computer Vision (OpenCV, YOLOv8)",
        "NLP & RAG Architectures",
        "Deep Learning & CNNs",
        "Gemini AI / Vertex AI",
      ],
    },
    {
      title: "Web & Full-Stack",
      skills: [
        "React / Next.js",
        "Node.js / Express",
        "JavaScript / TypeScript",
        "Firebase / Supabase",
        "REST APIs / Socket.io",
        "MongoDB / PostgreSQL",
      ],
    },
    {
      title: "Systems & Tools",
      skills: [
        "IoT & Embedded Systems",
        "Git / GitHub",
        "Docker",
        "Figma / UI Design",
        "Cloud Deployment",
        "Linux / Shell",
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="border-t overflow-hidden bg-[#161617] border-[#ffffff]/10"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 pt-12 md:pt-24 pb-[clamp(60px,10vh,120px)]">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            variants={slideUpVariants}
            className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8 mb-8 md:mb-12"
          >
            <h2 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-semibold text-[#ffffff] tracking-tight">
              Tools of the trade.
            </h2>
            <p className="text-[#ffffff]/50 font-body text-sm md:text-base">
              Technologies and frameworks I use to build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                variants={slideUpVariants}
                className="flex flex-col"
              >
                <h3 className="font-display text-sm md:text-base font-semibold text-[#ffffff] tracking-wide mb-2 md:mb-3">
                  {category.title}
                </h3>
                <div className="w-full h-px bg-[#ffffff]/10 mb-4 md:mb-6"></div>
                <ul className="space-y-2 md:space-y-3">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="font-body text-xs md:text-sm text-[#ffffff]/80"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
