'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Booking } from '@/lib/types';
import { DAY_NAMES_NL, MONTH_NAMES_SHORT } from '@/lib/config';

export function CalendarView({ bookings }: { bookings: Booking[] }) {
  const [weekOffset, setWeekOffset] = useState(0);

  const { startOfWeek, days, weekBookings } = useMemo(() => {
    const now = new Date();
    const dayOfWeek = (now.getDay() + 6) % 7; // Mon=0
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    start.setDate(now.getDate() - dayOfWeek + weekOffset * 7);

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }

    const weekEnd = new Date(start);
    weekEnd.setDate(start.getDate() + 7);
    const weekBookings = bookings.filter((b) => {
      const t = new Date(b.start_at).getTime();
      return t >= start.getTime() && t < weekEnd.getTime();
    });

    return { startOfWeek: start, days, weekBookings };
  }, [bookings, weekOffset]);

  const bookingsByDay = days.map((d) =>
    weekBookings.filter((b) => new Date(b.start_at).toDateString() === d.toDateString())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-display text-2xl">
            {startOfWeek.getDate()} {MONTH_NAMES_SHORT[startOfWeek.getMonth()]} —{' '}
            {days[6].getDate()} {MONTH_NAMES_SHORT[days[6].getMonth()]}
          </div>
          <div className="text-xs text-muted mt-1">
            {weekBookings.length} reserveringen deze week
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setWeekOffset((o) => o - 1)}
            className="w-10 h-10 border border-line hover:border-ink text-muted hover:text-ink flex items-center justify-center transition-all"
            aria-label="Vorige week"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setWeekOffset(0)}
            className="px-4 h-10 border border-line hover:border-ink text-muted hover:text-ink text-[0.7rem] tracking-[0.2em] uppercase transition-all"
          >
            Vandaag
          </button>
          <button
            onClick={() => setWeekOffset((o) => o + 1)}
            className="w-10 h-10 border border-line hover:border-ink text-muted hover:text-ink flex items-center justify-center transition-all"
            aria-label="Volgende week"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-2 border border-line bg-bg">
        {days.map((d, i) => {
          const isToday = d.toDateString() === new Date().toDateString();
          const dayBookings = bookingsByDay[i];
          return (
            <div
              key={i}
              className={`min-h-[200px] border-r border-line last:border-r-0 ${
                isToday ? 'bg-bg-card' : ''
              }`}
            >
              <div className="px-3 py-3 border-b border-line">
                <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted">
                  {DAY_NAMES_NL[d.getDay()].slice(0, 3)}
                </div>
                <div className={`font-display text-xl ${isToday ? 'text-ink' : 'text-ink-soft'}`}>
                  {d.getDate()} <span className="text-xs text-muted">{MONTH_NAMES_SHORT[d.getMonth()]}</span>
                </div>
              </div>
              <div className="p-2 space-y-1">
                {dayBookings.length === 0 ? (
                  <div className="text-[0.65rem] text-muted-dim px-1 py-2">—</div>
                ) : (
                  dayBookings.map((b) => (
                    <div
                      key={b.id}
                      className={`p-2 text-xs border-l-2 ${
                        b.status === 'confirmed'
                          ? 'bg-green-950/20 border-green-700'
                          : b.status === 'pending'
                          ? 'bg-yellow-950/20 border-yellow-700'
                          : 'bg-bg-card border-line-soft'
                      }`}
                    >
                      <div className="tabular-nums font-medium text-ink">
                        {new Date(b.start_at).toLocaleTimeString('nl-NL', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <div className="text-muted truncate mt-0.5">{b.customer_name}</div>
                      <div className="text-muted-dim text-[0.65rem] truncate">{b.service_name}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
