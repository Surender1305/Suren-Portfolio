'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    role: "Freelance Mobile App Developer",
    company: "Independent",
    period: "2024 - Present",
    description: "Built multiple production-grade apps including projects for US clients. Focused on performant Flutter applications and full-stack integrations.",
  },
  {
    role: "Programming Staff",
    company: "BrightTec",
    period: "2023 - 2024",
    description: "Developed software modules, instructed programming concepts, and built application features. Collaborated with teams to deliver robust software solutions and optimize performance.",
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-4xl mx-auto relative z-10 bg-[#121212]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">Experience</h2>
        <div className="w-24 h-1 bg-[#0070f3]/50 rounded-full" />
      </motion.div>

      <div ref={ref} className="relative border-l border-white/10 pl-8 md:pl-12 space-y-20">
        {experiences.map((exp, index) => (
          <ExperienceItem key={index} experience={exp} index={index} isInView={isInView} />
        ))}
      </div>
    </section>
  );
}

function ExperienceItem({ experience, index, isInView }: { experience: any, index: number, isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.76, 0, 0.24, 1] }}
      className="relative group"
    >
      {/* Timeline dot */}
      <div className="absolute -left-[37px] md:-left-[53px] top-2 w-4 h-4 rounded-full bg-[#121212] border-2 border-[#0070f3] group-hover:bg-[#0070f3] transition-colors duration-300" />
      
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
        <h3 className="text-2xl md:text-3xl font-bold text-white">{experience.role}</h3>
        <span className="text-[#0070f3] font-mono text-sm mt-2 md:mt-0 tracking-widest">{experience.period}</span>
      </div>
      
      <h4 className="text-xl text-white/60 font-medium mb-4">{experience.company}</h4>
      <p className="text-white/40 leading-relaxed max-w-2xl text-lg">
        {experience.description}
      </p>
    </motion.div>
  );
}
