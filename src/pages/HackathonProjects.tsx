import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

export default function HackathonProjects() {
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
          Hackathon Winning Projects
        </h1>
        <div className="w-20 h-1 bg-black mb-12"></div>
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-20 justify-items-center">
          
          {/* Card 1: STELLA */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                STELLA: Nurse Robot
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Architected a personalized robotic care system bridging hospital discharge and home recovery. Utilizes real-time facial analysis and biometric streaming (SpO2/HR) to detect patient distress and track 24+ physiotherapy exercises. Features automated health logging and a fully integrated Doctor & Guardian app ecosystem.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/stella.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="STELLA Dashboard"
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

          {/* Card 2: Shrimati Setu */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                Shrimati Setu
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Architected a dual-component personal safety solution (mobile app + embedded wearable). Features shake-to-trigger SOS, voice command activation, and real-time chunked audio-video cloud streaming. The standalone hardware beacon utilizes satellite GPS and automated SMS/call spamming to guarantee distress signal delivery even without cellular networks.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/shrimati.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="Shrimati Setu Device"
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

          {/* Card 3: ReMotion AI */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                ReMotion AI
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Engineered a computer vision-powered physiotherapy assistant delivering real-time biomechanical feedback and posture correction. Utilizing any smartphone camera, the system allows clinicians to deploy customized rehabilitation routines, tracking remote patient adherence through scalable cloud infrastructure and multilingual interaction.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/remotion.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="ReMotion Interface"
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
