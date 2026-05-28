'use client';

import { useEffect, useState } from 'react';
import { getNextDays, isDayClosed, getTimeSlotsForDate } from '@/lib/utils';
import { DAY_NAMES_SHORT, MONTH_NAMES_SHORT } from '@/lib/config';

interface Props {
  date: Date | null;
  time: string | null;
  onDateChange: (d: Date) => void;
  onTimeChange: (t: string) => void;
}

export function DateTimeStep({ date, time, onDateChange, onTimeChange }: Props) {
  const days = getNextDays(14);
  const [takenSlots, setTakenSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch taken slots when a date is selected
  useEffect(() => {
    if (!date) {
      setTakenSlots([]);
      return;
    }
    setLoadingSlots(true);
    const dateStr = date.toISOString().split('T')[0];
   setTakenSlots([]);
   setLoadingSlots(false);
  }, [date]);

  const slots = date ? getTimeSlotsForDate(date) : [];

  return (
    <div>
      <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-5">
        Stap 02 · Datum & tijd
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-7">
        {days.map((d, i) => {
          const closed = isDayClosed(d);
          const isSelected =
            date && d.toDateString() === date.toDateString();
          return (
            <button
              key={i}
              disabled={closed}
              onClick={() => onDateChange(d)}
              className={`bg-transparent border p-3 text-center transition-all ${
                isSelected
                  ? 'border-ink bg-ink text-bg'
                  : 'border-line text-ink hover:border-muted hover:bg-bg-card'
              } ${closed ? 'opacity-30 pointer-events-none' : ''}`}
            >
              <div
                className={`text-[0.6rem] tracking-[0.2em] uppercase mb-1 ${
                  isSelected ? 'text-bg/70' : 'text-muted'
                }`}
              >
                {DAY_NAMES_SHORT[d.getDay()]}
              </div>
              <div className="font-display text-2xl font-medium leading-none">{d.getDate()}</div>
              <div
                className={`text-[0.55rem] tracking-[0.2em] uppercase mt-1 ${
                  isSelected ? 'text-bg/70' : 'text-muted'
                }`}
              >
                {MONTH_NAMES_SHORT[d.getMonth()]}
              </div>
            </button>
          );
        })}
      </div>

      {date && (
        <>
          <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-3">
            Beschikbare tijden {loadingSlots && '· laden...'}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {slots.map((slot) => {
              const taken = takenSlots.includes(slot);
              const isSelected = time === slot;
              return (
                <button
                  key={slot}
                  disabled={taken}
                  onClick={() => onTimeChange(slot)}
                  className={`border py-2.5 text-sm tabular-nums transition-all ${
                    isSelected
                      ? 'border-ink bg-ink text-bg'
                      : 'border-line text-ink hover:border-muted hover:bg-bg-card'
                  } ${taken ? 'opacity-30 pointer-events-none line-through' : ''}`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
