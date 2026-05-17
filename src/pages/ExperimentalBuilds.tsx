import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ExperimentalBuilds() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#ff5500] text-black min-h-screen relative p-6 md:p-12 overflow-hidden">
      {/* Back Button */}
      <Link 
        to="/#work" 
        className="fixed top-6 right-6 z-[100] group flex items-center justify-center gap-2 bg-black/10 hover:bg-black/20 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-black/10 px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black group-hover:-translate-x-1 transition-all duration-300"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span className="text-black transition-colors duration-300 font-bold">Back</span>
      </Link>

      <div className="max-w-[1400px] mx-auto pt-24 md:pt-32">
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-black mb-6 tracking-tight">
          Experimental Builds
        </h1>
        <div className="w-20 h-1 bg-black mb-12"></div>
        
        {/* Project Grid - 3 in a row, smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-20 justify-items-center">
          
          {/* Card 1 */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[30rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                Holographic Web
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-2 line-clamp-3 shrink-0"
              >
                An experiment using Three.js and WebGL to create purely interactive 3D particle systems responding to user webcam input in real-time.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4 flex-1 min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2560&auto=format&fit=crop"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-6 shrink-0">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-3 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white transition-colors"
                >
                  View Source →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  Launch Lab
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 2 */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[30rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                Neuromorphic UI
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-2 line-clamp-3 shrink-0"
              >
                Exploring the boundaries of framer-motion physics combined with deep-glassmorphism. A purely aesthetic exploration into the future of UI design.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4 flex-1 min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2560&auto=format&fit=crop"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-6 shrink-0">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-3 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white transition-colors"
                >
                  Read Medium Post →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  Preview Component
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          
          {/* Card 3 */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[30rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                Physics Engine TS
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-2 line-clamp-3 shrink-0"
              >
                A lightweight 2D rigid-body physics engine built entirely from scratch in TypeScript for highly performant canvas animations.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4 flex-1 min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2560&auto=format&fit=crop"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-6 shrink-0">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-3 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white transition-colors"
                >
                  View Code →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  Play Sandbox
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

        </div>
      </div>
    </div>
  );
}
