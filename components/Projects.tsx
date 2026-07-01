'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "ChargeFinder Pondy",
    subtitle: "Premium EV charging platform",
    description: "End-to-end platform for locating EV chargers, booking slots, and processing payments via QR. Includes a full admin dashboard.",
    tech: ["Flutter", "Firebase", "Google Maps", "Payments"],
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "Inspectra",
    subtitle: "Enterprise Safety Inspection",
    description: "Robust offline-first application for complex safety audits with role-based auth, dynamic checklists, and automated PDF reports.",
    tech: ["Flutter", "SQLite", "Django", "Offline First"],
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "AssetGuard",
    subtitle: "Rental Asset Management",
    description: "Hardware tracking system with QR/Barcode integration, maintenance scheduling, and comprehensive reporting analytics.",
    tech: ["Next.js", "Flutter", "PostgreSQL", "Supabase"],
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    title: "OneCampus ERP",
    subtitle: "College Management System",
    description: "Centralized hub for student portals, attendance tracking, timetable management, fees processing, and real-time notifications.",
    tech: ["Flutter", "Django REST", "PostgreSQL"],
    color: "from-indigo-500/20 to-blue-500/20"
  }
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto relative z-10 bg-[#121212]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="mb-20"
      >
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4">Selected Work</h2>
        <div className="w-24 h-1 bg-white/20 rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative group overflow-hidden rounded-3xl glass-card border border-white/10 p-8 h-[450px] flex flex-col justify-between`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
      
      <div className="z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
          <motion.div 
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>
        <p className="text-[#0070f3] font-medium mb-6 uppercase tracking-wider text-sm">{project.subtitle}</p>
        <p className="text-white/60 leading-relaxed text-lg max-w-md">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 z-10 mt-8">
        {project.tech.map((tech: string, i: number) => (
          <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
