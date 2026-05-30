"use client";

const ICONS_ROW1 = [
  "https://cdn-icons-png.flaticon.com/512/5968/5968854.png",
  "https://cdn-icons-png.flaticon.com/512/732/732221.png",
  "https://cdn-icons-png.flaticon.com/512/733/733609.png",
  "https://cdn-icons-png.flaticon.com/512/732/732084.png",
  "https://cdn-icons-png.flaticon.com/512/733/733585.png",
  "https://cdn-icons-png.flaticon.com/512/281/281763.png",
  "https://cdn-icons-png.flaticon.com/512/888/888879.png",
];

const ICONS_ROW2 = [
  "https://cdn-icons-png.flaticon.com/512/174/174857.png",
  "https://cdn-icons-png.flaticon.com/512/906/906324.png",
  "https://cdn-icons-png.flaticon.com/512/888/888841.png",
  "https://cdn-icons-png.flaticon.com/512/5968/5968875.png",
  "https://cdn-icons-png.flaticon.com/512/906/906361.png",
  "https://cdn-icons-png.flaticon.com/512/732/732190.png",
  "https://cdn-icons-png.flaticon.com/512/888/888847.png",
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
          animation: scroll-left 15s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 15s linear infinite;
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
