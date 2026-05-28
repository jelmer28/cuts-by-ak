'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BUSINESS, OPENING_HOURS, DAY_NAMES_NL } from '@/lib/config';

export function Contact() {
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(new Date().getDay());
  }, []);

  // Render rows in display order (Mon-Sun)
  const orderedDays = [1, 2, 3, 4, 5, 6, 0];

  return (
    <section id="contact" className="py-20 md:py-28 px-5 md:px-12 bg-bg-soft border-t border-line">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1 }}
        className="mb-12 md:mb-20"
      >
        <div className="section-eyebrow">Bezoek · 004</div>
        <h2 className="section-title">
          Tot ziens in <em className="italic text-white/70">de stoel</em>.
        </h2>
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-xl font-light">
          Reserveer direct online of bel om in te plannen. Walk-ins op basis van beschikbaarheid.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, delay: 0.15 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start"
      >
        <div className="flex flex-col gap-10">
          <div className="border-t border-line pt-7">
            <div className="text-[0.65rem] tracking-[0.35em] uppercase text-muted mb-3">Adres</div>
            <div className="font-display text-2xl italic font-normal text-ink leading-tight">
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.postal} {BUSINESS.address.city}
            </div>
            <div className="text-sm text-muted mt-2 leading-relaxed">
              In het hart van Heerenveen
            </div>
          </div>

          <div className="border-t border-line pt-7">
            <div className="text-[0.65rem] tracking-[0.35em] uppercase text-muted mb-3">
              Reserveren
            </div>
            <div className="font-display text-2xl font-normal text-ink leading-tight">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="border-b border-transparent hover:border-ink transition-colors duration-300"
              >
                {BUSINESS.phoneDisplay}
              </a>
            </div>
            <div className="text-sm text-muted mt-2 leading-relaxed">Bellen of WhatsApp</div>
          </div>

          <div className="border-t border-line pt-7">
            <div className="text-[0.65rem] tracking-[0.35em] uppercase text-muted mb-3">
              Volg het werk
            </div>
            <div className="flex gap-3 mt-3">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="w-11 h-11 border border-line-soft flex items-center justify-center text-muted hover:bg-ink hover:text-bg hover:border-ink transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
                className="w-11 h-11 border border-line-soft flex items-center justify-center text-muted hover:bg-ink hover:text-bg hover:border-ink transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-line pt-7">
            <div className="text-[0.65rem] tracking-[0.35em] uppercase text-muted mb-3">
              Openingstijden
            </div>
            <div className="flex flex-col mt-2">
              {orderedDays.map((day) => {
                const hours = OPENING_HOURS[day];
                const isToday = today === day;
                const isClosed = hours === null;
                return (
                  <div
                    key={day}
                    className={`flex justify-between py-3 border-b border-line last:border-b-0 text-sm ${
                      isToday ? 'text-ink' : 'text-ink-soft'
                    }`}
                  >
                    <span className={`tracking-wide font-light ${isToday ? 'text-ink' : 'text-muted'}`}>
                      {DAY_NAMES_NL[day]}
                      {isToday && (
                        <span className="ml-2 text-[0.7rem] tracking-wider uppercase text-accent">
                          {isClosed ? '· vandaag gesloten' : '· nu open'}
                        </span>
                      )}
                    </span>
                    <span
                      className={`tabular-nums font-light ${
                        isClosed ? 'text-muted-dim italic' : 'text-ink-soft'
                      }`}
                    >
                      {isClosed ? 'Gesloten' : `${hours!.open} — ${hours!.close}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 aspect-[4/5] overflow-hidden border border-line">
          <iframe
            className="w-full h-full border-0"
            style={{ filter: 'grayscale(100%) invert(0.92) contrast(0.95) brightness(1.05)' }}
            src="https://www.openstreetmap.org/export/embed.html?bbox=5.9180%2C52.9580%2C5.9280%2C52.9620&layer=mapnik&marker=52.9600%2C5.9230"
            loading="lazy"
            title="Cuts by AK Locatie"
          />
        </div>
      </motion.div>
    </section>
  );
}
