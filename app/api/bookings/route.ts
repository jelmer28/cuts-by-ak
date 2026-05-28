import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-service';
import { formatTime } from '@/lib/utils';

// GET /api/bookings?date=YYYY-MM-DD
// Returns taken time slots for that date (public, doesn't expose customer data)
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  }

  const supabase = createServiceClient();

  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59`);

  const { data, error } = await supabase
    .from('bookings')
    .select('start_at, end_at')
    .gte('start_at', startOfDay.toISOString())
    .lte('start_at', endOfDay.toISOString())
    .in('status', ['pending', 'confirmed']);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return list of "HH:MM" strings that are taken
  const taken = (data || []).map((b) => formatTime(b.start_at));
  return NextResponse.json({ taken });
}

// POST /api/bookings
// Creates a new booking (and customer if new)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    service_id,
    customer_name,
    customer_phone,
    customer_email,
    start_at,
    end_at,
  } = body;

  // Validate
  if (!service_id || !customer_name || !customer_phone || !start_at || !end_at) {
    return NextResponse.json({ error: 'Ontbrekende velden' }, { status: 400 });
  }
  if (customer_name.length < 2 || customer_phone.length < 6) {
    return NextResponse.json({ error: 'Ongeldige gegevens' }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Look up service to snapshot price/duration/name
  const { data: service, error: svcErr } = await supabase
    .from('services')
    .select('*')
    .eq('id', service_id)
    .eq('is_active', true)
    .single();

  if (svcErr || !service) {
    return NextResponse.json({ error: 'Service niet gevonden' }, { status: 404 });
  }

  // Check overlap (server-side defense against race conditions)
  const { data: overlap } = await supabase
    .from('bookings')
    .select('id')
    .lt('start_at', end_at)
    .gt('end_at', start_at)
    .in('status', ['pending', 'confirmed'])
    .limit(1);

  if (overlap && overlap.length > 0) {
    return NextResponse.json(
      { error: 'Dit tijdslot is net gereserveerd. Kies een ander tijdstip.' },
      { status: 409 }
    );
  }

  // Upsert customer by phone
  const phoneNormalized = customer_phone.replace(/\s+/g, '');
  const { data: existingCustomer } = await supabase
    .from('customers')
    .select('id')
    .eq('phone', phoneNormalized)
    .maybeSingle();

  let customer_id: string;
  if (existingCustomer) {
    customer_id = existingCustomer.id;
    await supabase
      .from('customers')
      .update({ name: customer_name, email: customer_email || null })
      .eq('id', customer_id);
  } else {
    const { data: newCustomer, error: cusErr } = await supabase
      .from('customers')
      .insert({
        name: customer_name,
        phone: phoneNormalized,
        email: customer_email || null,
      })
      .select('id')
      .single();
    if (cusErr || !newCustomer) {
      return NextResponse.json({ error: 'Kon klant niet aanmaken' }, { status: 500 });
    }
    customer_id = newCustomer.id;
  }

  // Create booking
  const { data: booking, error: bookErr } = await supabase
    .from('bookings')
    .insert({
      customer_id,
      service_id,
      customer_name,
      customer_phone: phoneNormalized,
      customer_email: customer_email || null,
      service_name: service.name,
      service_price_cents: service.price_cents,
      service_duration_minutes: service.duration_minutes,
      start_at,
      end_at,
      status: 'pending',
    })
    .select('*')
    .single();

  if (bookErr || !booking) {
    return NextResponse.json({ error: 'Kon reservering niet aanmaken' }, { status: 500 });
  }

  return NextResponse.json({ booking });
}
