'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const TOTAL_FRAMES = 150;
const FRAME_PATH = '/sequence/';

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `${FRAME_PATH}frame_${padded}_delay-0.066s.png`;
}

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Generate frame URLs
  const frameUrls = useMemo(() => {
    return Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i));
  }, []);

  // Preload all frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          if (isMounted && loaded === TOTAL_FRAMES) {
            framesRef.current = images;
            setIsLoaded(true);
          }
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    frameUrls.forEach((url, i) => {
      const img = new Image();
      images[i] = img;
      loadImage(url).then((loadedImg) => {
        images[i] = loadedImg;
      });
    });

    return () => {
      isMounted = false;
    };
  }, [frameUrls]);

  // Draw frame on canvas with object-fit: cover behavior
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = framesRef.current[index];

    if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;

    // Set canvas resolution for retina
    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      ctx.scale(dpr, dpr);
    }

    // Clear canvas
    ctx.clearRect(0, 0, displayW, displayH);

    // Calculate object-fit: cover dimensions
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = displayW / displayH;

    let drawW: number, drawH: number, offsetX: number, offsetY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider - fit by height
      drawH = displayH;
      drawW = displayH * imgRatio;
      offsetX = (displayW - drawW) / 2;
      offsetY = 0;
    } else {
      // Image is taller - fit by width
      drawW = displayW;
      drawH = displayW / imgRatio;
      offsetX = 0;
      offsetY = (displayH - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Render loop with requestAnimationFrame
  useEffect(() => {
    if (!isLoaded) return;

    const unsubscribe = frameIndex.on('change', (latest) => {
      const newFrame = Math.round(latest);
      if (newFrame !== currentFrameRef.current && newFrame >= 0 && newFrame < TOTAL_FRAMES) {
        currentFrameRef.current = newFrame;
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          drawFrame(newFrame);
        });
      }
    });

    // Draw first frame
    drawFrame(0);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
    };
  }, [isLoaded, frameIndex, drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        drawFrame(currentFrameRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '500vh' }}
      aria-label="Scrollytelling image sequence"
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />

        {/* Gradient overlays for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />

        {/* Text Overlays */}
        <Overlays scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ─── Text Overlays Component ─── */
interface OverlaysProps {
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function Overlays({ scrollProgress }: OverlaysProps) {
  // Overlay 1: 0% - Center
  const opacity1 = useTransform(scrollProgress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
  const y1 = useTransform(scrollProgress, [0, 0.08, 0.18, 0.25], [40, 0, 0, -40]);
  const scale1 = useTransform(scrollProgress, [0, 0.08, 0.18, 0.25], [0.95, 1, 1, 0.95]);

  // Overlay 2: 30% - Left
  const opacity2 = useTransform(scrollProgress, [0.22, 0.3, 0.42, 0.5], [0, 1, 1, 0]);
  const x2 = useTransform(scrollProgress, [0.22, 0.3, 0.42, 0.5], [-60, 0, 0, -60]);
  const blur2 = useTransform(scrollProgress, [0.22, 0.3, 0.42, 0.5], [10, 0, 0, 10]);

  // Overlay 3: 60% - Right
  const opacity3 = useTransform(scrollProgress, [0.5, 0.58, 0.68, 0.76], [0, 1, 1, 0]);
  const x3 = useTransform(scrollProgress, [0.5, 0.58, 0.68, 0.76], [60, 0, 0, 60]);
  const blur3 = useTransform(scrollProgress, [0.5, 0.58, 0.68, 0.76], [10, 0, 0, 10]);

  // Overlay 4: 90% - Center Bottom
  const opacity4 = useTransform(scrollProgress, [0.78, 0.86, 0.94, 1], [0, 1, 1, 0.8]);
  const y4 = useTransform(scrollProgress, [0.78, 0.86, 0.94, 1], [40, 0, 0, -20]);
  const scale4 = useTransform(scrollProgress, [0.78, 0.86, 0.94, 1], [0.9, 1, 1, 1.02]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Overlay 1 — Center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: opacity1, y: y1, scale: scale1 }}
      >
        <div className="glass-strong px-10 py-8 md:px-16 md:py-12 text-center max-w-2xl mx-auto">
          <p className="text-sm md:text-base uppercase tracking-widest-custom text-muted mb-3">
            Surender S
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient leading-tight">
            Creative Developer
          </h2>
        </div>
      </motion.div>

      {/* Overlay 2 — Left */}
      <motion.div
        className="absolute inset-0 flex items-center justify-start px-6 md:px-16 lg:px-24"
        style={{
          opacity: opacity2,
          x: x2,
          filter: useTransform(blur2, (v) => `blur(${v}px)`),
        }}
      >
        <div className="glass-strong px-8 py-6 md:px-12 md:py-10 max-w-lg">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gradient leading-tight">
            I build digital
            <br />
            experiences.
          </h2>
          <p className="text-muted text-sm md:text-base mt-4 tracking-wide-custom">
            From concept to deployment
          </p>
        </div>
      </motion.div>

      {/* Overlay 3 — Right */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24"
        style={{
          opacity: opacity3,
          x: x3,
          filter: useTransform(blur3, (v) => `blur(${v}px)`),
        }}
      >
        <div className="glass-strong px-8 py-6 md:px-12 md:py-10 max-w-lg text-right">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-gradient leading-tight">
            Bridging design
            <br />
            and engineering.
          </h2>
          <p className="text-muted text-sm md:text-base mt-4 tracking-wide-custom">
            Every interaction matters
          </p>
        </div>
      </motion.div>

      {/* Overlay 4 — Center Bottom */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-24 md:pb-32"
        style={{ opacity: opacity4, y: y4, scale: scale4 }}
      >
        <div className="glass-strong px-10 py-8 md:px-16 md:py-12 text-center max-w-xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gradient leading-tight">
            Every pixel
            <br />
            has purpose.
          </h2>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto mt-6" />
        </div>
      </motion.div>
    </div>
  );
}
