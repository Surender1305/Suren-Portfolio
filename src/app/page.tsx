'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import Cursor from '@/components/Cursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollyCanvas from '@/components/ScrollyCanvas';

// Lazy-loaded sections for performance
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });



function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `/sequence/frame_${padded}_delay-0.066s.png`;
}

export default function Home() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const lenisRef = useRef<InstanceType<typeof import('@studio-freight/lenis')['default']> | null>(null);

  // Preload image sequence
  useEffect(() => {
    let mounted = true;
    let loaded = 0;
    const CRITICAL_FRAMES = 15;

    const preloadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          if (mounted) {
            setLoadProgress(Math.min(100, Math.round((loaded / CRITICAL_FRAMES) * 100)));
          }
          resolve();
        };
        img.onerror = () => {
          loaded++;
          if (mounted) {
            setLoadProgress(Math.min(100, Math.round((loaded / CRITICAL_FRAMES) * 100)));
          }
          resolve();
        };
        img.src = getFrameUrl(index);
      });
    };

    // Load critical frames quickly
    const loadBatch = async () => {
      const batchSize = 5;
      for (let i = 0; i < CRITICAL_FRAMES; i += batchSize) {
        const batch = Array.from(
          { length: Math.min(batchSize, CRITICAL_FRAMES - i) },
          (_, j) => preloadFrame(i + j)
        );
        await Promise.all(batch);
      }
      if (mounted) {
        setIsLoaded(true);
        // Delay to allow loader exit animation
        setTimeout(() => {
          setShowContent(true);
        }, 1000);
      }
    };

    loadBatch();

    return () => {
      mounted = false;
    };
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!showContent) return;

    let raf: number;
    let lenis: InstanceType<typeof import('@studio-freight/lenis')['default']> | null = null;

    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.1,
        duration: 1.2,
      });
      lenisRef.current = lenis;

      function animate(time: number) {
        lenis?.raf(time);
        raf = requestAnimationFrame(animate);
      }
      raf = requestAnimationFrame(animate);
    };

    initLenis();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [showContent]);

  return (
    <main className="relative">
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {!isLoaded && <Loader progress={loadProgress} isComplete={isLoaded} />}
      </AnimatePresence>

      {/* Custom Cursor */}
      {showContent && <Cursor />}

      {/* Main Content */}
      {showContent && (
        <>
          <Navbar />
          <Hero />
          <ScrollyCanvas />
          
          {/* Transition from canvas to projects */}
          <div className="relative z-10">
            <div className="h-32 bg-gradient-to-b from-transparent to-background" />
            <Projects />
            <About />
            <Skills />
            <Experience />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
