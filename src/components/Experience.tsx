'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── Data ─── */
const experiences = [
  {
    company: 'Bright Tech',
    role: 'Intern — Flutter Development',
    description:
      'Worked on Flutter development, building mobile applications and learning industry practices.',
  },
  {
    company: 'Freelance Mobile App Developer',
    role: 'Independent',
    description:
      'Built multiple production-grade apps including projects for US clients. Delivered complete Flutter applications with Firebase backends, payment integrations, and admin dashboards.',
  },
];

/* ─── Heatmap helpers ─── */
const ROWS = 7;
const COLS = 20;

function generateHeatmap(): number[][] {
  const grid: number[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const row: number[] = [];
    for (let c = 0; c < COLS; c++) {
      // weighted random: more empty, fewer bright
      const rand = Math.random();
      if (rand < 0.35) row.push(0);
      else if (rand < 0.6) row.push(0.15);
      else if (rand < 0.8) row.push(0.35);
      else if (rand < 0.93) row.push(0.6);
      else row.push(0.9);
    }
    grid.push(row);
  }
  return grid;
}

function cellColor(intensity: number): string {
  if (intensity === 0) return 'rgba(255,255,255,0.04)';
  // blend between blue-ish and green-ish depending on intensity
  const r = Math.round(30 + intensity * 10);
  const g = Math.round(80 + intensity * 120);
  const b = Math.round(140 + intensity * 60);
  return `rgba(${r},${g},${b},${0.25 + intensity * 0.55})`;
}

/* ─── Timeline Entry ─── */
function TimelineEntry({
  company,
  role,
  description,
  index,
}: {
  company: string;
  role: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="relative pl-10 pb-16 last:pb-0"
      initial={{ opacity: 0, x: -30, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }}
    >
      {/* Glowing dot */}
      <span
        className="absolute left-0 top-1.5 block h-2 w-2 rounded-full"
        style={{
          backgroundColor: 'var(--accent)',
          boxShadow:
            '0 0 6px rgba(59,130,246,0.6), 0 0 20px rgba(59,130,246,0.25)',
          transform: 'translateX(-3px)',
        }}
        aria-hidden="true"
      />

      <h3 className="text-lg font-bold text-white md:text-xl">{company}</h3>
      <p
        className="mt-1 text-sm font-medium tracking-wide"
        style={{ color: 'var(--accent)' }}
      >
        {role}
      </p>
      <p
        className="mt-3 max-w-lg text-sm leading-relaxed md:text-base"
        style={{ color: 'var(--muted)' }}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* ─── GitHub Section ─── */
function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const heatmap = useMemo(() => generateHeatmap(), []);

  return (
    <motion.div
      ref={ref}
      className="mt-24 md:mt-32"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <h3 className="mb-8 text-2xl font-bold text-white md:text-3xl">
        Open Source
      </h3>

      <div className="glass glow-border overflow-hidden p-6 sm:p-8">
        {/* Header row */}
        <div className="flex items-center gap-4">
          {/* GitHub SVG icon */}
          <svg
            className="h-8 w-8 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-white">GitHub</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              @Surender1305
            </p>
          </div>
        </div>

        {/* Contribution heatmap grid */}
        <div className="mt-6 overflow-x-auto">
          <div
            className="inline-grid gap-[3px]"
            style={{
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              gridAutoFlow: 'column',
              gridAutoColumns: 'min-content',
            }}
            role="img"
            aria-label="GitHub-style contribution heatmap visualization"
          >
            {heatmap.map((row, ri) =>
              row.map((intensity, ci) => (
                <motion.span
                  key={`${ri}-${ci}`}
                  className="block rounded-sm"
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: cellColor(intensity),
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1 } : {}
                  }
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + ci * 0.025 + ri * 0.01,
                    ease: 'easeOut',
                  }}
                  aria-hidden="true"
                />
              )),
            )}
          </div>
        </div>

        {/* Visit GitHub button */}
        <motion.a
          href="https://github.com/Surender1305"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-premium mt-8 inline-flex items-center gap-2 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Visit GitHub profile of Surender1305"
        >
          <span>Visit GitHub</span>
          <motion.svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ─── Experience Section ─── */
export default function Experience() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section
      id="experience"
      className="section-padding relative"
      aria-label="Experience"
    >
      {/* Heading */}
      <motion.h2
        ref={headingRef}
        className="text-gradient text-5xl font-bold md:text-7xl"
        initial={{ opacity: 0, y: 30 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94] as const,
        }}
      >
        Experience
      </motion.h2>

      {/* Timeline */}
      <div className="relative mt-16 md:mt-20">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: 2,
            background:
              'linear-gradient(180deg, var(--accent) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {experiences.map((exp, i) => (
          <TimelineEntry
            key={exp.company}
            company={exp.company}
            role={exp.role}
            description={exp.description}
            index={i}
          />
        ))}
      </div>

      {/* GitHub / Open Source */}
      <GitHubSection />
    </section>
  );
}
