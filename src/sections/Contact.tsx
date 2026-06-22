import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContactPopup from "@/components/ui/contact-popup";
import { AnimatedDock } from "@/components/ui/animated-dock";
import { Typewriter } from "@/components/ui/typewriter";
import { Github, Linkedin } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const PHONE_STYLES = `
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }
`;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {}, section);

    let sectionAnimated = false;
    let leftAnimated = false;
    let rightAnimated = false;

    const observerOptions = { threshold: 0.05 }; // Triggers when element is 5% in view

    // 1. Headline Observer
    const sectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !sectionAnimated) {
        sectionAnimated = true;
        ctx.add(() => {
          if (headlineRef.current) {
            const words = headlineRef.current.querySelectorAll(".word");
            gsap.fromTo(
              words,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
            );
          }
        });
      }
    }, observerOptions);

    // 2. Left Box Text Observer
    const leftObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !leftAnimated) {
        leftAnimated = true;
        ctx.add(() => {
          const tl = gsap.timeline();
          if (subRef.current) {
            tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0);
          }
          if (ctaRef.current) {
            tl.fromTo(ctaRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 0.2);
          }
          if (emailRef.current) {
            tl.fromTo(emailRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.3);
          }
        });
      }
    }, observerOptions);

    // 3. Right Box Phone Observer
    const rightObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !rightAnimated) {
        rightAnimated = true;
        ctx.add(() => {
          if (mockupRef.current) {
            gsap.fromTo(
              mockupRef.current,
              { y: 300, opacity: 0, scale: 0.8, rotationX: 15 },
              { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.2, ease: "expo.out" }
            );
          }
        });
      }
    }, observerOptions);

    // Start observing
    sectionObserver.observe(section);
    if (leftBoxRef.current) leftObserver.observe(leftBoxRef.current);
    if (rightBoxRef.current) rightObserver.observe(rightBoxRef.current);

    return () => {
      sectionObserver.disconnect();
      leftObserver.disconnect();
      rightObserver.disconnect();
      ctx.revert();
    };
  }, []);

  const headlineWords = "Let's Build Something".split(" ");

  return (
    <section id="contact" ref={sectionRef} className="bg-[#f8f8f8] relative">
      <style dangerouslySetInnerHTML={{ __html: PHONE_STYLES }} />
      <div className="w-full px-6 md:px-12 lg:px-20 py-[clamp(80px,15vh,160px)]">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center">
          {/* Centered Top Content */}
          <div className="text-center mb-16">
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(2rem,4.5vw,4.5rem)] font-bold text-[#000000] leading-[1.1] mb-2 flex items-center justify-center flex-wrap"
            >
              {headlineWords.map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
              <span className="word inline-block text-black/50">
                <Typewriter
                  text={[
                    "Intelligent.",
                    "Impactful.",
                    "Beautiful.",
                    "Scalable.",
                    "Creative.",
                  ]}
                  speed={70}
                  waitTime={2000}
                  deleteSpeed={40}
                  cursorChar={"_"}
                />
              </span>
            </h2>
          </div>

          {/* Main Layout Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20 items-center">
            {/* Left Column - Clean Premium Box */}
            <div ref={leftBoxRef} className="w-full h-full min-h-[580px] lg:col-span-7 bg-[#f0f0f0] border-black/10 border shadow-2xl rounded-[2.5rem] p-10 md:p-14 lg:p-16 flex flex-col relative overflow-hidden">
              {/* Extremely subtle top highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent"></div>

              {/* Subtle radial gradient background for depth */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none"></div>

              <div className="flex-1 flex flex-col items-start justify-center text-left relative z-10">
                <p
                  ref={subRef}
                  className="font-body text-[1.1rem] md:text-xl text-[#000000]/80 leading-relaxed tracking-wide mb-12"
                >
                  I am always open to exploring new projects, creative
                  collaborations, and exciting opportunities. Whether you have a
                  specific vision in mind or just want to connect and say hello,
                  feel free to drop a message. I'll make sure to get back to you
                  as soon as possible!
                </p>

                <div ref={ctaRef} className="mb-10">
                  <ContactPopup />
                </div>

                <a
                  ref={emailRef}
                  href="mailto:ndarshan507@gmail.com"
                  className="font-body text-base md:text-lg text-[#0066cc] hover:text-[#0055b3] font-medium transition-colors duration-300"
                >
                  ndarshan507@gmail.com
                </a>
              </div>

              {/* Centered Socials Inside the Box */}
              <div className="mt-12 pt-8 border-t border-white/[0.05] flex justify-center w-full relative z-10">
                <AnimatedDock
                  items={[
                    {
                      link: "https://github.com/darshannayak21",
                      target: "_blank",
                      Icon: <Github size={24} />,
                    },
                    {
                      link: "https://www.linkedin.com/in/darshan-nayak-636393346/",
                      target: "_blank",
                      Icon: <Linkedin size={24} />,
                    },
                  ]}
                />
              </div>
            </div>

            {/* Right Column - Mobile Phone Mockup */}
            <div ref={rightBoxRef} className="flex lg:col-span-5 items-center justify-center relative w-full h-[580px] perspective-[1000px] mt-10 lg:mt-0 transform scale-90 sm:scale-100">
              <div
                ref={mockupRef}
                className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform transform-style-3d opacity-0"
              >
                {/* Physical Hardware Buttons */}
                <div
                  className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0"
                  aria-hidden="true"
                />
                <div
                  className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]"
                  aria-hidden="true"
                />

                {/* Inner Screen Container */}
                <div className="absolute inset-[12px] bg-[#050914] rounded-[2.2rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10 group cursor-pointer">
                  <div
                    className="absolute inset-0 screen-glare z-40 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Custom Video Area */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center bg-black rounded-[2.5rem] overflow-hidden">
                    <video
                      className="absolute inset-0 w-full h-full object-cover z-20 rounded-[2rem]"
                      loop
                      muted
                      playsInline
                      autoPlay
                    >
                      <source
                        src="/images/screenrecording.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
