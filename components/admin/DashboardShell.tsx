'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Calendar, Users, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

const nav = [
  { href: '/admin/dashboard', label: 'Overzicht', icon: LayoutDashboard },
  { href: '/admin/dashboard/bookings', label: 'Reserveringen', icon: Calendar },
  { href: '/admin/dashboard/calendar', label: 'Agenda', icon: Calendar },
  { href: '/admin/dashboard/customers', label: 'Klanten', icon: Users },
  { href: '/admin/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
];

export function DashboardShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col md:flex-row">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-line bg-bg sticky top-0 z-30"
        style={{ paddingTop: `max(1rem, calc(env(safe-area-inset-top) + 0.5rem))` }}>
        <div className="font-display text-xl italic font-medium">
          Cuts by <span className="not-italic font-bold">AK</span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-64 md:min-h-screen md:border-r border-line bg-bg md:sticky md:top-0`}
      >
        <div className="hidden md:block px-7 py-8 border-b border-line">
          <div className="font-display text-2xl italic font-medium">
            Cuts by <span className="not-italic font-bold">AK</span>
          </div>
          <div className="text-[0.6rem] tracking-[0.3em] uppercase text-muted mt-1">
            Admin Dashboard
          </div>
        </div>

        <nav className="flex-1 py-4 px-3">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 mb-1 text-sm tracking-wide transition-colors ${
                  active
                    ? 'bg-bg-card text-ink border-l-2 border-ink'
                    : 'text-muted hover:text-ink hover:bg-bg-card'
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-line p-4">
          <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted mb-2">
            Ingelogd als
          </div>
          <div className="text-sm text-ink mb-4 truncate">{userEmail}</div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 text-[0.7rem] tracking-[0.22em] uppercase text-muted hover:text-ink border border-line-soft hover:border-ink transition-all"
          >
            <LogOut size={14} strokeWidth={1.5} />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
