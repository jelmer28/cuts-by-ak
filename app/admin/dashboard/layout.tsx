import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/admin/DashboardShell';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return <DashboardShell userEmail={user.email!}>{children}</DashboardShell>;
}
