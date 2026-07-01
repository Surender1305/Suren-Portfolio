'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.5, // wait for loader
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <section id="home" className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Aurora / Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#0070f3] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] bg-white opacity-[0.01] blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div variants={item} className="mb-4">
          <span className="px-4 py-2 rounded-full glass text-sm font-medium tracking-wide text-white/80">
            Available for freelance work
          </span>
        </motion.div>
        
        <motion.h1 variants={item} className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight mt-6">
          Hi, I'm <span className="text-white">Surender.</span>
        </motion.h1>
        
        <motion.h2 variants={item} className="text-2xl md:text-4xl lg:text-5xl font-medium text-white/60 mt-4 tracking-tight">
          Creative Developer. <br className="md:hidden" /> Flutter Developer.
        </motion.h2>
        
        <motion.p variants={item} className="text-lg md:text-xl text-white/40 max-w-2xl mt-8 font-light tracking-wide">
          Building premium digital experiences, AI-powered tools, and highly performant full-stack systems.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row gap-6 mt-12">
          <a 
            href="#projects" 
            className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform"
          >
            View Projects
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="px-8 py-4 rounded-full glass font-semibold tracking-wide hover:bg-white/10 transition-colors border border-white/10"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
