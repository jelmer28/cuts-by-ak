'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  onBookClick: () => void;
}

export function Navigation({ onBookClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        raf = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 px-12 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-bg/85 backdrop-blur-xl border-b border-line'
          : 'py-6 bg-transparent'
      }`}
      style={{
        paddingTop: scrolled
          ? `max(1rem, calc(env(safe-area-inset-top) + 0.5rem))`
          : `max(1.5rem, calc(env(safe-area-inset-top) + 1rem))`,
        paddingLeft: `max(3rem, env(safe-area-inset-left))`,
        paddingRight: `max(3rem, env(safe-area-inset-right))`,
      }}
    >
      <div className="flex justify-between items-center">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-2xl font-semibold italic tracking-[0.02em] text-ink">
            Cuts by AK
          </span>
          <span className="hidden md:block w-px h-[18px] bg-muted-dim" />
          <span className="hidden md:block text-[0.65rem] tracking-[0.3em] uppercase text-muted font-normal">
            Heerenveen
          </span>
        </a>

        <ul className="hidden md:flex gap-12 list-none text-[0.72rem] font-normal tracking-[0.22em] uppercase text-muted">
          <li>
            <a href="#results" className="hover:text-ink transition-colors duration-300">
              Resultaten
            </a>
          </li>
          <li>
            <a href="#reviews" className="hover:text-ink transition-colors duration-300">
              Reviews
            </a>
          </li>
          <li>
            <a href="#barber" className="hover:text-ink transition-colors duration-300">
              De Barber
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-ink transition-colors duration-300">
              Contact
            </a>
          </li>
        </ul>

        <button
          onClick={onBookClick}
          className="px-4 py-3 md:px-6 md:py-3 text-[0.62rem] md:text-[0.7rem] font-medium tracking-[0.18em] md:tracking-[0.22em] uppercase text-bg bg-ink border border-ink hover:bg-transparent hover:text-ink transition-all duration-300"
        >
          Boek nu
        </button>
      </div>
    </motion.nav>
  );
}
