import { createClient } from '@/lib/supabase-server';
import type { Booking } from '@/lib/types';
import { BookingsTable } from '@/components/admin/BookingsTable';

export default async function BookingsPage() {
  const supabase = createClient();
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('start_at', { ascending: false })
    .limit(100);

  return (
    <div className="p-6 md:p-12">
      <div className="mb-8">
        <div className="text-[0.7rem] tracking-[0.3em] uppercase text-muted mb-2">
          Reserveringen
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-normal">
          Alle <em className="italic text-muted">reserveringen</em>
        </h1>
      </div>
      <BookingsTable initial={(bookings as Booking[]) || []} />
    </div>
  );
}
