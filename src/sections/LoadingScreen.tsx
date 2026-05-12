import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const letters = "DARSHAN".split("");

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          exit={{
            clipPath: [
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            ],
          }}
          transition={{
            clipPath: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            className="flex items-center gap-1"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-[clamp(3rem,10vw,8rem)] font-bold text-white tracking-[0.05em] inline-block"
                initial={{ x: -30, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: [1, 1, 1.02, 1],
                }}
                transition={{
                  x: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                  opacity: { delay: i * 0.06, duration: 0.5, ease: "easeOut" },
                  scale: {
                    delay: 0.8 + i * 0.06,
                    duration: 1,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 1],
                  },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
