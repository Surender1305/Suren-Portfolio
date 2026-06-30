'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Users, Mail, FileText, ArrowRight } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-[#121212]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="flex flex-col items-center text-center mb-24"
      >
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
          Let's build <br/> <span className="text-[#0070f3]">something amazing.</span>
        </h2>
        <a 
          href="mailto:contact@surender.com"
          className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform"
        >
          <Mail size={24} />
          Get in touch
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* GitHub Card */}
        <motion.a 
          href="https://github.com/Surender1305"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-1 md:col-span-2 glass-card p-8 rounded-3xl group relative overflow-hidden flex flex-col justify-between hover:border-[#0070f3]/50 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="z-10 flex justify-between items-start mb-8">
            <Code size={40} className="text-white/80 group-hover:text-white transition-colors" />
            <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-bold mb-2">GitHub</h3>
            <p className="text-white/50">Check out my open source contributions and repositories.</p>
          </div>
          
          {/* Simulated contribution graph bg */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-20 flex flex-wrap gap-1 p-4 pointer-events-none mask-image-gradient">
            {Array.from({length: 40}).map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${Math.random() > 0.5 ? 'bg-green-500' : 'bg-white/10'}`} />
            ))}
          </div>
        </motion.a>

        <div className="col-span-1 flex flex-col gap-6">
          <motion.a 
            href="https://www.linkedin.com/in/surender-s-364930283"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-8 rounded-3xl flex-1 group hover:border-blue-500/50 transition-colors flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <Users size={32} className="text-white/80 group-hover:text-[#0a66c2] transition-colors" />
              <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">LinkedIn</h3>
              <p className="text-sm text-white/50">Connect with me</p>
            </div>
          </motion.a>

          <motion.a 
            href="/resume.pdf"
            target="_blank"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-card p-8 rounded-3xl flex-1 group hover:border-white/40 transition-colors flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <FileText size={32} className="text-white/80 group-hover:text-white transition-colors" />
              <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Resume</h3>
              <p className="text-sm text-white/50">Download PDF</p>
            </div>
          </motion.a>
        </div>

      </div>
    </section>
  );
}
