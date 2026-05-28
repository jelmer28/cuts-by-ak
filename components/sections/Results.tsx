'use client';

import { motion } from 'framer-motion';

const results = [
  { name: 'Skin fade', num: '№ 001', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1400&q=90', span: 'md:col-span-7 md:aspect-[16/11]' },
  { name: 'Beard sculpt', num: '№ 002', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1200&q=90', span: 'md:col-span-5 md:aspect-[4/5]' },
  { name: 'Taper', num: '№ 003', img: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1200&q=90', span: 'md:col-span-4 md:aspect-[3/4]' },
  { name: 'Mid fade', num: '№ 004', img: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=1200&q=90', span: 'md:col-span-4 md:aspect-[3/4]' },
  { name: 'Classic', num: '№ 005', img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=1200&q=90', span: 'md:col-span-4 md:aspect-[3/4]' },
  { name: 'Full service', num: '№ 006', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=90', span: 'md:col-span-6 md:aspect-[5/4]' },
  { name: 'Sharp lines', num: '№ 007', img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1400&q=90', span: 'md:col-span-6 md:aspect-[5/4]' },
];

export function Results() {
  return (
    <section id="results" className="py-20 md:py-28 px-5 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
        className="mb-12 md:mb-20"
      >
        <div className="section-eyebrow">Het Werk · 001</div>
        <h2 className="section-title">
          Het resultaat <em className="italic text-white/70">spreekt</em>.
        </h2>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl font-light">
          Een verzameling van recent werk. Geen filters, geen retouches. Alleen wat er in de stoel
          gebeurt.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-5"
      >
        {results.map((r, i) => (
          <div
            key={i}
            className={`relative overflow-hidden bg-bg-card group cursor-pointer aspect-[4/5] ${r.span}`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-[1000ms] ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url('${r.img}')`,
                filter: 'grayscale(100%) contrast(1.1) brightness(0.85)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/85 pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 z-[2] flex justify-between items-end text-ink">
              <div className="font-display text-xl italic font-normal leading-tight">{r.name}</div>
              <div className="text-[0.65rem] tracking-[0.3em] text-muted uppercase">{r.num}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
