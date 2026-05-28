export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';

export interface Service {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  duration_minutes: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  total_visits: number;
  total_spent_cents: number;
  first_visit_at: string;
  last_visit_at: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  customer_id: string | null;
  service_id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  service_name: string;
  service_price_cents: number;
  service_duration_minutes: number;
  start_at: string;
  end_at: string;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageVisit {
  id: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
  created_at: string;
}
