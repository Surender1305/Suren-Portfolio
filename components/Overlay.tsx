'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Overlay() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Timeline mapped from 0 to 1 based on the parent's 500vh scroll section
  // Text 1 (Hero): 0% to 5% (fades out immediately when scrolling)
  const opacity1 = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  const scale1 = useTransform(scrollYProgress, [0, 0.05], [1, 1.1]);
  const y1 = useTransform(scrollYProgress, [0, 0.05], [0, -50]);
  const pointerEvents1 = useTransform(scrollYProgress, [0, 0.03], ["auto", "none"]);
  const display1 = useTransform(scrollYProgress, (pos) => pos > 0.03 ? "none" : "flex");

  // Text 2 (Left): 20% to 40%
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.15, 0.45], [-50, 0]);

  // Text 3 (Right): 50% to 70%
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.45, 0.75], [50, 0]);

  // Text 4 (Center Bottom): 80% to 100%
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.75, 1], [50, 0]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none h-[500vh]">
      {/* 0% - Hero Section */}
      <motion.div 
        style={{ opacity: opacity1, scale: scale1, y: y1, pointerEvents: pointerEvents1 as any, display: display1 }}
        className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center px-4"
      >
        <div className="mb-4">
          <span className="px-4 py-2 rounded-full glass text-xs sm:text-sm font-medium tracking-wide text-white/80">
            Available for freelance work
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight mt-4 sm:mt-6 text-center text-white drop-shadow-lg">
          Hi, I'm Surender.
        </h1>
        
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mt-3 sm:mt-4 tracking-tight text-center drop-shadow-md">
          Creative Developer.
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mt-6 sm:mt-8 font-light tracking-wide text-center drop-shadow-md px-4">
          Building premium digital experiences, AI-powered tools, and highly performant full-stack systems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-12 w-full sm:w-auto px-8 sm:px-0">
          <a 
            href="#projects" 
            className="px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform text-center"
          >
            View Projects
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="px-8 py-3.5 sm:py-4 rounded-full glass font-semibold tracking-wide hover:bg-white/10 transition-colors border border-white/10 text-center"
          >
            Download Resume
          </a>
        </div>
      </motion.div>

      {/* 30% - Left aligned */}
      <motion.div 
        style={{ opacity: opacity2, x: x2 }}
        className="sticky top-0 h-[100dvh] flex flex-col justify-center items-start px-6 md:pl-[10vw] -mt-[100dvh]"
      >
        <div className="glass px-6 py-5 sm:px-10 sm:py-8 rounded-2xl max-w-[90vw] sm:max-w-none">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold glow-text leading-tight max-w-[15ch] mix-blend-difference">
            I build digital experiences.
          </h2>
        </div>
      </motion.div>

      {/* 60% - Right aligned */}
      <motion.div 
        style={{ opacity: opacity3, x: x3 }}
        className="sticky top-0 h-[100dvh] flex flex-col justify-center items-end px-6 md:pr-[10vw] -mt-[100dvh]"
      >
        <div className="glass px-6 py-5 sm:px-10 sm:py-8 rounded-2xl text-right max-w-[90vw] sm:max-w-none">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-[15ch] mix-blend-difference">
            Bridging design<br/>and engineering.
          </h2>
        </div>
      </motion.div>

      {/* 90% - Center Bottom */}
      <motion.div 
        style={{ opacity: opacity4, y: y4 }}
        className="sticky top-0 h-[100dvh] flex flex-col justify-end items-center pb-[12vh] sm:pb-[15vh] px-4 -mt-[100dvh]"
      >
        <div className="glass px-8 py-4 sm:px-12 sm:py-6 rounded-full max-w-[90vw] sm:max-w-none text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-medium tracking-wide mix-blend-difference">
            Every pixel has purpose.
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
