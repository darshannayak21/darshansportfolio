import { Timeline as AceternityTimeline } from "@/components/ui/timeline";

export default function Timeline() {
  const data = [
    {
      title: "January 2024",
      content: (
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            1st Place — Global AI Hackathon
          </h3>
          <p className="font-body text-base md:text-lg text-white/60 mb-8 leading-relaxed">
            Developed 'Neural Canvas', an AI architecture tool, winning 1st place out of 500+ international teams. Awarded $20,000 and featured in TechCrunch.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 1</span>
            </div>
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 2</span>
            </div>
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 3</span>
            </div>
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 4</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "November 2023",
      content: (
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Published Research at NeurIPS
          </h3>
          <p className="font-body text-base md:text-lg text-white/60 mb-8 leading-relaxed">
            First author on 'Efficient Transformer Architectures for Real-Time Mobile Inference'. Presented findings to an audience of 2,000+ researchers.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 1</span>
            </div>
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 2</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "August 2023",
      content: (
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Open Source Contributor of the Year
          </h3>
          <p className="font-body text-base md:text-lg text-white/60 mb-8 leading-relaxed">
            Recognized by the TensorFlow community for critical optimization patches improving mobile deployment speeds by 40%.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 1</span>
            </div>
            <div className="h-24 md:h-44 lg:h-60 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Image 2</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "May 2023",
      content: (
        <div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
            Best Startup Pitch — Tech Disrupt
          </h3>
          <p className="font-body text-base md:text-lg text-white/60 mb-8 leading-relaxed">
            Secured seed funding and the 'Most Innovative MVP' award for building a decentralized emergency response network.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-32 md:h-56 lg:h-80 w-full rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04)]">
              <span className="text-white/20 text-xs uppercase tracking-widest font-mono">Feature Image</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="achievements" className="bg-[#050505] relative w-full overflow-clip">
      <div className="w-full relative z-10">
        <AceternityTimeline data={data} />
      </div>
    </section>
  );
}