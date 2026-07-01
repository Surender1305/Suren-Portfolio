'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const FRAME_COUNT = 150;

// Format frame index to match 'frame_000_delay-0.066s.png'
const getFramePath = (index: number) => {
  const paddedIndex = index.toString().padStart(3, '0');
  return `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Track scroll specifically for this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    const isMobileDevice = window.innerWidth < 768;
    const framesToLoad = isMobileDevice ? 1 : FRAME_COUNT;
    let loadedCount = 0;

    for (let i = 0; i < framesToLoad; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      
      img.onload = () => {
        loadedCount++;
        // Render first frame immediately
        if (i === 0 && canvasRef.current) {
          requestAnimationFrame(() => renderFrame(img));
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
    
    // Re-render on resize
    const handleResize = () => {
      if (loadedImages[0]) {
        requestAnimationFrame(() => renderFrame(loadedImages[0]));
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderFrame = (img: HTMLImageElement) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    
    ctx.scale(dpr, dpr);
    
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    // Object-fit: cover logic
    const hRatio = displayWidth / img.width;
    const vRatio = displayHeight / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (displayWidth - img.width * ratio) / 2;
    const centerShift_y = (displayHeight - img.height * ratio) / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Map progress to frame index
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (images.length <= 1) return;
    
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    
    if (images[frameIndex]) {
      requestAnimationFrame(() => renderFrame(images[frameIndex]));
    }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[500vh]">
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}
