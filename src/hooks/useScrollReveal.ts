'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrollRevealOptions {
  once?: boolean;
  margin?: string;
}

export function useScrollReveal(options?: ScrollRevealOptions) {
  const { once = true, margin = '-100px' } = options || {};
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as Exclude<Parameters<typeof useInView>[1], undefined>['margin'] });

  return { ref, isInView };
}
