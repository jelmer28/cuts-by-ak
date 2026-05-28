import { createClient } from '@supabase/supabase-js';

// Service-role client bypasses RLS. ONLY use server-side in API routes
// where you have already verified the request is allowed.
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
