'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
  "Flutter", "Dart", "Next.js", "React", "TypeScript", 
  "JavaScript", "Python", "Django", "Firebase", "Supabase", 
  "PostgreSQL", "SQLite", "TailwindCSS", "REST API", "Git", 
  "GitHub", "Figma"
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-[#121212]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Core Technologies</h2>
      </motion.div>

      <motion.div 
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="px-6 py-3 md:px-8 md:py-4 rounded-full glass border border-white/10 text-white/80 font-medium text-lg cursor-default transition-colors"
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
