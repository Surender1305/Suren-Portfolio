'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 150;

const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
};

export default function Loader({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let loadedCount = 0;
    
    // Simple fast simulation of loading if images are cached
    const interval = setInterval(() => {
      // Just a fallback in case image load events fail
    }, 100);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        
        if (loadedCount === FRAME_COUNT) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoaded, 1000); // Wait for fade out animation
          }, 500);
        }
      };
      img.onerror = () => {
        // Fallback for errors to prevent stuck loader
        loadedCount++;
        setProgress(Math.floor((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoaded, 1000);
          }, 500);
        }
      }
    }

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#121212] text-white"
        >
          <div className="flex flex-col items-center gap-8 w-64">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold tracking-widest"
            >
              SUREN
            </motion.h1>
            
            <div className="flex justify-between w-full text-xs font-mono tracking-wider opacity-60 uppercase">
              <span>Loading...</span>
              <span>{progress}%</span>
            </div>

            <div className="relative w-full h-[1px] bg-white/10 overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
