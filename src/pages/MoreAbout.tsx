import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export default function MoreAbout() {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to that section instantly
    if (location.hash) {
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
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location]);

  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* Back Button */}
      {/* Back Button */}
      <Link 
        to="/#bento-grid" 
        className="fixed top-6 right-6 z-[100] group flex items-center justify-center gap-2 bg-[#0a0a0a]/60 hover:bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-white/10 px-6 py-3 rounded-full font-mono text-sm uppercase tracking-wider transition-all duration-300"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-[#ff5500] group-hover:-translate-x-1 transition-all duration-300"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        <span className="text-white group-hover:text-[#ff5500] transition-colors duration-300">Back</span>
      </Link>

      <FlowArt aria-label="More About Sections">
        
        {/* More About Me! Section */}
        <FlowSection 
          id="more-about"
          aria-label="More About Me!" 
          className="min-h-[150vh] md:min-h-[200vh]"
          style={{ backgroundColor: '#1e4620', color: '#fff' }}
        >
          <div className="flex flex-col pt-12 md:pt-24">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight">
              More<br />About<br />Me!
            </h1>
            {/* Content Placeholder */}
            <div className="mt-16 max-w-2xl text-white/70 font-body text-lg">
              {/* Add your content here */}
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
          <div className="flex flex-col pt-12 md:pt-24">
            <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[0.9] uppercase tracking-tight">
              Current<br />Interests
            </h1>
            {/* Content Placeholder */}
            <div className="mt-16 max-w-2xl text-white/70 font-body text-lg">
              {/* Add your content here */}
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
