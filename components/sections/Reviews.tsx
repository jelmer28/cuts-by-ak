'use client';

import { motion } from 'framer-motion';

const reviews = [
  { text: 'Friendly atmosphere and very professional service. The barber really takes the time to make sure your haircut looks perfect.', name: 'Hessel Beimers', initial: 'H' },
  { text: 'Zonder twijfel een van de beste kappers in Heerenveen en omstreken. Je loopt hier altijd strak en fris de deur uit.', name: 'Luciano Pompier', initial: 'L' },
  { text: 'Cut my hair exactly how I wanted it. AK is a cool person, relaxed atmosphere and good conversation.', name: 'Mark Loades', initial: 'M' },
  { text: 'De beste kapper van Heerenveen als je het mij vraagt. Open voor een gesprek, knipt goed en makkelijk een afspraak in te plannen.', name: 'Rast Hoort', initial: 'R' },
  { text: 'Albert knipt erg goed, maar is vooral erg sociaal en gezellig. Echt een aanrader.', name: 'Milan Agema', initial: 'M' },
  { text: 'Echt een top kapper, nog nooit met een slecht kapsel weg gegaan hier. Aanrader voor iedereen die strak weg wil lopen.', name: 'Rowan Minkes', initial: 'R' },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 md:py-28 px-5 md:px-12 bg-bg-soft">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
        className="text-center mb-12 md:mb-20"
      >
        <div className="section-eyebrow justify-center after:content-[''] after:w-10 after:h-px after:bg-muted">
          Reviews · 002
        </div>
        <h2 className="section-title">
          Vertrouwen wordt <em className="italic text-white/70">verdiend</em>.
        </h2>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl mx-auto font-light">
          5.0 op Google, gebaseerd op 27 reviews. Een selectie van wat de klanten zelf zeggen.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-bg-card border border-line p-7 md:p-10 transition-all duration-500 hover:border-muted-dim hover:-translate-y-1 relative"
          >
            <span className="absolute top-3 left-7 font-display text-7xl text-line-soft leading-none italic">
              &ldquo;
            </span>
            <div className="text-ink text-sm tracking-[0.3em] mb-6 mt-4 relative">★ ★ ★ ★ ★</div>
            <p className="font-display italic text-lg md:text-xl leading-snug text-ink-soft mb-8 font-normal">
              {r.text}
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-line">
              <div className="w-11 h-11 rounded-full bg-ink text-bg flex items-center justify-center text-sm font-semibold font-display italic">
                {r.initial}
              </div>
              <div>
                <div className="text-sm font-medium text-ink">{r.name}</div>
                <div className="text-[0.7rem] text-muted tracking-[0.15em] uppercase mt-0.5">
                  Google review
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
