import { createClient } from '@/lib/supabase-server';
import { getDateRange } from '@/lib/utils';
import type { Booking } from '@/lib/types';
import { CalendarView } from '@/components/admin/CalendarView';

export default async function CalendarPage() {
  const supabase = createClient();
  const week = getDateRange('week');

  // Get next 4 weeks of bookings
  const end = new Date(week.start);
  end.setDate(end.getDate() + 28);

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .gte('start_at', week.start.toISOString())
    .lte('start_at', end.toISOString())
    .in('status', ['pending', 'confirmed', 'completed'])
    .order('start_at');

  return (
    <div className="p-6 md:p-12">
      <div className="mb-8">
        <div className="text-[0.7rem] tracking-[0.3em] uppercase text-muted mb-2">Agenda</div>
        <h1 className="font-display text-3xl md:text-5xl font-normal">
          Weekoverzicht <em className="italic text-muted">agenda</em>
        </h1>
      </div>
      <CalendarView bookings={(bookings as Booking[]) || []} />
    </div>
  );
}
