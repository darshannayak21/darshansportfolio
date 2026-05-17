import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function AiSystems() {
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
          AI & Intelligent Systems
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
                Neural Canvas V2
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-2 line-clamp-3 shrink-0"
              >
                A generative AI platform leveraging custom Stable Diffusion models to create hyper-realistic architectural renderings from simple text prompts.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4 flex-1 min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2560&auto=format&fit=crop"
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
                  View Case Study →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  Live Demo
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
                Sentinel NLP
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-2 line-clamp-3 shrink-0"
              >
                Real-time sentiment analysis engine processing millions of social media streams concurrently with sub-second latency using fine-tuned BERT models.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4 flex-1 min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop"
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
                  View GitHub →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  Documentation
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
                Visionary AI
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-2 line-clamp-3 shrink-0"
              >
                Advanced computer vision framework for autonomous drone navigation in complex indoor environments.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4 flex-1 min-h-0">
                <img
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop"
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
                  View Case Study →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  Live Demo
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

        </div>
      </div>
    </div>
  );
}
