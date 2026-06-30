'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Projects', 'About', 'Experience', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className={`flex items-center justify-between transition-all duration-500 rounded-full px-6 md:px-8 ${
        isScrolled ? 'glass py-3 w-[90%] md:w-auto gap-12' : 'w-full max-w-7xl px-8 md:px-12 py-2'
      }`}>
        <div className="font-bold text-xl tracking-tighter">
          SUREN<span className="text-[#0070f3]">.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className="relative opacity-70 hover:opacity-100 transition-opacity hover:text-[#0070f3]"
            >
              {link}
            </a>
          ))}
        </div>

        <a 
          href="/resume.pdf"
          target="_blank"
          className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-opacity-90 transition-colors"
        >
          Resume
        </a>
      </div>
    </motion.nav>
  );
}
