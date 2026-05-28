import { createClient } from '@/lib/supabase-server';
import { formatPrice, getDateRange } from '@/lib/utils';
import type { Booking } from '@/lib/types';

export default async function AnalyticsPage() {
  const supabase = createClient();

  // Last 30 days stats
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: bookings30d } = await supabase
    .from('bookings')
    .select('*')
    .gte('start_at', thirtyDaysAgo.toISOString())
    .in('status', ['confirmed', 'completed']);

  // Page visits last 30 days
  const { count: visits30d } = await supabase
    .from('page_visits')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', thirtyDaysAgo.toISOString());

  const all = (bookings30d as Booking[]) || [];

  // Service breakdown
  const byService: Record<string, { count: number; revenue: number }> = {};
  all.forEach((b) => {
    if (!byService[b.service_name]) byService[b.service_name] = { count: 0, revenue: 0 };
    byService[b.service_name].count++;
    byService[b.service_name].revenue += b.service_price_cents;
  });
  const services = Object.entries(byService).sort((a, b) => b[1].revenue - a[1].revenue);

  // Revenue total
  const totalRevenue = all.reduce((s, b) => s + b.service_price_cents, 0);
  const completed = all.filter((b) => b.status === 'completed').length;

  // Conversion: visits → bookings
  const conversionRate =
    visits30d && visits30d > 0 ? ((all.length / visits30d) * 100).toFixed(1) : '—';

  return (
    <div className="p-6 md:p-12">
      <div className="mb-8">
        <div className="text-[0.7rem] tracking-[0.3em] uppercase text-muted mb-2">Analytics</div>
        <h1 className="font-display text-3xl md:text-5xl font-normal">
          Inzichten <em className="italic text-muted">laatste 30 dagen</em>
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard label="Reserveringen" value={all.length.toString()} sublabel="totaal 30 dagen" />
        <StatCard label="Voltooid" value={completed.toString()} sublabel="afgeronde bezoeken" />
        <StatCard label="Omzet" value={formatPrice(totalRevenue)} sublabel="alle reserveringen" />
        <StatCard
          label="Conversie"
          value={typeof conversionRate === 'string' && conversionRate !== '—' ? `${conversionRate}%` : '—'}
          sublabel={`${visits30d ?? 0} site bezoeken`}
        />
      </div>

      <div>
        <h2 className="font-display text-2xl font-normal mb-5">Per service</h2>
        {services.length === 0 ? (
          <div className="border border-line p-8 text-center text-muted text-sm">
            Nog geen data
          </div>
        ) : (
          <div className="border border-line">
            {services.map(([name, s], i) => {
              const max = services[0][1].revenue;
              const pct = (s.revenue / max) * 100;
              return (
                <div
                  key={name}
                  className={`p-5 ${i > 0 ? 'border-t border-line' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-muted tabular-nums">
                      {s.count} ·{' '}
                      <span className="text-ink font-medium">{formatPrice(s.revenue)}</span>
                    </div>
                  </div>
                  <div className="h-1 bg-line">
                    <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div className="border border-line bg-bg-card p-6">
      <div className="text-[0.65rem] tracking-[0.3em] uppercase text-muted mb-3">{label}</div>
      <div className="font-display text-3xl md:text-4xl font-medium mb-1">{value}</div>
      <div className="text-xs text-muted">{sublabel}</div>
    </div>
  );
}
