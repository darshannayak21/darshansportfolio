import { Timeline as AceternityTimeline } from "@/components/ui/timeline";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function Timeline() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
  };

  const data = [
    {
      title: "Vishwakarma Institute of Technology",
      content: (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
          <motion.h3 variants={itemVariants} className={`font-display text-2xl md:text-3xl font-bold ${dark ? 'text-white' : 'text-[#000000]'} mb-4 tracking-tight`}>
            1st Place — VIT Code Apex 2.0 National Hackathon
          </motion.h3>
          <motion.p variants={itemVariants} className={`font-body text-base md:text-lg ${dark ? 'text-white/60' : 'text-[#000000]/70'} mb-8 leading-relaxed`}>
            Secured top position among 2,800+ participants as a solo competitor in a 24-hour national hackathon, evaluated by industry judges from Google and Figma.
          </motion.p>
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className={`h-24 md:h-44 lg:h-60 w-full rounded-lg ${dark ? 'bg-white/5 border-white/10 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]' : 'bg-[#ffffff] border-black/10 shadow-md'} border flex items-center justify-center overflow-hidden`}>
              <img src="/images/timeline/vit1.webp" alt="VIT Code Apex 1" className="w-full h-full object-cover" />
            </div>
            <div className={`h-24 md:h-44 lg:h-60 w-full rounded-lg ${dark ? 'bg-white/5 border-white/10 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]' : 'bg-[#ffffff] border-black/10 shadow-md'} border flex items-center justify-center overflow-hidden`}>
              <img src="/images/timeline/vit2.webp" alt="VIT Code Apex 2" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      ),
    },
    {
      title: "MCOE",
      content: (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
          <motion.h3 variants={itemVariants} className={`font-display text-2xl md:text-3xl font-bold ${dark ? 'text-white' : 'text-[#000000]'} mb-4 tracking-tight`}>
            1st Place — Pragyantara National Hackathon
          </motion.h3>
          <motion.p variants={itemVariants} className={`font-body text-base md:text-lg ${dark ? 'text-white/60' : 'text-[#000000]/70'} mb-8 leading-relaxed`}>
            Awarded first place among 800+ participants, demonstrating technical excellence and competitive problem-solving at a national level.
          </motion.p>
          <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4">
            <div className={`h-32 md:h-56 lg:h-80 w-full rounded-lg ${dark ? 'bg-white/5 border-white/10 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]' : 'bg-[#ffffff] border-black/10 shadow-md'} border flex items-center justify-center overflow-hidden`}>
              <img src="/images/timeline/pragya.webp" alt="Pragyantara Hackathon" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      ),
    },
    {
      title: "Symbiosis Institute of Technology",
      content: (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
          <motion.h3 variants={itemVariants} className={`font-display text-2xl md:text-3xl font-bold ${dark ? 'text-white' : 'text-[#000000]'} mb-4 tracking-tight`}>
            3rd Place — National Project Expo
          </motion.h3>
          <motion.p variants={itemVariants} className={`font-body text-base md:text-lg ${dark ? 'text-white/60' : 'text-[#000000]/70'} mb-8 leading-relaxed`}>
            Recognized for building a highly impactful, production-ready project that demonstrated exceptional real-world utility and feasibility among thousands of national-level participants.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-4">
            <img src="/images/timeline/SIT.webp" alt="National Project Expo" className="w-full md:w-3/4 lg:w-2/3 h-auto rounded-2xl shadow-lg object-contain" />
          </motion.div>
        </motion.div>
      ),
    },
    {
      title: "Pune Institute of Computer Technology",
      content: (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
          <motion.h3 variants={itemVariants} className={`font-display text-2xl md:text-3xl font-bold ${dark ? 'text-white' : 'text-[#000000]'} mb-4 tracking-tight`}>
            3rd Place — TechFiesta InC, Impetus & Concepts
          </motion.h3>
          <motion.p variants={itemVariants} className={`font-body text-base md:text-lg ${dark ? 'text-white/60' : 'text-[#000000]/70'} mb-8 leading-relaxed`}>
            Awarded for outstanding technical innovation and solution design among 2,400+ participants across India.
          </motion.p>
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className={`h-24 md:h-44 lg:h-60 w-full rounded-lg ${dark ? 'bg-white/5 border-white/10 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]' : 'bg-[#ffffff] border-black/10 shadow-md'} border flex items-center justify-center overflow-hidden`}>
              <img src="/images/timeline/pict1.webp" alt="TechFiesta InC 1" className="w-full h-full object-cover" />
            </div>
            <div className={`h-24 md:h-44 lg:h-60 w-full rounded-lg ${dark ? 'bg-white/5 border-white/10 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]' : 'bg-[#ffffff] border-black/10 shadow-md'} border flex items-center justify-center overflow-hidden`}>
              <img src="/images/timeline/pict2.webp" alt="TechFiesta InC 2" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>
      ),
    },
  ];

  return (
    <section id="achievements" className={`${dark ? 'bg-[#050505]' : 'bg-[#f8f8f8]'} relative w-full overflow-clip`}>
      <div className="w-full relative z-10">
        <AceternityTimeline data={data} />
      </div>
    </section>
  );
}