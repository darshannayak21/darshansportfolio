import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function MoreAbout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // If there's a specific hash other than the first section, scroll to it
    if (location.hash && location.hash !== '#more-about') {
      // Small timeout to ensure DOM is ready and layout is settled
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const topPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: topPosition, behavior: 'instant' });
        }
      }, 50);
    } else {
      // Force absolute top for the first section to avoid layout offset glitches
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location]);

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Scroll Indicator */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 animate-bounce-subtle"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
      </div>

      {/* Back Button */}
      <Link
        to="/#bento-grid"
        className="fixed top-6 right-6 z-[100] group flex items-center justify-center gap-2 bg-[#0a0a0a]/60 hover:bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#ff5500] group-hover:-translate-x-1 transition-all duration-300"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        <span className="text-white group-hover:text-[#ff5500] transition-colors duration-300">Back</span>
      </Link>

      <FlowArt aria-label="More About Sections">

        {/* More About Me! Section */}
        <FlowSection
          id="more-about"
          aria-label="More About Me!"
          className="min-h-[150vh] md:min-h-[200vh] relative"
          style={{ backgroundColor: '#1e4620', color: '#fff' }}
        >
          {/* Sticky Visual Container */}
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">

            {/* Yellow Circle */}
            <div className="absolute w-[75vw] h-[75vw] max-w-[450px] max-h-[450px] lg:max-w-[600px] lg:max-h-[600px] rounded-full bg-[#facc15]" />

            {/* Profile Image */}
            <img
              src="/sideprofile.PNG"
              alt="Darshan Side Profile"
              className="absolute z-10 w-auto h-[60vh] md:h-[80vh] lg:h-[90vh] object-contain object-bottom bottom-0 filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
            />

            {/* Typography Overlays */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 lg:p-20">
              <div className="mt-16 md:mt-0 pt-12 md:pt-0">
                <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-display font-bold leading-[0.9] uppercase tracking-tight text-white mix-blend-difference">
                  More<br />About<br />Me!
                </h1>
              </div>
              <div className="absolute bottom-6 right-6 md:bottom-auto md:right-12 lg:right-20 md:top-1/2 md:-translate-y-1/2 text-right">
                <h2 className="text-[clamp(3rem,10vw,9rem)] font-display font-bold leading-[0.8] tracking-tighter text-white mix-blend-difference">
                  Driven<br />by<br />Curiosity
                </h2>
              </div>
            </div>
          </div>

          {/* Scrolling content */}
          <div className="relative z-30 w-full px-5 md:px-12 pb-20 md:pb-32 mt-0 pt-8 md:pt-16 pointer-events-auto">

            {/* Stylish "More About Me" Paragraphs */}
            <div className="w-full max-w-5xl mx-auto text-center mb-12 md:mb-16 space-y-6 md:space-y-8 text-white/80 font-body text-sm md:text-lg lg:text-xl leading-relaxed">
              <p>
                Growing up across three countries — Phnom Penh, Singapore, and Pune — taught me to adapt fast and think differently. That global upbringing combined with an obsession for technology pushed me toward building things that actually matter, from embedded circuits to intelligent AI systems. I don't just write code — I engineer experiences. Whether it's a computer vision rehabilitation assistant, an AI memory architecture, or a full-stack web platform, every system I build is driven by one question: does this actually solve something real?
              </p>
              <p>
                Four national hackathon wins, a published research paper, and a filed patent — all before finishing my degree. I'm not waiting to be ready. I'm learning by shipping, pushing boundaries, and figuring things out faster than most. I believe the most powerful technology is the kind that disappears into the background and just works. My goal is to build intelligent systems that are so well designed, so thoughtful, that they feel less like software and more like a natural extension of how people live and work.
              </p>
            </div>

            {/* Split Layout: Football on left, Text on right */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-16 lg:gap-24 relative z-20">
              {/* Left Side: Football Image */}
              <div className="w-full md:w-[45%] flex justify-center md:justify-start -mt-[64px] md:-mt-[64px] lg:-mt-[200px]">
                <img
                  src="/football.PNG"
                  alt="Football"
                  className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] scale-110 md:scale-[1.3] lg:scale-[1.4] origin-bottom"
                />
              </div>
              {/* Right Side: Hobbies Text */}
              <div className="w-full md:w-[55%] flex flex-col justify-center">
                <div className="bg-[#0a0a0a]/40 backdrop-blur-md border border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 tracking-tight">
                    Beyond Code
                  </h3>
                  <div className="space-y-3 md:space-y-4 text-white/80 font-body text-sm md:text-lg leading-relaxed">
                    <p>
                      When I'm not building intelligent systems, you'll find me on the pitch or mid-run. Football and long distance running are how I reset, stay sharp, and think clearly.
Music is a big part of my life too — I play drums, piano, guitar, ukulele, and harmonica. I just love the process of picking something up and figuring it out from scratch.
                    </p>
                    <p>
                     Away from screens, I create with my hands. I'm a national award-winning sculptor and spend a lot of time drawing realistic portraits — the precision and patience that art demands feeds directly into how I approach engineering.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </FlowSection>

        {/* Current Interests Section */}
        <FlowSection
          id="interests"
          aria-label="Current Interests"
          className="min-h-[150vh] md:min-h-[200vh]"
          style={{ backgroundColor: '#1d4ed8', color: '#fff' }}
        >
          <div className="flex flex-col pt-12 md:pt-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight mb-10 md:mb-16">
              Current<br />Interests
            </h1>
            
            {/* 2-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 w-full">
              
              {/* Left Column: Philosophy & Progress Bars */}
              <div className="flex flex-col space-y-8 md:space-y-12">
                <p className="font-body text-base md:text-xl lg:text-2xl font-medium leading-snug text-white/90">
                  AI shouldn't replicate us — it should extend us. I build systems that understand humans deeply enough to fill the gaps we can't fill ourselves. That belief drives everything I research and build.
                </p>
                
                <div className="space-y-5 lg:space-y-6">
                  {[
                    { label: "DSA & Problem Solving", percent: 75 },
                    { label: "Web Development", percent: 85 },
                    { label: "AI & Machine Learning", percent: 80 },
                    { label: "Computer Vision", percent: 78 }
                  ].map((skill, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between font-display text-sm md:text-base font-bold tracking-wide uppercase text-white/90">
                        <span>{skill.label}</span>
                        <span>{skill.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${skill.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Topic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { title: "AI Memory & Knowledge Graphs", desc: "Researching how agents store, reason and retrieve across disconnected information domains." },
                  { title: "Human-Centered AI Systems", desc: "Building AI that understands human context and intent, not just processes language." },
                  { title: "Computer Vision & Pose Estimation", desc: "Applying real-time visual intelligence to physiotherapy, sports analytics and beyond." },
                  { title: "Data Structures & Algorithms", desc: "Sharpening problem-solving fundamentals to build faster, cleaner and more scalable systems." }
                ].map((card, idx) => (
                  <div key={idx} className="bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300 flex flex-col justify-center">
                    <h4 className="font-display font-bold text-lg md:text-xl mb-3 text-white leading-tight">{card.title}</h4>
                    <p className="font-body text-sm md:text-base text-white/80 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Closing Line */}
            <div className="mt-12 md:mt-16 mb-20 text-center lg:text-left">
              <p className="font-body italic text-sm md:text-base text-white/70">
                "The goal isn't artificial general intelligence. It's artificial genuine helpfulness."
              </p>
            </div>
          </div>
        </FlowSection>

        {/* Work Experience Section */}
        <FlowSection
          id="work"
          aria-label="Work Experience"
          className="min-h-[150vh] md:min-h-[200vh]"
          style={{ backgroundColor: 'var(--orange, #ff5500)', color: '#fff' }}
        >
          <div className="flex flex-col pt-12 md:pt-24">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight">
              Work<br />Experience
            </h1>
            {/* Content Placeholder */}
            <div className="mt-16 max-w-2xl text-white/80 font-body text-lg">
              {/* Add your content here */}
            </div>
          </div>
        </FlowSection>

        {/* My Journey Section */}
        <FlowSection
          id="journey"
          aria-label="My Journey"
          className="min-h-[150vh] md:min-h-[200vh]"
          style={{ backgroundColor: '#ffffff', color: '#000' }}
        >
          <div className="flex flex-col pt-12 md:pt-24">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight">
              My<br />Journey
            </h1>
            {/* Content Placeholder */}
            <div className="mt-16 max-w-2xl text-black/70 font-body text-lg">
              {/* Add your content here */}
            </div>
          </div>
        </FlowSection>

      </FlowArt>
    </div>
  );
}
