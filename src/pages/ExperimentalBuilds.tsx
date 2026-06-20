import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useTheme } from "@/components/ThemeProvider";

export default function ExperimentalBuilds() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div className={`${dark ? 'bg-[#1c1c1c] text-white' : 'bg-[#f8f8f8] text-black'} min-h-screen relative p-6 md:p-12 overflow-hidden`}>
      {/* Back Button */}
      <Link 
        to="/#work" 
        className={`fixed top-6 right-6 z-[100] group flex items-center justify-center gap-2 ${dark ? 'bg-[#1d1d1f]/80 hover:bg-[#2c2c2e]/80 text-white border-white/[0.08]' : 'bg-[#ffffff]/80 hover:bg-[#f5f5f7]/80 text-[#1d1d1f] border-black/[0.04] shadow-[0_4px_14px_rgba(0,0,0,0.05)]'} backdrop-blur-2xl border px-4 py-2 rounded-full font-body text-[14px] font-medium transition-all duration-300 active:scale-95`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-0.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span>Back</span>
      </Link>

      <div className="max-w-[1400px] mx-auto pt-24 md:pt-32">
        <h1 className={`font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold ${dark ? 'text-white' : 'text-black'} mb-6 tracking-tight`}>
          Experimental Builds
        </h1>
        <div className="w-20 h-1 bg-[#ff5500] mb-12"></div>
        
        {/* Project Grid - 3 in a row, smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-20 justify-items-center">
          
          {/* Card 1: Rapid Crisis Response */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                Rapid Crisis Platform
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Developed an event-driven emergency response platform bridging custom IoT panic buttons with a Gemini AI backend. Processes hardware payloads in milliseconds, utilizing Vertex AI for pattern analysis and Gemini for instant context generation. Features real-time Socket.io dashboards and zero-latency Firebase dispatch.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/rapid.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="Rapid Crisis Dashboard"
                />
              </CardItem>
              <div className="flex justify-end items-center mt-6 shrink-0">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-5 py-2.5 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  View GitHub
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

          {/* Card 2: BlueTrust AI */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                BlueTrust AI
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Architected an AI-driven satellite monitoring platform leveraging Sentinel-2 imagery and temporal ML models to track ecological restoration. The system dynamically computes NDVI improvements to classify vegetation health. A blockchain verification layer anchors all environmental gains, ensuring an immutable audit trail for ESG reporting.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/blue.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="BlueTrust Dashboard"
                />
              </CardItem>
              <div className="flex justify-end items-center mt-6 shrink-0">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-5 py-2.5 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  View GitHub
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          
          {/* Card 3: SAHS RAG */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                SAHS RAG
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Engineered a Self-Adaptive Hybrid Search RAG architecture that dynamically assesses query complexity before retrieval. Blends dense semantic vector search with sparse BM25 keyword matching to maximize recall and precision. Incorporates an LLM routing layer to autonomously select retrieval strategies before cross-encoder reranking.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/rag.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="SAHS RAG Architecture"
                />
              </CardItem>
              <div className="flex justify-end items-center mt-6 shrink-0">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="#"
                  className="px-5 py-2.5 rounded-full bg-[#ff5500] text-black text-xs font-bold hover:bg-white transition-colors"
                >
                  View GitHub
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>

        </div>
      </div>
    </div>
  );
}
