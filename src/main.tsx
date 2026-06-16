// ──── REFRESH = ALWAYS START AT THE VERY TOP ────
// These run at the absolute earliest point in JS execution, before React
// mounts, before any component renders. This guarantees that on ANY refresh
// (F5, Ctrl+R, browser refresh button), the user always starts at scroll 0.
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// If the user refreshes on a subpage, redirect to the root URL
if (window.location.pathname !== '/') {
  window.history.replaceState(null, '', '/');
}
// Clear any lingering hash so we don't scroll to a section on refresh
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname);
}

import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import './index.css'
import { WaveLoader } from '@/components/ui/wave-loader'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

// Eager load the main app to ensure hero/loader shows immediately
import App from './App.tsx'

// Lazy load the subpages to optimize the main bundle
const MoreAbout = lazy(() => import('./pages/MoreAbout.tsx'))
const AiSystems = lazy(() => import('./pages/AiSystems.tsx'))
const HackathonProjects = lazy(() => import('./pages/HackathonProjects.tsx'))
const ExperimentalBuilds = lazy(() => import('./pages/ExperimentalBuilds.tsx'))

// A simple loading fallback for lazy routes
const PageLoader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black dark:bg-black">
    <div className="scale-125 md:scale-150">
      <WaveLoader bars={5} />
    </div>
  </div>
);

// Kill all GSAP ScrollTrigger instances when navigating between routes.
// Without this, pinning triggers from the MoreAbout story-scroll (and
// scrub triggers from the Work section) persist across route changes,
// causing the scroll to get stuck when navigating back.
function RouteCleanup({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Cleanup runs when leaving the current route
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      ScrollTrigger.clearScrollMemory();
      window.scrollTo(0, 0);
    };
  }, [location.pathname]);

  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <RouteCleanup>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/moreabout" element={<MoreAbout />} />
              <Route path="/aisystems" element={<AiSystems />} />
              <Route path="/hackathonprojects" element={<HackathonProjects />} />
              <Route path="/experimental" element={<ExperimentalBuilds />} />
            </Routes>
          </Suspense>
        </RouteCleanup>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
