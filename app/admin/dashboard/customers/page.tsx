import { createClient } from '@/lib/supabase-server';
import type { Customer } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export default async function CustomersPage() {
  const supabase = await createClient();
  const { data: customers } = await supabase
    .from('customers')
    .select('*')
    .order('last_visit_at', { ascending: false, nullsFirst: false })
    .limit(200);

  return (
    <div className="p-6 md:p-12">
      <div className="mb-8">
        <div className="text-[0.7rem] tracking-[0.3em] uppercase text-muted mb-2">Klanten</div>
        <h1 className="font-display text-3xl md:text-5xl font-normal">
          Alle <em className="italic text-muted">klanten</em>
        </h1>
      </div>

      {!customers || customers.length === 0 ? (
        <div className="border border-line p-12 text-center text-muted text-sm">
          Nog geen klanten
        </div>
      ) : (
        <div className="border border-line overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-[0.65rem] tracking-[0.2em] uppercase text-muted">
                <th className="text-left px-4 py-3 font-normal">Naam</th>
                <th className="text-left px-4 py-3 font-normal">Telefoon</th>
                <th className="text-left px-4 py-3 font-normal hidden md:table-cell">Email</th>
                <th className="text-right px-4 py-3 font-normal">Bezoeken</th>
                <th className="text-right px-4 py-3 font-normal hidden md:table-cell">Totaal</th>
              </tr>
            </thead>
            <tbody>
              {(customers as Customer[]).map((c) => (
                <tr key={c.id} className="border-b border-line last:border-b-0 hover:bg-bg-card">
                  <td className="px-4 py-4 font-medium text-ink">{c.name}</td>
                  <td className="px-4 py-4 text-muted">{c.phone}</td>
                  <td className="px-4 py-4 text-muted hidden md:table-cell">{c.email || '—'}</td>
                  <td className="px-4 py-4 text-right tabular-nums">{c.total_visits}</td>
                  <td className="px-4 py-4 text-right tabular-nums hidden md:table-cell">
                    {formatPrice(c.total_spent_cents)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
