import SectionLabel from "@/components/SectionLabel";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="flex flex-col bg-black"
    >
      {/* ── Text Reveal Area ── */}
      <div className="w-full">
        <div className="max-w-[1400px] mx-auto lg:px-20">
          <div className="hidden lg:flex justify-center w-full pt-40 pb-0 -mb-8 px-6 md:px-12 lg:px-0 relative z-10">
            <SectionLabel text="ABOUT ME" className="block text-center" />
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-16 px-6 md:px-12 lg:px-0">
            {/* Left side — Text Reveal */}
            <div className="w-full lg:w-[58%]">
              <TextRevealByWord
                text="I build intelligent systems that blend machine learning, intuitive design, and scalable architecture to create experiences that stand out."
                className="h-[200vh] lg:h-[150vh]"
                header={
                  <div className="flex lg:hidden flex-col items-center pt-32 pb-0">
                    <SectionLabel text="ABOUT ME" className="mb-1 block" />
                    <div className="w-full max-w-[220px] overflow-hidden">
                      <img
                        src="/darshan.png"
                        alt="Darshan Nayak"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                }
              />
            </div>

            {/* Left side — Photo (desktop only, sticky) */}
            <div className="hidden lg:flex w-full lg:w-[42%] sticky top-0 h-screen items-center justify-center">
              <div className="w-full max-w-[380px] overflow-hidden">
                <img
                  src="/darshan.png"
                  alt="Darshan Nayak"
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
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
            <Link to="/moreabout#more-about" className="h-full w-full group relative overflow-hidden rounded-[2rem] bg-[#1e4620] p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] block">
              <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">More about<br/>Me!</h3>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center self-end group-hover:bg-white/10 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
            <Link to="/moreabout#interests" className="h-full w-full group relative overflow-hidden rounded-[2rem] bg-[#1d4ed8] p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] block">
              <h3 className="font-display text-2xl font-bold text-white mb-2">Current Interests</h3>
              <p className="font-body text-sm text-white/60">Creative Coding,<br/>Gen AI & Design</p>
              <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
            <Link to="/moreabout#work" className="h-full w-full group relative overflow-hidden rounded-[2rem] bg-orange p-8 md:p-10 flex flex-col justify-end transition-transform duration-300 hover:scale-[1.02] block">
              <div className="relative z-10">
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Work Experience</h3>
                <p className="font-body text-white/90 text-lg max-w-sm">Building intelligent systems for production environments.</p>
              </div>
              <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
            <Link to="/moreabout#journey" className="h-full w-full group relative overflow-hidden rounded-[2rem] bg-white p-8 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02] block">
              <div>
                <h3 className="font-display text-3xl font-bold text-black mb-2">My Journey</h3>
                <p className="font-body text-black/70">From a curious student to an AI engineer pushing boundaries.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center self-end group-hover:bg-black/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}