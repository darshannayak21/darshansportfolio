import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/SectionLabel";
import OrangeCTAButton from "@/components/OrangeCTAButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline words stagger in
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Subline
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // CTA
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Email
      if (emailRef.current) {
        gsap.fromTo(
          emailRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: emailRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineWords = "Let's Build Something Intelligent".split(" ");

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-black"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 py-[clamp(80px,15vh,160px)]">
        <div className="max-w-[800px] mx-auto text-center">
          <SectionLabel text="CONTACT" className="mb-6 inline-block" />

          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-bold text-white leading-[1.0] mb-6"
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h2>

          <p
            ref={subRef}
            className="font-body text-lg text-txt-tertiary max-w-[560px] mx-auto leading-relaxed mb-12"
          >
            Open to collaborations, opportunities, and conversations about AI,
            creativity, and the future of technology.
          </p>

          <div ref={ctaRef} className="mb-6">
            <OrangeCTAButton
              text="Get in Touch"
              large
              onClick={() => {
                window.location.href = "mailto:darshan@example.com";
              }}
            />
          </div>

          <a
            ref={emailRef}
            href="mailto:darshan@example.com"
            className="font-mono text-base text-txt-secondary hover:text-orange transition-colors duration-200"
          >
            darshan@example.com
          </a>
        </div>
      </div>
    </section>
  );
}
