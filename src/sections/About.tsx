import SectionLabel from "@/components/SectionLabel";

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center bg-black py-24"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 mb-12">
        <div className="max-w-[900px] mx-auto text-center">
          <SectionLabel text="ABOUT ME" className="mb-8 mx-auto block" />
          <p
            className="text-[clamp(1.1rem,2vw,1.5rem)] font-light leading-[1.7] text-white/70 max-w-[700px] mx-auto"
            style={{ fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}
          >
            I build intelligent systems that blend machine learning, intuitive design, and scalable architecture to create experiences that stand out.
          </p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px]">
          
          {/* Work Experience - Biggest Box */}
          <a href="#" className="col-span-1 md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-orange p-8 md:p-10 flex flex-col justify-end transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative z-10">
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">Work Experience</h3>
              <p className="font-body text-white/90 text-lg max-w-sm">Building intelligent systems for production environments.</p>
            </div>
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/40 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </a>

          {/* My Journey */}
          <a href="#" className="col-span-1 md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-white p-8 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
            <div>
              <h3 className="font-display text-3xl font-bold text-black mb-2">My Journey</h3>
              <p className="font-body text-black/70">From a curious student to an AI engineer pushing boundaries.</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center self-end group-hover:bg-black/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </a>

          {/* Research & Exploration */}
          <a href="#" className="col-span-1 md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-[#1e4620] p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight">Research &<br/>Exploration</h3>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center self-end group-hover:bg-white/10 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </a>

          {/* Current Interests */}
          <a href="#" className="col-span-1 md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-[#2a2a2a] p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="font-display text-2xl font-bold text-white mb-2">Current Interests</h3>
            <p className="font-body text-sm text-white/60">Creative Coding,<br/>Gen AI & Design</p>
            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
