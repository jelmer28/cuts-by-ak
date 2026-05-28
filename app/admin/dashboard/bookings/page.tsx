import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BookingsPage() {
  const { data: bookings, error } = await supabase
  .from('Bookings')
  .select('*')
  .order('start_at', { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl mb-10">Alle reserveringen</h1>

      {error && (
        <div className="text-red-500 mb-5">
          {error.message}
        </div>
      )}

      <div className="space-y-5">
        {bookings?.map((booking) => (
          <div
            key={booking.id}
            className="border border-neutral-800 p-6 rounded-xl"
          >
            <div className="text-2xl font-semibold">
              {booking.customer_name}
            </div>

            <div className="mt-2">
              {booking.customer_phone}
            </div>

            <div>
              {booking.customer_email || 'Geen email'}
            </div>

            <div className="mt-4 text-neutral-400">
              Service: {booking.service_id}
            </div>

            <div className="text-neutral-500">
              {new Date(booking.start_at).toLocaleString()}
            </div>
          </div>
        ))}

        {bookings?.length === 0 && (
          <div className="text-neutral-500">
            Geen reserveringen gevonden
          </div>
        )}
      </div>
    </main>
  );
}