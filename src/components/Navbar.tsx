'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';

/* ───────────────────────── constants ───────────────────────── */

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
] as const;

const RESUME_LINK = '/resume.pdf'; // change to your actual resume URL

const SCROLL_THRESHOLD = 100;

/* ───────────────────────── helpers ──────────────────────────── */

function scrollToSection(href: string) {
  if (href === '#home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (href.startsWith('#')) {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

/* ───────────────────── underline link ──────────────────────── */

function NavLink({
  label,
  href,
  onClick,
  className = '',
}: {
  label: string;
  href: string;
  onClick?: () => void;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      scrollToSection(href);
      onClick?.();
    },
    [href, onClick],
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      data-magnetic="true"
      data-cursor="pointer"
      className={`group relative text-[13px] font-medium uppercase tracking-wider-custom text-white/60 transition-colors duration-300 hover:text-white ${className}`}
    >
      {label}
      {/* animated underline */}
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-white"
        initial={{ width: 0 }}
        whileHover={prefersReduced ? {} : { width: '100%' }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as const }}
        style={{ width: 0 }}
      />
      {/* fallback CSS underline for group‑hover (ensures non‑JS hover works) */}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

/* ───────────────── mobile overlay variants ─────────────────── */

const overlayVariants = {
  closed: {
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] as const },
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

const mobileNavContainerVariants = {
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, y: 30, filter: 'blur(8px)' },
  open: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
  },
};

/* ───────────────────── hamburger icon ──────────────────────── */

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex h-5 w-6 flex-col items-end justify-center gap-[5px]">
      <motion.span
        className="block h-px origin-center bg-white"
        animate={
          isOpen
            ? { rotate: 45, y: 3, width: '100%' }
            : { rotate: 0, y: 0, width: '100%' }
        }
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as const }}
        style={{ width: '100%' }}
      />
      <motion.span
        className="block h-px origin-center bg-white"
        animate={
          isOpen
            ? { rotate: -45, y: -3, width: '100%' }
            : { rotate: 0, y: 0, width: '75%' }
        }
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] as const }}
        style={{ width: isOpen ? '100%' : '75%' }}
      />
    </div>
  );
}

/* ═══════════════════════ NAVBAR ═══════════════════════════════ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  /* ── scroll progress ── */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  /* ── scroll listener for shrink ── */
  useMotionValueEvent(scrollYProgress, 'change', () => {
    const y = window.scrollY;
    setScrolled(y > SCROLL_THRESHOLD);
  });

  /* ── lock body scroll when mobile menu open ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ── close mobile menu on resize to desktop ── */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── close mobile menu on escape ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* ─── scroll progress bar ─── */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-[1px] origin-left bg-accent"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* ─── navbar ─── */}
      <motion.nav
        ref={navRef}
        initial={false}
        animate={scrolled ? 'scrolled' : 'top'}
        variants={{
          top: {
            paddingTop: 24,
            paddingBottom: 24,
          },
          scrolled: {
            paddingTop: 12,
            paddingBottom: 12,
          },
        }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const }
        }
        className="fixed left-0 right-0 top-[1px] z-40 bg-transparent"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 3xl:max-w-[1600px]">
          {/* ── logo ── */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
              setMobileOpen(false);
            }}
            data-magnetic="true"
            data-cursor="pointer"
            className="relative z-50 select-none text-base font-bold tracking-widest text-white"
            aria-label="Scroll to top"
          >
            SURENDER
          </a>

          {/* ── desktop links ── */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={label} label={label} href={href} />
            ))}

            {/* resume – external / download */}
            <a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              data-cursor="pointer"
              className="group relative ml-2 text-[13px] font-medium uppercase tracking-wider-custom text-white/60 transition-colors duration-300 hover:text-white"
            >
              Résumé
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* ── mobile hamburger ── */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            data-cursor="pointer"
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon isOpen={mobileOpen} />
          </button>
        </div>
      </motion.nav>

      {/* ─── mobile overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl md:hidden"
            aria-label="Mobile navigation menu"
          >
            <motion.ul
              variants={mobileNavContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-8"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.li key={label} variants={mobileLinkVariants}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(href);
                      setMobileOpen(false);
                    }}
                    data-magnetic="true"
                    data-cursor="pointer"
                    className="text-2xl font-light tracking-widest text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}

              {/* resume – mobile */}
              <motion.li variants={mobileLinkVariants}>
                <a
                  href={RESUME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnetic="true"
                  data-cursor="pointer"
                  className="text-2xl font-light tracking-widest text-white/70 transition-colors duration-300 hover:text-white"
                >
                  Résumé
                </a>
              </motion.li>
            </motion.ul>

            {/* subtle decorative ring */}
            <motion.div
              className="pointer-events-none absolute h-[360px] w-[360px] rounded-full border border-white/[0.04]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
