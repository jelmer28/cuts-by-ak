'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Booking, BookingStatus } from '@/lib/types';
import { formatDateTime, formatPrice } from '@/lib/utils';
import { createClient } from '@/lib/supabase-browser';
import { Check, X, RefreshCw } from 'lucide-react';

const statusFilters: { value: BookingStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'pending', label: 'In afwachting' },
  { value: 'confirmed', label: 'Bevestigd' },
  { value: 'completed', label: 'Voltooid' },
  { value: 'cancelled', label: 'Geannuleerd' },
];

export function BookingsTable({ initial }: { initial: Booking[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [bookings, setBookings] = useState(initial);
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  async function updateStatus(id: string, status: BookingStatus) {
    setUpdating(id);
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
    if (!error) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    }
    setUpdating(null);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 text-[0.7rem] tracking-[0.18em] uppercase border transition-all ${
              filter === f.value
                ? 'border-ink bg-ink text-bg'
                : 'border-line text-muted hover:text-ink hover:border-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={() => router.refresh()}
          className="ml-auto px-4 py-2 text-[0.7rem] tracking-[0.18em] uppercase border border-line text-muted hover:text-ink hover:border-muted transition-all flex items-center gap-2"
        >
          <RefreshCw size={12} /> Ververs
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-line p-12 text-center text-muted text-sm">
          Geen reserveringen gevonden
        </div>
      ) : (
        <div className="border border-line overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-[0.65rem] tracking-[0.2em] uppercase text-muted">
                <th className="text-left px-4 py-3 font-normal">Datum/tijd</th>
                <th className="text-left px-4 py-3 font-normal">Klant</th>
                <th className="text-left px-4 py-3 font-normal hidden md:table-cell">Service</th>
                <th className="text-right px-4 py-3 font-normal hidden md:table-cell">Prijs</th>
                <th className="text-left px-4 py-3 font-normal">Status</th>
                <th className="text-right px-4 py-3 font-normal">Acties</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-line last:border-b-0 hover:bg-bg-card">
                  <td className="px-4 py-4 align-top">
                    <div className="font-medium text-ink">
                      {new Date(b.start_at).toLocaleDateString('nl-NL', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                    <div className="text-xs text-muted mt-0.5 tabular-nums">
                      {new Date(b.start_at).toLocaleTimeString('nl-NL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4 align-top">
                    <div className="font-medium text-ink">{b.customer_name}</div>
                    <div className="text-xs text-muted mt-0.5">{b.customer_phone}</div>
                  </td>
                  <td className="px-4 py-4 align-top hidden md:table-cell">{b.service_name}</td>
                  <td className="px-4 py-4 align-top text-right hidden md:table-cell tabular-nums">
                    {formatPrice(b.service_price_cents)}
                  </td>
                  <td className="px-4 py-4 align-top">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-4 align-top text-right">
                    <div className="inline-flex gap-1">
                      {b.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(b.id, 'confirmed')}
                          disabled={updating === b.id}
                          className="px-2 py-1 text-green-300 hover:bg-green-950/50 border border-green-900"
                          title="Bevestigen"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {(b.status === 'pending' || b.status === 'confirmed') && (
                        <button
                          onClick={() => updateStatus(b.id, 'completed')}
                          disabled={updating === b.id}
                          className="px-2 py-1 text-muted hover:bg-bg-card border border-line"
                          title="Markeer voltooid"
                        >
                          ✓
                        </button>
                      )}
                      {b.status !== 'cancelled' && b.status !== 'completed' && (
                        <button
                          onClick={() => updateStatus(b.id, 'cancelled')}
                          disabled={updating === b.id}
                          className="px-2 py-1 text-red-300 hover:bg-red-950/50 border border-red-900"
                          title="Annuleer"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
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
      className={`inline-block px-2 py-1 text-[0.6rem] tracking-[0.15em] uppercase border whitespace-nowrap ${
        styles[status] || styles.pending
      }`}
    >
      {labels[status] || status}
    </span>
  );
}
