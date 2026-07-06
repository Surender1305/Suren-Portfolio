'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type CursorVariant = 'default' | 'pointer' | 'text';

// ---------------------------------------------------------------------------
// Spring configs – the ring intentionally lags the dot for a luxurious feel
// ---------------------------------------------------------------------------
const DOT_SPRING = { damping: 40, stiffness: 600, mass: 0.15 };
const RING_SPRING = { damping: 28, stiffness: 260, mass: 0.45 };

// ---------------------------------------------------------------------------
// Sizes (in px)
// ---------------------------------------------------------------------------
const DOT_SIZE = 8;
const RING_SIZE = 32;
const RING_POINTER_SIZE = 56;
const RING_STROKE = 1.5;

// ---------------------------------------------------------------------------
// Magnetic helpers
// ---------------------------------------------------------------------------
const MAGNETIC_THRESHOLD = 120; // px distance to start pulling
const MAGNETIC_STRENGTH = 0.35; // 0‑1 how strongly the element follows

function distanceBetween(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Cursor() {
  // Track whether the device has a fine pointer (mouse)
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const prefersReducedMotion = useRef(false);

  const variantRef = useRef<CursorVariant>('default');
  const magneticsRef = useRef<HTMLElement[]>([]);
  const lastQueryTime = useRef(0);

  // Raw mouse position – drives the dot directly
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smoothed via spring – drives the ring (delayed follow)
  const ringX = useSpring(mouseX, RING_SPRING);
  const ringY = useSpring(mouseY, RING_SPRING);

  // Dot uses its own spring (snappier than the ring)
  const dotX = useSpring(mouseX, DOT_SPRING);
  const dotY = useSpring(mouseY, DOT_SPRING);

  // -----------------------------------------------------------------------
  // Magnetic effect bookkeeping
  // -----------------------------------------------------------------------
  const activeMagnetics = useRef<Map<HTMLElement, { ox: number; oy: number }>>(
    new Map(),
  );

  const resetMagnetics = useCallback(() => {
    activeMagnetics.current.forEach((origin, el) => {
      el.style.transform = '';
      el.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
    });
    activeMagnetics.current.clear();
  }, []);

  // -----------------------------------------------------------------------
  // Mouse‑move handler
  // -----------------------------------------------------------------------
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // --- Determine cursor variant from hovered element ---
      const target = e.target as HTMLElement | null;
      let newVariant: CursorVariant = 'default';
      if (target) {
        const cursorAttr = target.closest<HTMLElement>('[data-cursor]');
        if (cursorAttr) {
          const val = cursorAttr.getAttribute('data-cursor') as CursorVariant;
          newVariant = val === 'pointer' || val === 'text' ? val : 'default';
        } else {
          // Fallback: check if the element is natively interactive
          const interactive = target.closest(
            'a, button, [role="button"], input, textarea, select, label',
          );
          newVariant = interactive ? 'pointer' : 'default';
        }
      }

      // ONLY update React state if the variant actually changed!
      if (newVariant !== variantRef.current) {
        variantRef.current = newVariant;
        setVariant(newVariant);
      }

      // --- Magnetic effect ---
      if (prefersReducedMotion.current) return;

      // Cache DOM queries for magnetic elements once per second to prevent layout thrashing
      const now = Date.now();
      if (now - lastQueryTime.current > 1000) {
        magneticsRef.current = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic="true"]'));
        lastQueryTime.current = now;
      }

      magneticsRef.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = distanceBetween(e.clientX, e.clientY, cx, cy);

        if (dist < MAGNETIC_THRESHOLD) {
          const pull = 1 - dist / MAGNETIC_THRESHOLD; // 0→1 as we get closer
          const tx = (e.clientX - cx) * MAGNETIC_STRENGTH * pull;
          const ty = (e.clientY - cy) * MAGNETIC_STRENGTH * pull;
          el.style.transition = 'transform 0.15s ease-out';
          el.style.transform = `translate(${tx}px, ${ty}px)`;
          activeMagnetics.current.set(el, { ox: cx, oy: cy });
        } else if (activeMagnetics.current.has(el)) {
          el.style.transform = '';
          el.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
          activeMagnetics.current.delete(el);
        }
      });
    },
    [mouseX, mouseY, isVisible],
  );

  // -----------------------------------------------------------------------
  // Lifecycle
  // -----------------------------------------------------------------------
  useEffect(() => {
    // Detect fine pointer (i.e. mouse)
    const mql = window.matchMedia('(pointer: fine)');
    setHasFinePointer(mql.matches);
    const onPointerChange = (e: MediaQueryListEvent) =>
      setHasFinePointer(e.matches);
    mql.addEventListener('change', onPointerChange);

    // Detect reduced‑motion preference
    const motionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = motionMql.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    motionMql.addEventListener('change', onMotionChange);

    return () => {
      mql.removeEventListener('change', onPointerChange);
      motionMql.removeEventListener('change', onMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    // Hide default cursor globally
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', () => setIsVisible(false));
    window.addEventListener('mouseenter', () => setIsVisible(true));

    return () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', () => setIsVisible(false));
      window.removeEventListener('mouseenter', () => setIsVisible(true));
      resetMagnetics();
    };
  }, [hasFinePointer, onMouseMove, resetMagnetics]);

  // Don't render on touch devices
  if (!hasFinePointer) return null;

  // -----------------------------------------------------------------------
  // Variant‑driven styles
  // -----------------------------------------------------------------------
  const isPointer = variant === 'pointer';
  const isText = variant === 'text';

  const ringSize = isPointer ? RING_POINTER_SIZE : RING_SIZE;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* ─── Inner Dot ──────────────────────────────────── */}
          <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              x: dotX,
              y: dotY,
              width: DOT_SIZE,
              height: DOT_SIZE,
              marginLeft: -DOT_SIZE / 2,
              marginTop: -DOT_SIZE / 2,
              zIndex: 9999,
              mixBlendMode: 'difference',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isText ? 0 : 1,
              opacity: isText ? 0 : 1,
              backgroundColor: '#ffffff',
              boxShadow: isPointer
                ? '0 0 12px 4px rgba(59,130,246,0.6), 0 0 24px 8px rgba(59,130,246,0.25)'
                : '0 0 8px 2px rgba(59,130,246,0.35), 0 0 16px 4px rgba(59,130,246,0.12)',
            }}
            transition={{
              scale: { type: 'spring', damping: 20, stiffness: 300 },
              opacity: { duration: 0.15 },
              boxShadow: { duration: 0.3 },
            }}
          />

          {/* ─── Outer Ring ─────────────────────────────────── */}
          <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              x: ringX,
              y: ringY,
              zIndex: 9999,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              width: isText ? 3 : ringSize,
              height: isText ? 32 : ringSize,
              marginLeft: isText ? -1.5 : -ringSize / 2,
              marginTop: isText ? -16 : -ringSize / 2,
              scale: 1,
              opacity: 1,
              borderRadius: isText ? '1px' : '50%',
              border: isText
                ? 'none'
                : `${RING_STROKE}px solid rgba(255,255,255,${isPointer ? 0.6 : 0.35})`,
              backgroundColor: isText
                ? 'rgba(255,255,255,0.85)'
                : 'transparent',
              boxShadow: isPointer
                ? '0 0 20px 6px rgba(59,130,246,0.3), 0 0 40px 12px rgba(59,130,246,0.1)'
                : isText
                  ? '0 0 6px 1px rgba(59,130,246,0.25)'
                  : 'none',
            }}
            transition={{
              width: { type: 'spring', damping: 22, stiffness: 250 },
              height: { type: 'spring', damping: 22, stiffness: 250 },
              marginLeft: { type: 'spring', damping: 22, stiffness: 250 },
              marginTop: { type: 'spring', damping: 22, stiffness: 250 },
              borderRadius: { duration: 0.2 },
              border: { duration: 0.25 },
              backgroundColor: { duration: 0.2 },
              boxShadow: { duration: 0.35 },
              scale: { type: 'spring', damping: 20, stiffness: 300 },
              opacity: { duration: 0.2 },
            }}
          />

          {/* ─── Glow halo (visible in pointer mode) ────────── */}
          <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 rounded-full pointer-events-none"
            style={{
              x: ringX,
              y: ringY,
              zIndex: 9998,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              width: isPointer ? RING_POINTER_SIZE + 24 : 0,
              height: isPointer ? RING_POINTER_SIZE + 24 : 0,
              marginLeft: isPointer ? -(RING_POINTER_SIZE + 24) / 2 : 0,
              marginTop: isPointer ? -(RING_POINTER_SIZE + 24) / 2 : 0,
              scale: isPointer ? 1 : 0,
              opacity: isPointer ? 0.35 : 0,
              background:
                'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
            }}
            transition={{
              scale: { type: 'spring', damping: 20, stiffness: 200 },
              opacity: { duration: 0.35 },
              width: { type: 'spring', damping: 22, stiffness: 250 },
              height: { type: 'spring', damping: 22, stiffness: 250 },
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
