-- ============================================
-- Cuts by AK · Database Schema
-- ============================================

-- Enable extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- SERVICES
-- ============================================
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price_cents integer not null,
  duration_minutes integer not null,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================
-- CUSTOMERS
-- ============================================
create table if not exists customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  notes text,
  total_visits integer default 0,
  total_spent_cents integer default 0,
  first_visit_at timestamptz default now(),
  last_visit_at timestamptz,
  created_at timestamptz default now(),
  unique(phone)
);

create index if not exists idx_customers_phone on customers(phone);
create index if not exists idx_customers_name on customers(name);

-- ============================================
-- BOOKINGS
-- ============================================
create type booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id) on delete set null,
  service_id uuid references services(id) on delete restrict not null,

  -- Snapshot fields (preserve data even if service is deleted later)
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  service_name text not null,
  service_price_cents integer not null,
  service_duration_minutes integer not null,

  -- Booking timing
  start_at timestamptz not null,
  end_at timestamptz not null,

  status booking_status default 'pending',
  notes text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_bookings_start_at on bookings(start_at);
create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_bookings_customer on bookings(customer_id);

-- ============================================
-- PAGE VISITS (Analytics)
-- ============================================
create table if not exists page_visits (
  id uuid primary key default uuid_generate_v4(),
  path text not null,
  referrer text,
  user_agent text,
  country text,
  created_at timestamptz default now()
);

create index if not exists idx_page_visits_created_at on page_visits(created_at);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Services: public read, admin write
alter table services enable row level security;

create policy "services_public_read" on services
  for select using (is_active = true);

create policy "services_admin_all" on services
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Customers: only admin can access (PII)
alter table customers enable row level security;

create policy "customers_admin_all" on customers
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Bookings: only admin can read; anyone can insert (via service role from API)
alter table bookings enable row level security;

create policy "bookings_admin_all" on bookings
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Page visits: only admin can read; service role inserts via API
alter table page_visits enable row level security;

create policy "page_visits_admin_read" on page_visits
  for select using (auth.role() = 'authenticated');

-- ============================================
-- TRIGGERS: auto-update timestamps
-- ============================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_bookings_updated_at
  before update on bookings
  for each row execute function update_updated_at_column();

-- ============================================
-- SEED DATA: Services
-- ============================================
insert into services (name, description, price_cents, duration_minutes, sort_order) values
  ('Knippen & Stylen', 'Strakke fade, taper of klassieke cut, inclusief föhnen en stylen.', 2000, 40, 1),
  ('Knippen & Baard', 'De complete behandeling: cut + baard trimmen en scherpe lijntjes. Onze populairste service.', 2650, 45, 2),
  ('Baard Trimmen', 'Baard trimmen en scherp gelijnd voor een verzorgde uitstraling.', 1250, 15, 3),
  ('Kids Cut', 'Speciaal voor de jongste klanten t/m 12 jaar.', 1650, 40, 4)
on conflict do nothing;
