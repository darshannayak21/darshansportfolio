import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
export default function AiSystems() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div className="bg-[#f8f8f8] text-black min-h-screen relative p-6 md:p-12 overflow-hidden">
      {/* Back Button */}
      <Link
        to="/#work"
        className="fixed top-6 right-6 z-[100] group flex items-center justify-center gap-2 bg-[#ffffff]/80 hover:bg-[#f5f5f7]/80 text-[#1d1d1f] border-black/[0.04] shadow-[0_4px_14px_rgba(0,0,0,0.05)] backdrop-blur-2xl border px-4 py-2 rounded-full font-body text-[14px] font-medium transition-all duration-300 active:scale-95"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </Link>

      <div className="max-w-[1400px] mx-auto pt-24 md:pt-32">
        <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-black mb-6 tracking-tight">
          AI & Intelligent Systems
        </h1>
        <div className="w-20 h-1 bg-[#ff5500] mb-12"></div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-20 justify-items-center">
          {/* Card 1: RainGuard */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                RainGuard
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Engineered India's first real-time flood navigation system for
                urban resilience. Fuses live data from thousands of satellite
                radars, IMD weather stations, and NASA elevation models to
                predict flood zones. Integrates real-time crowd traffic,
                historical data, and live news scraping to optimize safe routing
                for emergency services and daily commuters.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/rain.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="RainGuard Navigation Dashboard"
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

          {/* Card 2: ApexNet F1 Intelligence */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                ApexNet F1 Intelligence
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Architected a live F1 race prediction system utilizing a
                multi-model stacking ensemble and attention-based LSTMs. Ingests
                real-time FastF1 telemetry—engineering 55+ features including
                track temperatures and degradation slopes—to forecast finishing
                positions, optimal pit windows, and lap times with 85% accuracy.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/f1.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="F1 Race Prediction Dashboard"
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

          {/* Card 3: TrafficGuard AI */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                TrafficGuard AI
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Engineered a real-time computer vision system for traffic
                enforcement and safety compliance. Deploys advanced deep
                learning to detect helmetless riders and red-light violations
                with high accuracy. Integrates ALPR to extract license plates,
                feeding categorized data and photographic evidence into a
                centralized police dashboard for seamless verification.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/helmet.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="TrafficGuard AI Dashboard"
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

          {/* Card 4: VisionGuard AI */}
          <CardContainer className="inter-var w-full">
            <CardBody className="bg-[#0a0a0a] relative group/card shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/80 border-white/[0.1] w-full max-w-[24rem] h-[34rem] rounded-2xl p-6 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white shrink-0"
              >
                VisionGuard AI
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-white/60 text-sm max-w-sm mt-3 shrink-0 leading-relaxed"
              >
                Engineered a high-performance real-time object detection
                architecture using YOLOv8 and deep CNNs. Employs multi-level
                feature extraction and anchor-free detection for rapid drone and
                human tracking, optimized via GPU acceleration for
                mission-critical outdoor environments.
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-5 flex-1 min-h-0">
                <img
                  src="/images/projects/drone.webp"
                  className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="VisionGuard AI Drone Tracking"
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
