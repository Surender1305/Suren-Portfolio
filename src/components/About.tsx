'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/* ─── Pin Icon (inline SVG to avoid external deps) ─── */
function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ─── Animation helpers ─── */
const fadeUp = (delay: number, prefersReduced: boolean | null) => ({
  initial: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
  animate: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
  transition: prefersReduced
    ? { duration: 0 }
    : {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      },
});

const lineDraw = (prefersReduced: boolean | null) => ({
  initial: prefersReduced ? { scaleY: 1 } : { scaleY: 0 },
  animate: prefersReduced ? { scaleY: 1 } : { scaleY: 1 },
  transition: prefersReduced
    ? { duration: 0 }
    : {
        duration: 1.2,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1] as const,
      },
});

/* ─── Component ─── */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      aria-label="About Me"
    >
      {/* ── Subtle radial glow background ── */}
      <div
        className="pointer-events-none absolute -top-[40%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.035]"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0">
          {/* ─── Left : Body text ─── */}
          <div className="flex flex-col justify-center md:pr-16 lg:pr-24 space-y-6">
            <motion.h2
              {...fadeUp(0, prefersReduced)}
              animate={isInView ? fadeUp(0, prefersReduced).animate : fadeUp(0, prefersReduced).initial}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 text-gradient"
            >
              About Me
            </motion.h2>

            <motion.p
              {...fadeUp(0.15, prefersReduced)}
              animate={isInView ? fadeUp(0.15, prefersReduced).animate : fadeUp(0.15, prefersReduced).initial}
              className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-foreground"
            >
              I&apos;m Surender, a developer passionate about blending design
              and engineering.
            </motion.p>

            <motion.p
              {...fadeUp(0.3, prefersReduced)}
              animate={isInView ? fadeUp(0.3, prefersReduced).animate : fadeUp(0.3, prefersReduced).initial}
              className="text-base md:text-lg leading-relaxed text-muted"
            >
              I build Flutter applications, full-stack systems, AI-powered
              tools, and premium web experiences.
            </motion.p>

            <motion.p
              {...fadeUp(0.45, prefersReduced)}
              animate={isInView ? fadeUp(0.45, prefersReduced).animate : fadeUp(0.45, prefersReduced).initial}
              className="text-base md:text-lg leading-relaxed text-muted"
            >
              I enjoy transforming complex problems into elegant products with
              modern UI and smooth interactions.
            </motion.p>

            {/* ── Location badge (mobile only) ── */}
            <motion.div
              {...fadeUp(0.6, prefersReduced)}
              animate={isInView ? fadeUp(0.6, prefersReduced).animate : fadeUp(0.6, prefersReduced).initial}
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-glass-border bg-glass-bg px-4 py-2 md:hidden"
            >
              <PinIcon className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium tracking-wider-custom uppercase text-muted">
                Puducherry, India
              </span>
            </motion.div>
          </div>

          {/* ─── Decorative vertical divider (desktop) ─── */}
          <motion.div
            {...lineDraw(prefersReduced)}
            animate={isInView ? lineDraw(prefersReduced).animate : lineDraw(prefersReduced).initial}
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top md:block"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent 100%)',
            }}
            aria-hidden="true"
          />

          {/* ─── Right : Full Profile Image ─── */}
          <div className="flex flex-col justify-center items-center md:items-end md:pl-16 lg:pl-24">
            <motion.div
              {...fadeUp(0.15, prefersReduced)}
              animate={isInView ? fadeUp(0.15, prefersReduced).animate : fadeUp(0.15, prefersReduced).initial}
              className="relative w-full max-w-[340px] md:max-w-[380px] rounded-2xl overflow-hidden border border-glass-border bg-glass-bg shadow-2xl group"
            >
              <Image
                src="/suren.png"
                alt="Surender S"
                width={800}
                height={800}
                priority
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02] grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
