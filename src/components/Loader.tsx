'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({
  progress,
  isComplete,
}: {
  progress: number;
  isComplete: boolean;
}) {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#121212' }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(20px)',
          }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] as const,
          }}
        >
          {/* Noise texture overlay */}
          <div className="noise-overlay" />

          {/* Floating gradient orbs */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 400,
              height: 400,
              background:
                'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
              top: '20%',
              left: '15%',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 350,
              height: 350,
              background:
                'radial-gradient(circle, rgba(147,197,253,0.06) 0%, transparent 70%)',
              bottom: '15%',
              right: '20%',
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, -25, 35, 0],
              y: [0, 30, -25, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 250,
              height: 250,
              background:
                'radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)',
              top: '50%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -20, 35, 0],
              scale: [1, 1.2, 0.85, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* SUR typography */}
            <motion.h1
              className="select-none text-[7rem] font-bold leading-none tracking-tight sm:text-[9rem] md:text-[11rem]"
              style={{
                background:
                  'linear-gradient(135deg, #ffffff 0%, #a0a0a0 40%, #ffffff 60%, #707070 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
            >
              SURENDER
            </motion.h1>

            {/* Loading text */}
            <motion.p
              className="text-xs uppercase tracking-[0.35em] text-neutral-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              loading...
            </motion.p>

            {/* Percentage counter */}
            <motion.span
              className="mt-2 text-sm font-light text-neutral-400"
              style={{ fontVariantNumeric: 'tabular-nums' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {clampedProgress}%
            </motion.span>

            {/* Progress bar */}
            <motion.div
              className="mt-1 h-[1px] w-48 overflow-hidden rounded-full sm:w-56"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div
                className="h-full origin-left rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)',
                  boxShadow: '0 0 12px rgba(59,130,246,0.5)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: clampedProgress / 100 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </div>

          {/* Bottom edge vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 50%, #121212 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
