"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { 
  X, Minus, Square, Search as SearchIcon, ArrowLeft, ArrowRight, ArrowUp, RotateCw, 
  Folder, Image as ImageIcon, File, ChevronRight, LayoutGrid, List,
  Copy, Scissors, Clipboard, Trash2, FolderOpen, Monitor, Download, 
  Music, Video, HardDrive, Plus, ArrowDownUp
} from "lucide-react";

export default function FolderInteraction() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageVariants = {
    spring: { type: "spring" as const, duration: 0.6 },
  };

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center py-8 cursor-pointer relative z-20">
        <div
          onClick={handleClick}
          className="w-80 h-52 relative wrapper group"
        >
          {/* Tooltip hint */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-mono tracking-widest whitespace-nowrap bg-black/50 px-4 py-1 rounded-full pointer-events-none">
            {!isOpen ? "Click to Open" : "Click to View Certificates"}
          </div>

          <div
            className="folder relative w-[87.5%] mx-auto items-center h-full flex justify-center transition-transform duration-300 group-hover:scale-[1.02]"
            style={{
              background: "#18151B",
              boxShadow:
                "0px 0px 15.699999809265137px 16px rgba(79, 73, 85, 0.30) inset",
              borderRadius: 10,
            }}
          >
            {[
              {
                initial: { rotate: -3, x: -38, y: 2 },
                open: { rotate: -8, x: -70, y: -55 },
                transition: {
                  ...pageVariants.spring,
                  bounce: 0.15,
                  stiffness: 160,
                  damping: 22,
                },
                className: "z-10 shadow-md",
              },
              {
                initial: { rotate: 0, x: 0, y: 0 },
                open: { rotate: 1, x: 2, y: -75 },
                transition: {
                  ...pageVariants.spring,
                  duration: 0.55,
                  bounce: 0.12,
                  stiffness: 190,
                  damping: 24,
                },
                className: "z-20 shadow-lg",
              },
              {
                initial: { rotate: 3.5, x: 42, y: 1 },
                open: { rotate: 9, x: 75, y: -60 },
                transition: {
                  ...pageVariants.spring,
                  duration: 0.58,
                  bounce: 0.17,
                  stiffness: 170,
                  damping: 21,
                },
                className: "z-10 shadow-md",
              },
            ].map((page, i) => (
              <motion.div
                key={i}
                initial={page.initial}
                animate={isOpen ? page.open : page.initial}
                transition={page.transition}
                className={`absolute top-2 w-32 h-fit rounded-xl ${page.className}`}
              >
                <Page />
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ rotateX: isOpen ? -40 : 0 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="absolute -left-[1px] -right-[1px] -bottom-[1px] z-20 h-44 rounded-3xl origin-bottom flex justify-center items-center overflow-visible"
          >
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 235 121"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <foreignObject x="-13" y="-13" width="262.4" height="148.4">
                <div
                  style={{
                    backdropFilter: "blur(6.5px)",
                    clipPath: "url(#bgblur_0_1_106_clip_path)",
                    height: "100%",
                    width: "100%",
                  }}
                ></div>
              </foreignObject>
              <path
                id="Vector"
                data-figma-bg-blur-radius="13"
                d="M104.615 0.350494L33.1297 0.838776C32.7542 0.841362 32.3825 0.881463 32.032 0.918854C31.6754 0.956907 31.3392 0.992086 31.0057 0.992096H31.0047C30.6871 0.99235 30.3673 0.962051 30.0272 0.929596C29.6927 0.897686 29.3384 0.863802 28.9803 0.866119L13.2693 0.967682H13.2527L13.2352 0.969635C13.1239 0.981406 13.0121 0.986674 12.9002 0.986237H9.91388C8.33299 0.958599 6.76052 1.22345 5.27423 1.76651H5.27325C4.33579 2.11246 3.48761 2.66213 2.7879 3.37393L2.49689 3.68839L2.492 3.69424C1.62667 4.73882 1.00023 5.96217 0.656067 7.27725C0.653324 7.28773 0.654065 7.29886 0.652161 7.30948C0.3098 8.62705 0.257231 10.0048 0.499817 11.3446L12.2147 114.399L12.2156 114.411L12.2176 114.423C12.6046 116.568 13.7287 118.508 15.3934 119.902C17.058 121.297 19.1572 122.056 21.3231 122.049V122.05H215.379C217.76 122.02 220.064 121.192 221.926 119.698V119.697C223.657 118.384 224.857 116.485 225.305 114.35L225.307 114.339L235.914 53.3798L235.968 53.1093L235.97 53.0985L235.971 53.0888C236.134 51.8978 236.044 50.685 235.705 49.5321C235.307 48.1669 234.63 46.9005 233.717 45.8144L233.383 45.4296C232.58 44.5553 231.614 43.8449 230.539 43.3398C229.311 42.7628 227.971 42.4685 226.616 42.4774H146.746C144.063 42.4705 141.423 41.8004 139.056 40.5263C136.691 39.2522 134.671 37.4127 133.175 35.1689L113.548 5.05948L113.544 5.05362L113.539 5.04776C112.545 3.65165 111.238 2.51062 109.722 1.72061C108.266 0.886502 106.627 0.422235 104.952 0.365143V0.364166L104.633 0.350494H104.615Z"
                fill="url(#paint0_linear_1_106)"
                fillOpacity="0.95"
                stroke="url(#paint1_linear_1_106)"
                strokeWidth="0.7"
              />
              <defs>
                <clipPath
                  id="bgblur_0_1_106_clip_path"
                  transform="translate(13 13)"
                >
                  <path d="M104.615 0.350494L33.1297 0.838776C32.7542 0.841362 32.3825 0.881463 32.032 0.918854C31.6754 0.956907 31.3392 0.992086 31.0057 0.992096H31.0047C30.6871 0.99235 30.3673 0.962051 30.0272 0.929596C29.6927 0.897686 29.3384 0.863802 28.9803 0.866119L13.2693 0.967682H13.2527L13.2352 0.969635C13.1239 0.981406 13.0121 0.986674 12.9002 0.986237H9.91388C8.33299 0.958599 6.76052 1.22345 5.27423 1.76651H5.27325C4.33579 2.11246 3.48761 2.66213 2.7879 3.37393L2.49689 3.68839L2.492 3.69424C1.62667 4.73882 1.00023 5.96217 0.656067 7.27725C0.653324 7.28773 0.654065 7.29886 0.652161 7.30948C0.3098 8.62705 0.257231 10.0048 0.499817 11.3446L12.2147 114.399L12.2156 114.411L12.2176 114.423C12.6046 116.568 13.7287 118.508 15.3934 119.902C17.058 121.297 19.1572 122.056 21.3231 122.049V122.05H215.379C217.76 122.02 220.064 121.192 221.926 119.698V119.697C223.657 118.384 224.857 116.485 225.305 114.35L225.307 114.339L235.914 53.3798L235.968 53.1093L235.97 53.0985L235.971 53.0888C236.134 51.8978 236.044 50.685 235.705 49.5321C235.307 48.1669 234.63 46.9005 233.717 45.8144L233.383 45.4296C232.58 44.5553 231.614 43.8449 230.539 43.3398C229.311 42.7628 227.971 42.4685 226.616 42.4774H146.746C144.063 42.4705 141.423 41.8004 139.056 40.5263C136.691 39.2522 134.671 37.4127 133.175 35.1689L113.548 5.05948L113.544 5.05362L113.539 5.04776C112.545 3.65165 111.238 2.51062 109.722 1.72061C108.266 0.886502 106.627 0.422235 104.952 0.365143V0.364166L104.633 0.350494H104.615Z" />
                </clipPath>
                <linearGradient
                  id="paint0_linear_1_106"
                  x1="114.7"
                  y1="0.700104"
                  x2="114.7"
                  y2="121.7"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2D2535" />
                  <stop offset="1" stopColor="#2A2A2A" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1_106"
                  x1="114.7"
                  y1="0.700104"
                  x2="114.7"
                  y2="121.7"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#424242" stopOpacity="0.04" />
                  <stop offset="1" stopColor="#212121" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <WindowsExplorerModal onClose={() => { setIsModalOpen(false); setIsOpen(false); }} />}
      </AnimatePresence>
    </>
  );
}

// Windows 11 File Explorer Replica rendered in a React Portal
const WindowsExplorerModal = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    // Nuclear scroll lock — works on every browser including iOS Safari
    const scrollY = window.scrollY;

    // 1. Pin body in place
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 2. Block touch & wheel events on anything outside the modal
    const modalRoot = document.getElementById('cert-modal-root');
    const blockScroll = (e: Event) => {
      // Allow scrolling only if the event target is inside the modal
      if (modalRoot && modalRoot.contains(e.target as Node)) return;
      e.preventDefault();
    };
    document.addEventListener('touchmove', blockScroll, { passive: false });
    document.addEventListener('wheel', blockScroll, { passive: false });

    return () => {
      document.removeEventListener('touchmove', blockScroll);
      document.removeEventListener('wheel', blockScroll);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  // Using portal so it escapes all clipping and stacking contexts
  return createPortal(
    <div id="cert-modal-root" className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 md:p-8 w-full max-w-full overflow-hidden overscroll-none touch-none" onClick={onClose} onTouchMove={(e) => e.stopPropagation()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        className="w-full max-w-full h-full md:max-w-6xl max-h-[95vh] md:max-h-[90vh] bg-[#202020] rounded-xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
        style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}
      >
        {/* Title Bar */}
        <div className="h-10 flex items-center justify-between px-4 bg-[#202020] select-none shrink-0 w-full min-w-0">
          <div className="flex items-center gap-3">
            <FolderOpen size={16} className="text-yellow-400" />
            <span className="text-xs text-white/90">Certificates</span>
          </div>
          <div className="flex items-center -mr-4 h-full">
            <button onClick={onClose} className="h-full px-4 hover:bg-white/10 text-white/70 transition-colors"><Minus size={16} /></button>
            <button onClick={onClose} className="h-full px-4 hover:bg-white/10 text-white/70 transition-colors"><Square size={14} /></button>
            <button onClick={onClose} className="h-full px-4 hover:bg-red-500 hover:text-white text-white/70 transition-colors"><X size={16} /></button>
          </div>
        </div>

        {/* Address & Toolbar */}
        <div className="bg-[#202020] px-2 pb-2 border-b border-white/5 flex flex-col gap-2 shrink-0 w-full min-w-0">
          {/* Navigation & Address Bar */}
          <div className="flex items-center gap-2 px-1 md:px-2 h-10 w-full min-w-0">
            <div className="hidden sm:flex items-center gap-1 shrink-0">
              <button className="p-1.5 rounded hover:bg-white/10 text-white/50 transition-colors"><ArrowLeft size={18} /></button>
              <button className="p-1.5 rounded hover:bg-white/10 text-white/50 transition-colors"><ArrowRight size={18} /></button>
              <button className="p-1.5 rounded hover:bg-white/10 text-white/80 transition-colors"><ArrowUp size={18} /></button>
              <button className="p-1.5 rounded hover:bg-white/10 text-white/80 transition-colors"><RotateCw size={16} /></button>
            </div>
            
            <div className="flex-1 flex items-center bg-[#191919] border border-white/10 rounded-md h-8 px-2 md:px-3 text-xs md:text-sm text-white/90 group hover:bg-[#2a2a2a] transition-colors cursor-text overflow-hidden min-w-0">
              <Monitor size={14} className="text-white/50 mr-1 md:mr-2 flex-shrink-0" />
              <ChevronRight size={14} className="text-white/30 mx-0.5 md:mx-1 flex-shrink-0" />
              <span className="truncate flex-shrink-0">This PC</span>
              <ChevronRight size={14} className="text-white/30 mx-0.5 md:mx-1 flex-shrink-0" />
              <span className="truncate">Certificates</span>
            </div>

            <div className="hidden md:flex w-64 items-center bg-[#191919] border border-white/10 rounded-md h-8 px-3 text-sm text-white/50 group hover:bg-[#2a2a2a] transition-colors cursor-text shrink-0">
              <span>Search Certificates</span>
              <SearchIcon size={14} className="ml-auto text-white/40" />
            </div>
          </div>

          {/* Ribbon / Toolbar */}
          <div className="flex items-center gap-1 px-1 md:px-2 h-10 text-[11px] md:text-xs text-white/80 overflow-x-auto scrollbar-hide whitespace-nowrap w-full min-w-0">
            <button className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded hover:bg-white/10 transition-colors shrink-0">
              <Plus size={14} className="md:w-4 md:h-4" /> <span>New</span> <ChevronRight size={12} className="rotate-90 ml-0.5 md:ml-1 opacity-50" />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1 shrink-0" />
            <div className="flex items-center shrink-0">
              <button className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/50 transition-colors"><Scissors size={14} className="md:w-4 md:h-4" /></button>
              <button className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/80 transition-colors"><Copy size={14} className="md:w-4 md:h-4" /></button>
              <button className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/50 transition-colors"><Clipboard size={14} className="md:w-4 md:h-4" /></button>
              <button className="p-1.5 md:p-2 rounded hover:bg-white/10 text-white/50 transition-colors"><Trash2 size={14} className="md:w-4 md:h-4" /></button>
            </div>
            <div className="w-[1px] h-4 bg-white/20 mx-1 shrink-0" />
            <button className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded hover:bg-white/10 transition-colors shrink-0">
              <ArrowDownUp size={14} className="md:w-4 md:h-4" /> <span>Sort</span> <ChevronRight size={12} className="rotate-90 ml-0.5 md:ml-1 opacity-50" />
            </button>
            <button className="hidden sm:flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 rounded hover:bg-white/10 transition-colors shrink-0">
              <LayoutGrid size={14} className="md:w-4 md:h-4" /> <span>View</span> <ChevronRight size={12} className="rotate-90 ml-0.5 md:ml-1 opacity-50" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden bg-[#191919]">
          {/* Sidebar */}
          <div className="hidden md:block w-56 border-r border-white/5 overflow-y-auto py-2 custom-scrollbar shrink-0">
            <SidebarItem icon={<Folder size={16} className="text-blue-400" />} text="Home" />
            <SidebarItem icon={<ImageIcon size={16} className="text-yellow-400" />} text="Gallery" />
            <div className="my-2 h-[1px] bg-white/5 mx-4" />
            <SidebarItem icon={<Monitor size={16} className="text-white/70" />} text="Desktop" />
            <SidebarItem icon={<Download size={16} className="text-blue-400" />} text="Downloads" />
            <SidebarItem icon={<File size={16} className="text-blue-400" />} text="Documents" />
            <SidebarItem icon={<ImageIcon size={16} className="text-blue-400" />} text="Pictures" />
            <SidebarItem icon={<Music size={16} className="text-blue-400" />} text="Music" />
            <SidebarItem icon={<Video size={16} className="text-blue-400" />} text="Videos" />
            <div className="my-2 h-[1px] bg-white/5 mx-4" />
            <SidebarItem icon={<Monitor size={16} className="text-white/70" />} text="This PC" />
            <SidebarItem icon={<HardDrive size={16} className="text-white/70" />} text="Windows (C:)" />
          </div>

          {/* File Grid */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar touch-auto overscroll-contain">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <FileItem title="Global_AI_Hackathon_2024" date="2024-01-15 11:24 AM" imgColor="bg-orange-500" />
              <FileItem title="NeurIPS_Research_Paper" date="2023-11-02 09:12 AM" imgColor="bg-blue-500" />
              <FileItem title="TensorFlow_Contributor" date="2023-08-12 14:30 PM" imgColor="bg-green-500" />
              <FileItem title="Tech_Disrupt_MVP" date="2023-05-20 16:45 PM" imgColor="bg-purple-500" />
              <FileItem title="AWS_Solutions_Architect" date="2022-10-10 10:05 AM" imgColor="bg-yellow-500" />
              <FileItem title="Advanced_React_Patterns" date="2022-04-05 13:20 PM" imgColor="bg-cyan-500" />
              <FileItem title="System_Design_Pro" date="2021-09-18 08:55 AM" imgColor="bg-indigo-500" />
              <FileItem title="Google_Cloud_Dev" date="2021-02-22 15:10 PM" imgColor="bg-red-500" />
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-8 bg-[#202020] border-t border-white/5 flex items-center justify-between px-4 text-xs text-white/50 select-none shrink-0">
          <span>8 items</span>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-white/10 rounded transition-colors"><List size={14} /></button>
            <button className="p-1 hover:bg-white/10 rounded bg-white/10 transition-colors"><LayoutGrid size={14} /></button>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

const SidebarItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-3 px-4 py-1.5 hover:bg-white/5 cursor-pointer text-sm text-white/80 mx-2 rounded-md transition-colors">
    {icon}
    <span>{text}</span>
  </div>
);

const FileItem = ({ title, date, imgColor }: { title: string, date: string, imgColor: string }) => (
  <div className="flex flex-col items-center gap-2 p-2 sm:p-3 rounded-lg hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/10 transition-all duration-300 group">
    <div className={`w-full aspect-[4/3] sm:aspect-[1.4] rounded-md shadow-md flex items-center justify-center relative overflow-hidden bg-[#2a2a2a] group-hover:scale-105 transition-transform duration-300`}>
       {/* Preview thumbnail simulation */}
       <div className={`absolute inset-0 m-2 ${imgColor} opacity-20 rounded shadow-sm`} />
       <ImageIcon size={32} className="text-white/20 group-hover:scale-125 group-hover:text-white/50 transition-all duration-300 relative z-10" />
    </div>
    <div className="text-center w-full">
      <p className="text-xs text-white/90 truncate w-full group-hover:text-white" title={title}>{title}.png</p>
      <p className="text-[10px] text-white/40 mt-0.5">{date}</p>
    </div>
  </div>
);

const Page = () => (
  <div className="w-full h-full bg-gradient-to-b from-[#E8E7F0] to-[#DCDAE8] rounded-xl shadow-lg p-3 sm:p-4 border border-white/20">
    <div className="flex flex-col gap-1.5 sm:gap-2">
      <div className="w-full h-1 sm:h-1.5 bg-[#CFCDE0] rounded-full" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex gap-1.5 sm:gap-2">
          <div className="flex-1 h-1 sm:h-1.5 bg-[#CFCDE0] rounded-full" />
          <div className="flex-1 h-1 sm:h-1.5 bg-[#CFCDE0] rounded-full" />
        </div>
      ))}
    </div>
  </div>
);
