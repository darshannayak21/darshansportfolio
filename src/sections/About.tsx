import { TextRevealByWord } from "@/components/ui/text-reveal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

export default function About() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <section
      id="about"
      className={`flex flex-col ${dark ? 'bg-black' : 'bg-[#f8f8f8]'}`}
    >
      {/* ── Text Reveal Area ── */}
      <div className="w-full">
        <div className="max-w-[1400px] mx-auto lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-center w-full pt-24 pb-0 -mb-16 px-6 md:px-12 lg:px-0 relative z-10"
          >
            <h2 className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-bold ${dark ? 'text-white' : 'text-black'}`}>
              About Me
            </h2>
          </motion.div>
          <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-16 px-6 md:px-12 lg:px-0">
            {/* Left side — Text Reveal */}
            <div className="w-full lg:w-[58%]">
              <TextRevealByWord
                text="I build intelligent systems that blend machine learning, intuitive design, and scalable architecture to create experiences that stand out."
                className="h-[200vh] lg:h-[150vh]"
                header={
                  <div className="flex lg:hidden flex-col items-center pt-32 pb-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h2 className={`font-display text-[clamp(2rem,5vw,3rem)] font-bold ${dark ? 'text-white' : 'text-black'} mb-4`}>
                        About Me
                      </h2>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full max-w-[260px] overflow-hidden rounded-none"
                    >
                      <img
                        src="/darshan.png"
                        alt="Darshan Nayak"
                        className="w-full h-auto object-cover grayscale"
                      />
                    </motion.div>
                  </div>
                }
              />
            </div>

            {/* Left side — Photo (desktop only, sticky) */}
            <div className="hidden lg:flex w-full lg:w-[42%] sticky top-0 h-screen items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[380px] overflow-hidden rounded-none"
              >
                <img
                  src="/darshan.png"
                  alt="Darshan Nayak"
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bento Grid ── */}
      <div id="bento-grid" className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]">

          {/* Research & Exploration */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-1 md:row-span-1"
          >
            <Link to="/moreabout#more-about" className={`bento-hover h-full w-full group relative overflow-hidden rounded-[2rem] border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] block ${dark ? 'bg-[#0A0A0A] border-white/[0.04] hover:border-white/[0.08]' : 'bg-[#f0f0f0] border-black/[0.06] hover:border-black/[0.12]'}`}>
              <div className="relative z-10">
                <h3 className={`font-display text-2xl font-bold mb-2 leading-tight ${dark ? 'text-white' : 'text-gray-900'}`}>More about<br />Me!</h3>
                <p className={`font-body text-sm ${dark ? 'text-white/60' : 'text-gray-600'}`}>Beyond code: Art, Sports & Global upbringing</p>
              </div>
              <div className={`relative z-10 w-10 h-10 rounded-full border flex items-center justify-center self-end transition-colors duration-300 ${dark ? 'border-white/10 group-hover:bg-white/10' : 'border-black/10 group-hover:bg-black/5'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dark ? 'text-white' : 'text-gray-900'}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>
          </motion.div>

          {/* Current Interests */}
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-1 md:row-span-1"
          >
            <Link to="/moreabout#interests" className={`bento-hover h-full w-full group relative overflow-hidden rounded-[2rem] border p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] block ${dark ? 'bg-[#121212] border-white/[0.04] hover:border-white/[0.08]' : 'bg-[#e8e8e8] border-black/[0.06] hover:border-black/[0.12]'}`}>
              <div className="relative z-10">
                <h3 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Current Interests</h3>
                <p className={`font-body text-sm ${dark ? 'text-white/60' : 'text-gray-600'}`}>AI Memory, Human-Centered Systems & Vision</p>
              </div>
              <div className={`absolute z-10 bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${dark ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dark ? 'text-white' : 'text-gray-900'}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>
          </motion.div>

          {/* Work Experience - Biggest Box */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-2 md:row-span-2"
          >
            <Link to="/moreabout#work" className={`bento-hover h-full w-full group relative overflow-hidden rounded-[2rem] border p-8 md:p-10 flex flex-col justify-end transition-all duration-300 hover:scale-[1.02] block ${dark ? 'bg-[#1A1A1A] border-white/[0.04] hover:border-white/[0.08]' : 'bg-[#e0e0e0] border-black/[0.06] hover:border-black/[0.12]'}`}>
              <div className="relative z-10">
                <h3 className={`font-display text-4xl md:text-5xl font-bold mb-3 ${dark ? 'text-white' : 'text-gray-900'}`}>Work Experience</h3>
                <p className={`font-body text-lg max-w-sm ${dark ? 'text-white/60' : 'text-gray-600'}`}>Internships, Published Research & 10+ Hackathons.</p>
              </div>
              <div className={`absolute z-10 top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${dark ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dark ? 'text-white' : 'text-gray-900'}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>
          </motion.div>

          {/* My Journey */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-2 md:row-span-1"
          >
            <Link to="/moreabout#journey" className={`bento-hover h-full w-full group relative overflow-hidden rounded-[2rem] border p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] block ${dark ? 'bg-[#222222] border-white/[0.04] hover:border-white/[0.08]' : 'bg-[#d8d8d8] border-black/[0.06] hover:border-black/[0.12]'}`}>
              <div className="relative z-10">
                <h3 className={`font-display text-3xl font-bold mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>My Journey</h3>
                <p className={`font-body ${dark ? 'text-white/70' : 'text-gray-600'}`}>A global education shaping a passion for Artificial Intelligence.</p>
              </div>
              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center self-end transition-colors duration-300 ${dark ? 'bg-white/5 group-hover:bg-white/10' : 'bg-black/5 group-hover:bg-black/10'}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={dark ? 'text-white' : 'text-gray-900'}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}