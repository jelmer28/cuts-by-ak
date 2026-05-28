'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Service } from '@/lib/types';
import { combineDateAndTime, addMinutes, formatDateShort, formatPrice } from '@/lib/utils';
import { ServiceStep } from './ServiceStep';
import { DateTimeStep } from './DateTimeStep';
import { DetailsStep } from './DetailsStep';
import { ConfirmStep } from './ConfirmStep';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  services: Service[];
}

export interface BookingData {
  service: Service | null;
  date: Date | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
}

export function BookingModal({ open, onClose, services }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [data, setData] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    name: '',
    phone: '',
    email: '',
  });

  // Lock body scroll iOS-safe
  useEffect(() => {
    if (open) {
      const y = window.scrollY;
      setScrollY(y);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    }
  }, [open, scrollY]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setData({ service: null, date: null, time: null, name: '', phone: '', email: '' });
        setError(null);
      }, 400);
    }
  }, [open]);

  // ESC handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const canContinue = (() => {
    if (step === 1) return data.service !== null;
    if (step === 2) return data.date !== null && data.time !== null;
    if (step === 3) return data.name.trim().length > 1 && data.phone.trim().length > 5;
    return true;
  })();

  async function handleNext() {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    // Submit
    if (!data.service || !data.date || !data.time) return;
    setSubmitting(true);
    setError(null);
    try {
      const startAt = combineDateAndTime(data.date, data.time);
      const endAt = addMinutes(startAt, data.service.duration_minutes);

      const res = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    service_id: data.service.id,
    customer_name: data.name.trim(),
    customer_phone: data.phone.trim(),
    customer_email: data.email?.trim() || null,
    start_at: startAt.toISOString(),
    end_at: endAt.toISOString(),
  }),
});

if (!res.ok) {
  throw new Error('Reservering mislukt');
}

      setStep(4);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Onbekende fout';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  function handlePrev() {
    if (step > 1 && step < 4) setStep(step - 1);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] bg-bg/85 backdrop-blur-xl flex md:items-center md:justify-center md:p-6 items-stretch"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          style={{
            paddingTop: `max(0px, env(safe-area-inset-top))`,
            paddingBottom: `max(0px, env(safe-area-inset-bottom))`,
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-bg md:border md:border-line w-full md:max-w-[540px] md:max-h-[92vh] max-h-screen overflow-y-auto relative"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              onClick={onClose}
              aria-label="Sluiten"
              className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-muted hover:text-ink transition-colors z-[2]"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="px-6 md:px-10 pt-12 pb-8 border-b border-line">
              <div className="text-[0.65rem] tracking-[0.35em] uppercase text-muted mb-4">
                Reservering
              </div>
              <div className="font-display text-3xl md:text-4xl leading-tight font-normal tracking-tight">
                {step === 4 ? (
                  <>
                    Tot <em className="italic text-muted">snel</em>
                  </>
                ) : (
                  <>
                    Boek je <em className="italic text-muted">plek</em>
                  </>
                )}
              </div>
            </div>

            <div className="px-6 md:px-10 py-8">
              {/* Progress dots */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-0.5 transition-colors duration-500 ${
                      s === step ? 'bg-ink' : s < step ? 'bg-muted' : 'bg-line'
                    }`}
                  />
                ))}
              </div>

              {step === 1 && (
                <ServiceStep
                  services={services}
                  selected={data.service}
                  onSelect={(s) => setData({ ...data, service: s })}
                />
              )}
              {step === 2 && (
                <DateTimeStep
                  date={data.date}
                  time={data.time}
                  onDateChange={(d) => setData({ ...data, date: d, time: null })}
                  onTimeChange={(t) => setData({ ...data, time: t })}
                />
              )}
              {step === 3 && (
                <DetailsStep
                  name={data.name}
                  phone={data.phone}
                  email={data.email}
                  onChange={(field, value) => setData({ ...data, [field]: value })}
                />
              )}
              {step === 4 && data.service && data.date && data.time && (
                <ConfirmStep
                  summary={{
                    service: data.service.name,
                    date: formatDateShort(data.date),
                    time: data.time,
                    name: data.name,
                    phone: data.phone,
                    total: formatPrice(data.service.price_cents),
                  }}
                />
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-950/30 border border-red-900 text-red-200 text-sm">
                  {error}
                </div>
              )}
            </div>

            <div
              className="px-6 md:px-10 py-5 border-t border-line flex gap-3 bg-bg sticky bottom-0"
              style={{ paddingBottom: `max(1.25rem, env(safe-area-inset-bottom))` }}
            >
              {step > 1 && step < 4 && (
                <button
                  onClick={handlePrev}
                  className="flex-none px-6 py-4 text-[0.7rem] font-normal tracking-[0.3em] uppercase text-muted border border-line-soft hover:text-ink hover:border-ink transition-all"
                >
                  ← Terug
                </button>
              )}
              {step < 4 ? (
                <button
                  disabled={!canContinue || submitting}
                  onClick={handleNext}
                  className="flex-1 py-4 text-[0.7rem] font-medium tracking-[0.3em] uppercase bg-ink text-bg border border-ink hover:bg-transparent hover:text-ink transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  {submitting ? 'Bezig...' : step === 3 ? 'Bevestig reservering' : 'Volgende →'}
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex-1 py-4 text-[0.7rem] font-medium tracking-[0.3em] uppercase bg-ink text-bg border border-ink hover:bg-transparent hover:text-ink transition-all"
                >
                  Sluiten
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
