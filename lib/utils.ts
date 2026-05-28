import { OPENING_HOURS, SLOT_INTERVAL, DAY_NAMES_SHORT, MONTH_NAMES_SHORT } from './config';

// Format cents to "€XX,XX"
export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2).replace('.', ',')}`;
}

// Format ISO date to "MA 27 mei"
export function formatDateShort(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return `${DAY_NAMES_SHORT[d.getDay()]} ${d.getDate()} ${MONTH_NAMES_SHORT[d.getMonth()]}`;
}

// Format ISO date to "27 mei 2026, 14:30"
export function formatDateTime(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  const date = `${d.getDate()} ${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getFullYear()}`;
  const time = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  return `${date}, ${time}`;
}

// Format time only "14:30"
export function formatTime(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// Get next N days (skipping closed days optionally)
export function getNextDays(count: number): Date[] {
  const days: Date[] = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let i = 0; i < count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

// Check if a given day is closed (weekday-based)
export function isDayClosed(date: Date): boolean {
  return OPENING_HOURS[date.getDay()] === null;
}

// Generate all possible time slots for a given date
export function getTimeSlotsForDate(date: Date): string[] {
  const hours = OPENING_HOURS[date.getDay()];
  if (!hours) return [];

  const [openH, openM] = hours.open.split(':').map(Number);
  const [closeH, closeM] = hours.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const slots: string[] = [];
  for (let m = openMinutes; m < closeMinutes; m += SLOT_INTERVAL) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
  }
  return slots;
}

// Combine date + "HH:MM" into ISO timestamp
export function combineDateAndTime(date: Date, time: string): Date {
  const [h, m] = time.split(':').map(Number);
  const d = new Date(date);
  d.setHours(h, m, 0, 0);
  return d;
}

// Add minutes to a date
export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

// Check if two date ranges overlap
export function rangesOverlap(
  startA: Date, endA: Date,
  startB: Date, endB: Date
): boolean {
  return startA < endB && startB < endA;
}

// Get a date range relative to today (for stats)
export function getDateRange(period: 'today' | 'week' | 'month'): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  if (period === 'week') {
    const dayOfWeek = (now.getDay() + 6) % 7; // 0 = Monday
    start.setDate(now.getDate() - dayOfWeek);
    end.setDate(start.getDate() + 6);
  }
  if (period === 'month') {
    start.setDate(1);
    end.setMonth(start.getMonth() + 1);
    end.setDate(0);
  }
  return { start, end };
}
