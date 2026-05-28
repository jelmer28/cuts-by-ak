'use client';

import { motion } from 'framer-motion';

export function Barber() {
  return (
    <section id="barber" className="py-20 md:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/3] lg:aspect-auto"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=90')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(1.1)',
          }}
        >
          <div
            className="absolute bottom-12 right-12 font-display italic text-7xl md:text-8xl font-medium text-ink leading-none"
            style={{ mixBlendMode: 'difference' }}
          >
            AK
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, delay: 0.15 }}
          className="px-5 py-12 md:px-16 md:py-20 flex flex-col justify-center bg-bg"
        >
          <div className="section-eyebrow">De Barber · 003</div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] font-normal mb-8">
            Achter elke <em className="italic text-white/70">cut</em> staat een verhaal.
          </h2>
          <p className="text-base md:text-lg text-muted leading-relaxed mb-6 font-light max-w-lg">
            Albert, beter bekend als AK, bouwde Cuts by AK vanuit één overtuiging: een goede cut
            begint bij echte aandacht. Geen massaproductie, geen haast.
          </p>
          <p className="text-base md:text-lg text-muted leading-relaxed mb-6 font-light max-w-lg">
            Alleen jij in de stoel, en een barber die de tijd neemt om het strak te doen.
            Gespecialiseerd in fades, tapers, sharp lines en beard contouring.
          </p>

          <div className="mt-12 pt-8 border-t border-line flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="font-display italic text-4xl md:text-5xl text-ink font-medium leading-none">
              AK
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-sm text-ink font-medium tracking-wide">Albert · Cuts by AK</div>
              <div className="text-[0.7rem] text-muted tracking-[0.25em] uppercase">
                Founder & Master Barber
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
