'use client';

import { Check } from 'lucide-react';

interface Summary {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  total: string;
}

export function ConfirmStep({ summary }: { summary: Summary }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full border border-ink flex items-center justify-center mx-auto mb-7 text-ink">
        <Check size={24} strokeWidth={1.5} />
      </div>
      <div className="font-display text-2xl md:text-3xl font-normal mb-4">
        Reservering <em className="italic text-muted">bevestigd</em>
      </div>
      <p className="text-sm md:text-base text-muted leading-relaxed max-w-sm mx-auto mb-8">
        Je ontvangt een bevestiging via WhatsApp. Tot snel bij Cuts by AK.
      </p>

      <div className="bg-bg-card p-6 border border-line text-left">
        {[
          ['Service', summary.service],
          ['Datum', summary.date],
          ['Tijd', summary.time],
          ['Naam', summary.name],
          ['Telefoon', summary.phone],
          ['Totaal', summary.total],
        ].map(([label, value], i, arr) => (
          <div
            key={label}
            className={`flex justify-between py-2.5 ${
              i < arr.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <span className="text-muted tracking-[0.1em] uppercase text-[0.7rem]">{label}</span>
            <span className="text-ink font-display text-base">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
