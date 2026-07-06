'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';

/* ─── Animation Variants ─── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
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

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};

/* ─── Icon Components ─── */
function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
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
   Contact Component
   ═══════════════════════════════════════ */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  const variants = prefersReduced ? reducedVariants : itemVariants;

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-label="Contact"
      className="section-padding relative"
    >
      {/* ── Line Divider ── */}
      <div className="line-divider mb-20 md:mb-28" aria-hidden="true" />

      {/* ── Content ── */}
      <motion.div
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* ── Heading Line 1 ── */}
        <motion.div variants={variants} className="overflow-clip">
          <h2 className="text-5xl font-bold leading-[1.1] tracking-tight text-gradient md:text-7xl lg:text-8xl">
            Let&apos;s build something
          </h2>
        </motion.div>

        {/* ── Heading Line 2 ── */}
        <motion.div variants={variants} className="overflow-clip">
          <span className="text-5xl font-bold leading-[1.1] tracking-tight text-gradient-accent md:text-7xl lg:text-8xl">
            amazing.
          </span>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={variants}
          className="mt-6 max-w-md text-lg leading-relaxed text-muted md:mt-8 md:text-xl"
          style={{ color: 'var(--muted)' }}
        >
          Have a project in mind? Let&apos;s talk.
        </motion.p>

        {/* ── Contact Buttons ── */}
        <motion.div
          variants={variants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-14"
        >
          {/* Email */}
          <a
            href="mailto:surender@example.com"
            data-cursor="pointer"
            data-magnetic="true"
            className="btn-premium btn-primary"
            aria-label="Get in Touch via email"
          >
            <MailIcon />
            <span>Get in Touch</span>
          </a>

          {/* GitHub */}
          <motion.a
            href="https://github.com/Surender1305"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            data-magnetic="true"
            className="btn-premium"
            aria-label="Visit GitHub profile"
            whileHover={prefersReduced ? {} : { scale: 1.05 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <GitHubIcon />
            <span>GitHub</span>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com/in/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            data-magnetic="true"
            className="btn-premium"
            aria-label="Visit LinkedIn profile"
            whileHover={prefersReduced ? {} : { scale: 1.05 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </motion.a>

          {/* Resume Download */}
          <motion.a
            href="/resume.pdf"
            download
            data-cursor="pointer"
            data-magnetic="true"
            className="btn-premium"
            aria-label="Download resume"
            whileHover={prefersReduced ? {} : { scale: 1.05 }}
            whileTap={prefersReduced ? {} : { scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <DownloadIcon />
            <span>Resume</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
