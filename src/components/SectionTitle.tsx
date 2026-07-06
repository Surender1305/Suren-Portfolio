'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
}

const alignmentClasses: Record<string, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export default function SectionTitle({
  title,
  subtitle,
  align = 'left',
}: SectionTitleProps) {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${alignmentClasses[align]}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {subtitle && (
        <motion.span
          className="text-sm md:text-base text-muted uppercase tracking-widest-custom mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
        >
          {subtitle}
        </motion.span>
      )}

      <motion.h2
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
      >
        {title}
      </motion.h2>

      <motion.div
        className="w-12 h-[1px] mt-6 bg-gradient-to-r from-white/80 via-white/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
        }
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
        style={{ originX: align === 'right' ? 1 : 0 }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
