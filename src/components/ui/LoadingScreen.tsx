'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + increment);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1E1E1E] text-white px-4 select-none overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EA580C]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#B91C1C]/25 rounded-full blur-2xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#B91C1C] to-[#EA580C] flex items-center justify-center shadow-lg shadow-[#B91C1C]/40 border border-[#FACC15]/30">
              <span className="font-heading text-2xl font-bold text-[#FFF8F1]">D</span>
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold tracking-widest text-[#FFF8F1]">
                DINE DIVINE
              </h1>
              <p className="text-[10px] tracking-widest text-[#FACC15] uppercase font-semibold">
                CUISINE • RAWALPINDI
              </p>
            </div>
          </motion.div>

          <div className="relative w-48 h-48 flex items-center justify-center my-4">
            <div className="absolute -top-6 flex justify-center gap-3 w-full z-10 pointer-events-none">
              <div className="w-2 h-8 bg-gradient-to-t from-white/30 to-transparent rounded-full steam-particle" />
              <div className="w-2 h-10 bg-gradient-to-t from-white/40 to-transparent rounded-full steam-particle-delayed" />
              <div className="w-2 h-7 bg-gradient-to-t from-white/20 to-transparent rounded-full steam-particle" />
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full relative">
              <motion.div
                initial={{ y: -80, opacity: 0, scale: 0.8 }}
                animate={progress >= 85 ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-32 h-10 bg-[#EAB308] rounded-t-full border-b-2 border-[#CA8A04] relative shadow-md flex justify-center overflow-hidden z-20"
              >
                <div className="absolute top-2 left-6 w-1.5 h-1 bg-white/80 rounded-full rotate-12" />
                <div className="absolute top-3 left-14 w-1.5 h-1 bg-white/80 rounded-full -rotate-12" />
                <div className="absolute top-2 left-22 w-1.5 h-1 bg-white/80 rounded-full rotate-45" />
              </motion.div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={progress >= 70 ? { scaleX: 1, opacity: 1 } : {}}
                transition={{ duration: 0.3 }}
                className="w-36 h-2 bg-[#FACC15] rounded-full my-0.5 shadow-sm shadow-[#FACC15]/50 z-15"
              />

              <motion.div
                initial={{ x: -80, opacity: 0 }}
                animate={progress >= 50 ? { x: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 220 }}
                className="w-34 h-5 bg-[#9A3412] rounded-lg border-b border-[#7C2D12] shadow-inner my-0.5 flex items-center justify-center z-10"
              >
                <div className="w-full h-full bg-[#EA580C]/40 rounded-lg" />
              </motion.div>

              <motion.div
                initial={{ x: 80, opacity: 0 }}
                animate={progress >= 30 ? { x: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 220 }}
                className="w-36 h-3 bg-gradient-to-r from-[#B91C1C] via-[#22C55E] to-[#B91C1C] rounded-md my-0.5 z-5"
              />

              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={progress >= 10 ? { y: 0, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 180 }}
                className="w-32 h-6 bg-[#D97706] rounded-b-xl border-t border-[#B45309] shadow-md z-0"
              />
            </div>
          </div>

          <div className="w-64 max-w-full mt-4">
            <div className="flex justify-between items-center text-xs text-[#EFE6DA]/80 font-subheading mb-2">
              <span>Assembling Fresh Flavors...</span>
              <span className="font-mono text-[#FACC15] font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B91C1C] via-[#EA580C] to-[#FACC15] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: progress >= 60 ? 1 : 0 }}
            className="mt-6 text-sm tracking-widest text-[#FFF8F1]/80 font-subheading uppercase text-center"
          >
            Fresh Flavor. Every Bite. Every Time.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
