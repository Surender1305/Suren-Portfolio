'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Project Data ─── */
const projects = [
  {
    number: '01',
    name: 'Inspectra AI',
    description: 'AI-powered enterprise safety inspection platform with automated computer vision defect detection, NLP voice-to-report logs, and offline audits.',
    tags: ['Flutter', 'SQLite', 'PyTorch Mobile', 'OpenAI API', 'NLP', 'Django REST'],
  },
  {
    number: '02',
    name: 'AssetGuard Smart Logs',
    description: 'Intelligent rental asset management featuring LLM-driven anomaly detection in maintenance logs, QR tracking, and predictive lifespan analysis.',
    tags: ['Python', 'FastAPI', 'LangChain', 'OpenAI API', 'ChromaDB', 'Supabase'],
  },
  {
    number: '03',
    name: 'ChargeFinder Smart Route',
    description: 'EV charging platform powered by an AI recommendation system predicting station traffic, pricing, and scheduling optimal multi-stop charging routes.',
    tags: ['Flutter', 'Machine Learning', 'FastAPI', 'Google Maps API', 'Firebase'],
  },
  {
    number: '04',
    name: 'CognitiveCampus ERP',
    description: 'Next-gen college ERP featuring edge-AI facial recognition attendance, automated smart class scheduling, and predictive grade analysis.',
    tags: ['Flutter', 'TensorFlow Lite', 'Django REST', 'Push Notifications', 'PostgreSQL'],
  },
];

/* ─── Ease Curves ─── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Tilt Card ─── */
function ProjectCard({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      data-cursor="pointer"
      className="group relative"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl transition-colors duration-500 sm:p-8"
        whileHover={{
          scale: 1.02,
          borderColor: 'rgba(59, 130, 246, 0.25)',
          boxShadow:
            '0 0 40px rgba(59, 130, 246, 0.08), 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
      >
        {/* ── Hover gradient overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0) 50%, rgba(147, 197, 253, 0.04) 100%)',
          }}
        />

        {/* ── Top shine line ── */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)',
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* Number */}
          <span
            className="select-none text-5xl font-bold leading-none tracking-tight text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.1] sm:text-6xl"
            aria-hidden="true"
          >
            {project.number}
          </span>

          {/* Name */}
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {project.name}
          </h3>

          {/* Description */}
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400 sm:text-[0.938rem]">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1 text-[0.688rem] font-medium tracking-wide text-neutral-400 transition-colors duration-300 group-hover:border-white/[0.1] group-hover:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom reveal arrow */}
          <div className="mt-2 flex items-center gap-2 text-neutral-500 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1">
            <span className="text-xs font-medium uppercase tracking-widest">
              View Project
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-neutral-500"
              aria-hidden="true"
            >
              <path
                d="M1 7h12m0 0L8 2.5M13 7l-5 4.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── Corner accent dot ── */}
        <div
          className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: '#3b82f6',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
          }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative"
      aria-label="Selected projects"
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 700,
          height: 700,
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ── */}
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-neutral-500">
            Featured Projects
          </p>
          <h2 className="text-gradient text-5xl font-bold tracking-tight md:text-7xl">
            Selected Work
          </h2>
        </motion.div>

        {/* ── Carousel Marquee ── */}
        <div className="overflow-hidden flex w-full relative pb-8">
          <motion.div
            className="flex w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
          >
            {[0, 1].map((set) => (
              <div key={set} className="flex gap-4 sm:gap-6 pr-4 sm:pr-6">
                {projects.map((project) => (
                  <div
                    key={project.number}
                    className="shrink-0 w-[85vw] sm:w-[400px] md:w-[500px]"
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
