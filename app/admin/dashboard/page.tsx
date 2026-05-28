import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function DashboardPage() {
  const { data: bookings } = await supabase
    .from('Bookings')
    .select('*')
    .order('start_at', { ascending: false });

  const totalBookings = bookings?.length || 0;

  const today = new Date();

  const todayBookings =
    bookings?.filter((booking) => {
      const bookingDate = new Date(booking.start_at);

      return (
        bookingDate.getDate() === today.getDate() &&
        bookingDate.getMonth() === today.getMonth() &&
        bookingDate.getFullYear() === today.getFullYear()
      );
    }) || [];

  const weekBookings =
    bookings?.filter((booking) => {
      const bookingDate = new Date(booking.start_at);

      const diff =
        (bookingDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24);

      return diff <= 7;
    }).length || 0;

  const monthBookings =
    bookings?.filter((booking) => {
      const bookingDate = new Date(booking.start_at);

      return (
        bookingDate.getMonth() === today.getMonth() &&
        bookingDate.getFullYear() === today.getFullYear()
      );
    }).length || 0;

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mb-10">
        <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">
          Overzicht
        </div>

        <h1 className="text-6xl font-light">
          Dashboard <span className="italic text-neutral-500">vandaag</span>
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-10">
        <div className="border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
            Vandaag
          </div>

          <div className="text-5xl font-light">
            {todayBookings.length}
          </div>

          <div className="text-neutral-500 mt-2">
            reserveringen
          </div>
        </div>

        <div className="border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
            Deze week
          </div>

          <div className="text-5xl font-light">
            {weekBookings}
          </div>

          <div className="text-neutral-500 mt-2">
            afspraken
          </div>
        </div>

        <div className="border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="text-xs uppercase tracking-[0.25em] text-neutral-500 mb-4">
            Deze maand
          </div>

          <div className="text-5xl font-light">
            {monthBookings}
          </div>

          <div className="text-neutral-500 mt-2">
            reserveringen
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="border border-neutral-800 p-6">
          <h2 className="text-2xl mb-6">
            Vandaag schema
          </h2>

          <div className="space-y-4">
            {todayBookings.length === 0 ? (
              <div className="text-neutral-500">
                Geen reserveringen voor vandaag
              </div>
            ) : (
              todayBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-neutral-800 p-4"
                >
                  <div className="text-xl">
                    {booking.customer_name}
                  </div>

                  <div className="text-neutral-400 mt-1">
                    {booking.customer_phone}
                  </div>

                  <div className="text-neutral-500 mt-3">
                    {new Date(
                      booking.start_at
                    ).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border border-neutral-800 p-6">
          <h2 className="text-2xl mb-6">
            Recente reserveringen
          </h2>

          <div className="space-y-4">
            {bookings?.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="border border-neutral-800 p-4"
              >
                <div className="text-xl">
                  {booking.customer_name}
                </div>

                <div className="text-neutral-400 mt-1">
                  {booking.customer_phone}
                </div>

                <div className="text-neutral-500 mt-3">
                  {new Date(
                    booking.start_at
                  ).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}