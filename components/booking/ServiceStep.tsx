'use client';

import type { Service } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface Props {
  services: Service[];
  selected: Service | null;
  onSelect: (s: Service) => void;
}

export function ServiceStep({ services, selected, onSelect }: Props) {
  return (
    <div>
      <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-5">
        Stap 01 · Kies service
      </div>
      <div className="grid gap-3">
        {services?.map((s) => {
          const isSelected = selected?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`border p-5 md:p-6 flex justify-between items-center transition-all w-full text-left ${
                isSelected
                  ? 'border-ink bg-bg-card'
                  : 'border-line hover:border-muted hover:bg-bg-card'
              }`}
            >
              <div>
                <div className="font-display text-xl font-normal text-ink mb-1">{s.name}</div>
                <div className="text-[0.72rem] text-muted tracking-[0.15em] uppercase">
                  {s.duration_minutes} min
                </div>
              </div>
              <div className="font-display text-xl text-ink font-medium">
                {formatPrice(s.price_cents)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
