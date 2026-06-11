"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { createPortal } from "react-dom"
import { X, Check, ArrowRight, Mail, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Lazy-load the heavy WebGL shader — only needed when popup is opened
const LazyMeshGradient = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.MeshGradient,
  }))
);

export default function ContactPopup() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [formStep, setFormStep] = useState<"idle" | "submitting" | "success">("idle")

  const handleExpand = () => setIsExpanded(true)
  
  const handleClose = () => {
    setIsExpanded(false)
    setTimeout(() => setFormStep("idle"), 500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStep("submitting")

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Web3Forms Access Key
    formData.append("access_key", "747afde0-50a2-4432-ba4d-915f04d66e39");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStep("success");
        form.reset();
      } else {
        console.error("Error", data);
        setFormStep("idle");
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setFormStep("idle");
      alert("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isExpanded])

  return (
    <>
      <AnimatePresence initial={false}>
        {!isExpanded && (
          <motion.div className="inline-block relative">
            <motion.div
              style={{ borderRadius: "100px" }}
              layout
              layoutId="cta-card"
              className="absolute inset-0 bg-[#ff5500]"
            />
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout={false}
              onClick={handleExpand}
              className="relative flex items-center gap-2 h-14 px-8 py-3 text-lg font-medium text-white tracking-wide hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Modal Overlay */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence initial={false}>
          {isExpanded && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4">
              <motion.div
                layoutId="cta-card"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                style={{ borderRadius: "24px" }}
                layout
                className="relative flex h-full w-full overflow-hidden bg-[#ff5500] sm:rounded-[24px] shadow-2xl"
              >
                {/* Mesh Gradient Background */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Suspense fallback={<div className="absolute inset-0 bg-[#ff5500]" />}>
                    <LazyMeshGradient
                      speed={0.6}
                      colors={["#ff5500", "#ea580c", "#c2410c", "#7c2d12"]}
                      distortion={0.8}
                      swirl={0.1}
                      grainMixer={0.15}
                      grainOverlay={0}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </Suspense>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleClose}
                  className="absolute right-4 top-4 sm:right-8 sm:top-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </motion.button>

                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="relative z-10 flex flex-col lg:flex-row h-full w-full max-w-7xl mx-auto overflow-y-auto lg:overflow-hidden"
                >
                  {/* Left Side: Testimonials & Info */}
                  <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 lg:p-16 gap-8 text-white">
                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                        Let's create together.
                      </h2>
                      <p className="text-orange-100 text-lg max-w-md">
                        Have a project in mind? I'm currently open for new opportunities and exciting collaborations.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <Mail className="w-6 h-6 text-orange-200" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Direct Email</h3>
                          <p className="text-orange-100/80 text-sm leading-relaxed mt-1">
                            Drop me a line anytime. I usually reply within 24 hours.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <MapPin className="w-6 h-6 text-orange-200" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Location</h3>
                          <p className="text-orange-100/80 text-sm leading-relaxed mt-1">
                            Based remotely, available worldwide.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Form */}
                  <div className="flex-1 flex items-center justify-center p-4 sm:p-12 lg:p-16 bg-black/10 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none">
                    <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl">
                      
                      {formStep === "success" ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center justify-center text-center h-[400px] space-y-6"
                        >
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/30">
                            <Check className="w-10 h-10 text-[#ff5500]" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-orange-100">Thanks for reaching out. I'll get back to you soon.</p>
                          </div>
                          <button 
                            onClick={handleClose}
                            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm font-medium"
                          >
                            Close Window
                          </button>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div className="space-y-1">
                            <h3 className="text-xl font-semibold text-white">Send a Message</h3>
                            <p className="text-sm text-orange-200">Fill out the form below to get in touch.</p>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-xs font-medium text-orange-200 mb-1.5 uppercase tracking-wider">
                                Full Name
                              </label>
                              <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Jane Doe"
                                className="w-full px-4 py-3 rounded-lg bg-orange-950/40 border border-orange-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-sm"
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-xs font-medium text-orange-200 mb-1.5 uppercase tracking-wider">
                                Email Address
                              </label>
                              <input
                                required
                                type="email"
                                id="email"
                                name="email"
                                placeholder="jane@example.com"
                                className="w-full px-4 py-3 rounded-lg bg-orange-950/40 border border-orange-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-sm"
                              />
                            </div>

                            <div>
                              <label htmlFor="message" className="block text-xs font-medium text-orange-200 mb-1.5 uppercase tracking-wider">
                                Message
                              </label>
                              <textarea
                                required
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Tell me about your project..."
                                className="w-full px-4 py-3 rounded-lg bg-orange-950/40 border border-orange-300/20 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none text-sm"
                              />
                            </div>
                          </div>

                          <button
                            disabled={formStep === "submitting"}
                            type="submit"
                            className="w-full flex items-center justify-center px-8 py-3.5 rounded-lg bg-white text-[#ff5500] font-bold hover:bg-orange-50 focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                          >
                            {formStep === "submitting" ? (
                               <span className="flex items-center gap-2">
                                 <span className="h-4 w-4 border-2 border-[#ff5500] border-t-transparent rounded-full animate-spin"></span>
                                 Sending...
                               </span>
                            ) : "Send Message"}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
