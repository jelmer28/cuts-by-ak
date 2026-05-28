import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const days = ['MAA', 'DIN', 'WOE', 'DON', 'VRI', 'ZAT', 'ZON'];

export default async function CalendarPage() {
  const { data: bookings } = await supabase
    .from('Bookings')
    .select('*')
    .order('start_at', { ascending: true });

  const currentDate = new Date();

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const weekDays = [...Array(7)].map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return day;
  });

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mb-10">
        <div className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
          Agenda
        </div>

        <h1 className="text-6xl font-light">
          Weekoverzicht <span className="italic text-neutral-500">agenda</span>
        </h1>
      </div>

      <div className="grid grid-cols-7 gap-0 border border-neutral-900">
        {weekDays.map((day, index) => {
          const dayBookings =
            bookings?.filter((booking) => {
              const bookingDate = new Date(booking.start_at);

              return (
                bookingDate.getDate() === day.getDate() &&
                bookingDate.getMonth() === day.getMonth() &&
                bookingDate.getFullYear() === day.getFullYear()
              );
            }) || [];

          return (
            <div
              key={index}
              className="min-h-[300px] border-r border-neutral-900 p-4"
            >
              <div className="text-xs tracking-[0.25em] text-neutral-500 mb-3">
                {days[index]}
              </div>

              <div className="text-3xl mb-6">
                {day.getDate()}
              </div>

              <div className="space-y-3">
                {dayBookings.length === 0 ? (
                  <div className="text-neutral-700">—</div>
                ) : (
                  dayBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-neutral-800 rounded-xl p-3"
                    >
                      <div className="font-semibold">
                        {booking.customer_name}
                      </div>

                      <div className="text-sm text-neutral-400">
                        {booking.customer_phone}
                      </div>

                      <div className="text-sm text-neutral-500 mt-2">
                        {new Date(booking.start_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}