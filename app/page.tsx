'use client';

import React, { useState } from 'react';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative bg-[#121212]">
      {/* Preloader */}
      <Loader onLoaded={() => setIsLoaded(true)} />
      
      {/* Background Noise Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
      </div>

      {isLoaded && (
        <>
          <Navbar />
          
          <div className="relative z-10 flex flex-col">
            
            {/* Scrollytelling Section */}
            <div className="relative w-full">
              <ScrollyCanvas />
              <Overlay />
            </div>

            <div className="relative z-20 bg-[#121212]">
              <Projects />
              <About />
              <Skills />
              <Experience />
              <Contact />
              <Footer />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
