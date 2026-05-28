import HomePage from "./HomePage";

const services = [
  {
    id: "1",
    name: "Fade Cut",
    description: "Strakke fade haircut",
    duration_minutes: 45,
    price_cents: 3500,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Beard Trim",
    description: "Professionele beard trim",
    duration_minutes: 30,
    price_cents: 2000,
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Hair + Beard",
    description: "Complete haircut en beard combo",
    duration_minutes: 60,
    price_cents: 5000,
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
];

export default function Page() {
  return <HomePage services={services} />;
}