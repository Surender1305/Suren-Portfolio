'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const text = "I'm Surender, a developer passionate about blending design and engineering.";
  
  return (
    <section id="about" ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-[#121212] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-medium leading-tight tracking-tight mb-8">
              {text.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.76, 0, 0.24, 1] }}
                  className="inline-block mr-3"
                >
                  {word === 'Surender,' ? <span className="text-white font-bold">{word}</span> : <span className="text-white/70">{word}</span>}
                </motion.span>
              ))}
            </h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/50 font-light leading-relaxed mb-6 max-w-2xl"
            >
              I build Flutter applications, full-stack systems, AI-powered tools, and premium web experiences.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-2xl"
            >
              I enjoy transforming complex problems into elegant products with modern UI and smooth interactions.
            </motion.p>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative h-[350px] md:h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden glass border border-white/10 block mt-8 lg:mt-0">
          <motion.div 
            style={{ y }}
            className="absolute inset-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-[#0070f3]/20 via-transparent to-purple-500/20 blur-3xl opacity-50 pointer-events-none"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image 
              src="/suren.png"
              alt="Surender"
              fill
              className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}
