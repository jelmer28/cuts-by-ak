import { createClient } from '@/lib/supabase-server';
import { formatPrice, formatDateTime, getDateRange } from '@/lib/utils';
import type { Booking } from '@/lib/types';
import Link from 'next/link';

export default async function DashboardOverview() {
  const supabase = createClient();

  const today = getDateRange('today');
  const week = getDateRange('week');
  const month = getDateRange('month');

  // Today's bookings
  const { data: todayBookings } = await supabase
    .from('bookings')
    .select('*')
    .gte('start_at', today.start.toISOString())
    .lte('start_at', today.end.toISOString())
    .in('status', ['pending', 'confirmed', 'completed'])
    .order('start_at');

  // Week revenue (completed)
  const { data: weekCompleted } = await supabase
    .from('bookings')
    .select('service_price_cents')
    .gte('start_at', week.start.toISOString())
    .lte('start_at', week.end.toISOString())
    .eq('status', 'completed');

  // Month bookings count
  const { count: monthCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('start_at', month.start.toISOString())
    .lte('start_at', month.end.toISOString())
    .in('status', ['confirmed', 'completed']);

  // Total customers
  const { count: customerCount } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true });

  // Recent bookings
  const { data: recent } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const weekRevenue =
    (weekCompleted || []).reduce((sum, b) => sum + b.service_price_cents, 0);

  const stats = [
    {
      label: 'Vandaag',
      value: (todayBookings?.length ?? 0).toString(),
      sublabel: 'reserveringen',
    },
    {
      label: 'Deze week',
      value: formatPrice(weekRevenue),
      sublabel: 'omzet (afgerond)',
    },
    {
      label: 'Deze maand',
      value: (monthCount ?? 0).toString(),
      sublabel: 'reserveringen',
    },
    {
      label: 'Klanten',
      value: (customerCount ?? 0).toString(),
      sublabel: 'totaal',
    },
  ];

  return (
    <div className="p-6 md:p-12">
      <div className="mb-10">
        <div className="text-[0.7rem] tracking-[0.3em] uppercase text-muted mb-2">Overzicht</div>
        <h1 className="font-display text-3xl md:text-5xl font-normal">
          Dashboard <em className="italic text-muted">vandaag</em>
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="border border-line bg-bg-card p-6">
            <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-3">
              {s.label}
            </div>
            <div className="font-display text-3xl md:text-4xl font-medium mb-1">{s.value}</div>
            <div className="text-xs text-muted">{s.sublabel}</div>
          </div>
        ))}
      </div>

      {/* Today's schedule */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl font-normal">Vandaag&apos;s agenda</h2>
          <Link
            href="/admin/dashboard/calendar"
            className="text-[0.7rem] tracking-[0.22em] uppercase text-muted hover:text-ink"
          >
            Bekijk agenda →
          </Link>
        </div>
        {todayBookings && todayBookings.length > 0 ? (
          <div className="border border-line">
            {(todayBookings as Booking[]).map((b, i) => (
              <div
                key={b.id}
                className={`flex items-center justify-between p-4 md:p-5 ${
                  i > 0 ? 'border-t border-line' : ''
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className="font-display text-xl tabular-nums">
                    {new Date(b.start_at).toLocaleTimeString('nl-NL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{b.customer_name}</div>
                    <div className="text-xs text-muted mt-0.5">{b.service_name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={b.status} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-line p-8 text-center text-muted text-sm">
            Geen reserveringen voor vandaag
          </div>
        )}
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="font-display text-2xl font-normal mb-5">Recente reserveringen</h2>
        {recent && recent.length > 0 ? (
          <div className="border border-line">
            {(recent as Booking[]).map((b, i) => (
              <div
                key={b.id}
                className={`flex items-center justify-between p-4 ${
                  i > 0 ? 'border-t border-line' : ''
                }`}
              >
                <div>
                  <div className="font-medium text-sm">{b.customer_name}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {b.service_name} · {formatDateTime(b.start_at)}
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-line p-8 text-center text-muted text-sm">
            Nog geen reserveringen
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-yellow-950/30 text-yellow-200 border-yellow-900',
    confirmed: 'bg-green-950/30 text-green-200 border-green-900',
    completed: 'bg-bg-card text-muted border-line',
    cancelled: 'bg-red-950/30 text-red-200 border-red-900',
    no_show: 'bg-red-950/30 text-red-200 border-red-900',
  };
  const labels: Record<string, string> = {
    pending: 'In afwachting',
    confirmed: 'Bevestigd',
    completed: 'Voltooid',
    cancelled: 'Geannuleerd',
    no_show: 'No-show',
  };
  return (
    <span
      className={`inline-block px-2 py-1 text-[0.65rem] tracking-[0.15em] uppercase border ${
        styles[status] || styles.pending
      }`}
    >
      {labels[status] || status}
    </span>
  );
}
