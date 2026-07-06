'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full border-t border-white/[0.08] py-8"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6">
        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          data-cursor="pointer"
          aria-label="Back to top"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors duration-300 hover:text-white/80"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]">
            <ArrowUp className="h-3.5 w-3.5" />
          </span>
          <span className="hidden sm:inline">Back to top</span>
        </motion.button>

        {/* Divider */}
        <div className="h-px w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Credits */}
        <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span className="text-sm text-white/40">Designed & Developed by</span>
          <span className="text-sm font-medium text-white">Surender S</span>
          <span className="mx-1 inline-block h-1 w-1 rounded-full bg-white/20" />
          <span className="text-sm text-white/40">{currentYear}</span>
        </div>
      </div>
    </motion.footer>
  );
}
