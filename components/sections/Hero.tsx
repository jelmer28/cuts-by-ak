'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onBookClick: () => void;
}

export function Hero({ onBookClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktop || reducedMotion || !videoRef.current) return;

    const v = videoRef.current;
    const onCanPlay = () => {
      setVideoLoaded(true);
      v.play().catch(() => {});
    };
    v.addEventListener('canplay', onCanPlay, { once: true });

    // Timeout fallback: if video doesn't load in 4s, give up
    const timeout = setTimeout(() => {
      if (v.readyState < 3) v.removeAttribute('src');
    }, 4000);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative h-screen min-h-[600px] overflow-hidden flex items-end text-ink"
      style={{ height: '100dvh' }}
    >
      {/* Background media */}
      <div className="absolute inset-0 z-0">
        {/* Mobile + fallback image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1920&q=90')",
            backgroundPosition: 'center 30%',
            filter: 'grayscale(100%) contrast(1.05)',
          }}
        />
        {/* Desktop video */}
        <video
          ref={videoRef}
          className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ filter: 'grayscale(100%) contrast(1.05)' }}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1920&q=90"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-barber-styling-the-clients-hair-5236/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.2) 30%, rgba(10,10,10,0.4) 70%, rgba(10,10,10,0.95) 100%),
            linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0) 50%)
          `,
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] w-full px-5 md:px-12 pb-16 md:pb-24"
        style={{
          paddingBottom: `max(4rem, calc(env(safe-area-inset-bottom) + 3rem))`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="inline-flex items-center gap-3 mb-6 md:mb-8"
        >
          <span className="w-10 h-px bg-ink opacity-60" />
          <span className="text-[0.6rem] md:text-[0.7rem] font-normal tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-70">
            Est. Heerenveen · Premium Barbershop
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-display text-[clamp(2.75rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.025em] font-normal mb-6 md:mb-8 max-w-4xl"
        >
          Het verschil zit in <em className="not-italic md:italic text-white/85">het detail</em>.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 flex-wrap"
        >
          <p className="text-sm md:text-base text-white/70 font-light max-w-md leading-relaxed">
            Vakwerk in fades, beard trims en moderne cuts. Een persoonlijke ervaring, geen
            knipbeurt aan de lopende band.
          </p>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto">
            <button
              onClick={onBookClick}
              className="btn-luxury justify-center w-full md:w-auto group"
            >
              Reserveer je plek
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint - desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex-col items-center gap-3 text-[0.6rem] tracking-[0.3em] uppercase text-white/50"
      >
        <span>Scroll</span>
        <span className="w-px h-9 bg-gradient-to-b from-transparent to-ink animate-scroll-pulse" />
      </motion.div>
    </section>
  );
}
