'use client';

import { useMemo, useRef } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/* ─── Floating Particles ─── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  dx: number;
  dy: number;
  duration: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 2, // 2–4px
    opacity: Math.random() * 0.2 + 0.1, // 0.1–0.3
    dx: (Math.random() - 0.5) * 60, // drift range
    dy: (Math.random() - 0.5) * 60,
    duration: Math.random() * 10 + 15, // 15–25s
  }));
}

function FloatingParticles() {
  const prefersReduced = useReducedMotion();
  const particles = useMemo(() => generateParticles(25), []);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.dx, -p.dx * 0.6, 0],
            y: [0, p.dy, -p.dy * 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Aurora Glow Orbs ─── */
const auroraOrbs = [
  {
    color: 'rgba(59, 130, 246, 0.07)',
    size: 600,
    initialX: '20%',
    initialY: '30%',
    animX: [0, 80, -40, 0],
    animY: [0, -60, 50, 0],
    duration: 22,
  },
  {
    color: 'rgba(139, 92, 246, 0.05)',
    size: 500,
    initialX: '65%',
    initialY: '55%',
    animX: [0, -70, 30, 0],
    animY: [0, 40, -80, 0],
    duration: 26,
  },
  {
    color: 'rgba(59, 130, 246, 0.06)',
    size: 450,
    initialX: '45%',
    initialY: '15%',
    animX: [0, 50, -60, 0],
    animY: [0, 70, -30, 0],
    duration: 30,
  },
];

function AuroraGlow() {
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {auroraOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.initialX,
            top: orb.initialY,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  x: orb.animX,
                  y: orb.animY,
                }
          }
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Scroll Indicator ─── */
function ScrollIndicator() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 1 }}
    >
      <span className="text-[10px] uppercase tracking-[0.25em] text-muted/60">
        Scroll
      </span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted/50"
        animate={prefersReduced ? {} : { y: [0, 6, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path d="M7 10l5 5 5-5" />
      </motion.svg>
    </motion.div>
  );
}

/* ─── Staggered Fade-Up Variant ─── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* ─── Arrow & Download Icons ─── */
function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ═══════════════════════════════════════
   Hero Component
   ═══════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Hero introduction"
      className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden bg-background"
    >
      {/* ── Background layers ── */}
      <AuroraGlow />
      <FloatingParticles />

      {/* ── Radial vignette ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #121212 100%)',
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle: Hi, I'm */}
        <motion.p
          variants={itemVariants}
          className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-muted md:text-sm"
        >
          <span>Hi,</span>{' '}
          <span className="text-muted/70">I&apos;m</span>
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-gradient text-7xl font-bold leading-[0.95] tracking-tight md:text-8xl lg:text-9xl"
        >
          Surender.
        </motion.h1>

        {/* Roles */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-xl font-light tracking-wider text-muted md:text-2xl"
        >
          Creative Developer.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="mt-1 text-xl font-light tracking-wider text-muted md:text-2xl"
        >
          Flutter Developer.
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-md text-base leading-relaxed text-muted/70"
        >
          Building premium digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={handleScrollToProjects}
            data-cursor="pointer"
            data-magnetic="true"
            className="btn-premium btn-primary"
            aria-label="View projects"
          >
            <span>View Projects</span>
            <ArrowIcon />
          </button>

          <a
            href="/resume.pdf"
            download
            data-cursor="pointer"
            data-magnetic="true"
            className="btn-premium"
            aria-label="Download resume"
          >
            <span>Download Resume</span>
            <DownloadIcon />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
