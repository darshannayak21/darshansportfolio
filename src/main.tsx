import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/ThemeProvider'
import './index.css'
import { WaveLoader } from '@/components/ui/wave-loader'

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

// If the user lands on any subpage via a hard refresh or direct link, 
// force the URL back to the root hero section before React Router initializes.
if (window.location.pathname !== '/') {
  window.history.replaceState(null, '', '/');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/moreabout" element={<MoreAbout />} />
            <Route path="/aisystems" element={<AiSystems />} />
            <Route path="/hackathonprojects" element={<HackathonProjects />} />
            <Route path="/experimental" element={<ExperimentalBuilds />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
