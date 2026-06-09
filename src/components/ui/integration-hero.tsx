"use client";

const ICONS_ROW1 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
];

const ICONS_ROW2 = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
];

// Utility to repeat icons enough times
const repeatedIcons = (icons: string[], repeat = 4) => Array.from({ length: repeat }).flatMap(() => icons);

export default function IntegrationHero() {
  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden bg-transparent">
      {/* Carousel */}
      <div className="overflow-hidden relative pb-2 w-full max-w-[100vw]">
        {/* Row 1 */}
        <div className="flex gap-6 md:gap-10 whitespace-nowrap animate-scroll-left">
          {repeatedIcons(ICONS_ROW1, 4).map((src, i) => (
            <div key={i} className="h-14 w-14 md:h-20 md:w-20 flex-shrink-0 rounded-full bg-white shadow-xl shadow-black/10 flex items-center justify-center">
              <img src={src} alt="icon" className="h-7 w-7 md:h-10 md:w-10 object-contain" />
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-6 md:gap-10 whitespace-nowrap mt-6 md:mt-8 animate-scroll-right">
          {repeatedIcons(ICONS_ROW2, 4).map((src, i) => (
            <div key={i} className="h-14 w-14 md:h-20 md:w-20 flex-shrink-0 rounded-full bg-white shadow-xl shadow-black/10 flex items-center justify-center">
              <img src={src} alt="icon" className="h-7 w-7 md:h-10 md:w-10 object-contain" />
            </div>
          ))}
        </div>

        {/* Fade overlays using #ff5500 to match the Skills section background */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#ff5500] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#ff5500] to-transparent pointer-events-none" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 6s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 6s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }
        }
      ` }} />
    </div>
  );
}
