import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function ExperimentalBuilds() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen relative p-6 md:p-12">
      {/* Back Button */}
      <Link 
        to="/#work" 
        className="fixed top-6 right-6 z-[100] group flex items-center justify-center gap-2 bg-[#0a0a0a]/60 hover:bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#ff5500] group-hover:-translate-x-1 transition-all duration-300"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span className="text-white group-hover:text-[#ff5500] transition-colors duration-300">Back</span>
      </Link>

      <div className="max-w-5xl mx-auto pt-32">
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-white mb-8 tracking-tight">
          Experimental Builds
        </h1>
        <div className="w-20 h-1 bg-[#ff5500] mb-12"></div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-20">
          
          {/* Card 1 */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full sm:w-[32rem] h-[36rem] rounded-xl p-8 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-2xl font-bold text-white"
              >
                Holographic Web
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/50 text-base max-w-sm mt-3"
              >
                An experiment using Three.js and WebGL to create purely interactive 3D particle systems responding to user webcam input in real-time.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-6 flex-1">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2560&auto=format&fit=crop"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  View Source →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-6 py-2 rounded-full bg-[#ff5500] text-black text-sm font-bold hover:bg-[#ff7733] transition-colors"
                >
                  Launch Lab
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 2 */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full sm:w-[32rem] h-[36rem] rounded-xl p-8 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-2xl font-bold text-white"
              >
                Neuromorphic UI
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/50 text-base max-w-sm mt-3"
              >
                Exploring the boundaries of framer-motion physics combined with deep-glassmorphism. A purely aesthetic exploration into the future of UI design.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-6 flex-1">
                <img
                  src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2560&auto=format&fit=crop"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Read Medium Post →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-6 py-2 rounded-full bg-[#ff5500] text-black text-sm font-bold hover:bg-[#ff7733] transition-colors"
                >
                  Preview Component
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

        </div>
      </div>
    </div>
  );
}
