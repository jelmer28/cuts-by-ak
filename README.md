# Cuts by AK · Premium Barbershop Website

Een complete Next.js 15 + Supabase applicatie voor Cuts by AK barbershop in Heerenveen.

## ✨ Features

- **Cinematische landing page** met hero video (desktop) / 4K image (mobile)
- **Online booking system** met 4-staps flow (service → datum/tijd → gegevens → bevestiging)
- **Admin dashboard** met email/wachtwoord login
- **Beschermde routes** via Supabase auth + middleware
- **Real-time slot availability** check (geen dubbele boekingen)
- **Customer management** met automatische upsert op telefoonnummer
- **Calendar view** met weeknavigatie
- **Analytics** met service-breakdown en omzet per periode
- **Volledig responsive** (iOS Safari geoptimaliseerd, safe-area support)
- **SEO + PWA ready** (open graph, theme color, manifest-ready)

## 🛠 Tech Stack

- Next.js 15 (App Router)
- React 19 RC
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Supabase (auth + database + RLS)
- Lucide React (icons)

## 📁 Project Structure

```
cuts-by-ak-app/
├── app/
│   ├── page.tsx                    # Homepage (server component)
│   ├── HomePage.tsx                # Client wrapper
│   ├── layout.tsx                  # Root layout + fonts
│   ├── globals.css                 # Tailwind + custom CSS
│   ├── api/
│   │   └── bookings/route.ts       # POST + GET bookings
│   └── admin/
│       ├── login/page.tsx          # Admin login
│       └── dashboard/
│           ├── layout.tsx          # Dashboard shell wrapper
│           ├── page.tsx            # Overview
│           ├── bookings/page.tsx   # All bookings management
│           ├── calendar/page.tsx   # Week calendar
│           ├── customers/page.tsx  # Customer list
│           └── analytics/page.tsx  # Stats + insights
├── components/
│   ├── sections/                   # Public site sections
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── Results.tsx
│   │   ├── Reviews.tsx
│   │   ├── Barber.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── booking/                    # Booking modal
│   │   ├── BookingModal.tsx
│   │   ├── ServiceStep.tsx
│   │   ├── DateTimeStep.tsx
│   │   ├── DetailsStep.tsx
│   │   └── ConfirmStep.tsx
│   └── admin/                      # Admin dashboard components
│       ├── DashboardShell.tsx
│       ├── BookingsTable.tsx
│       └── CalendarView.tsx
├── lib/
│   ├── supabase-browser.ts         # Browser client
│   ├── supabase-server.ts          # Server client (cookies)
│   ├── supabase-service.ts         # Service-role client (admin)
│   ├── config.ts                   # Business config + hours
│   ├── utils.ts                    # Date/price helpers
│   └── types.ts                    # TS types matching DB
├── supabase/
│   └── migrations/
│       └── 20260101000000_initial_schema.sql
├── middleware.ts                   # Auth protection
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

---

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Ga naar [supabase.com](https://supabase.com) en maak een nieuw project
2. Wacht tot het project klaar is (1-2 minuten)
3. Ga naar **Settings → API** en kopieer:
   - Project URL
   - `anon` `public` key
   - `service_role` key (HOUD GEHEIM, alleen server-side)

### 3. Run database migration

In Supabase dashboard:
1. Ga naar **SQL Editor**
2. Open `supabase/migrations/20260101000000_initial_schema.sql`
3. Plak de hele inhoud in de editor
4. Klik **Run**

Dit maakt aan:
- `services` tabel + seed data (4 services met prijzen)
- `customers` tabel
- `bookings` tabel met status enum
- `page_visits` tabel voor analytics
- Row Level Security policies
- Indexes voor performance

### 4. Maak een admin user aan

In Supabase dashboard:
1. Ga naar **Authentication → Users**
2. Klik **Add user → Create new user**
3. Email: `ak@cutsbyak.nl` (of jouw eigen email)
4. Password: kies een sterk wachtwoord (min. 8 karakters)
5. Vink **Auto Confirm User** aan
6. Klik **Create user**

**Belangrijk:** in de huidige RLS policies kan iedereen die ingelogd is bij Supabase de admin tabellen lezen. Voor productie wil je waarschijnlijk een `admin` role toevoegen — zie sectie "Hardening" onderaan.

### 5. Maak `.env.local`

Kopieer `.env.local.example` naar `.env.local` en vul in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 6. Run de development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 7. Test de booking flow

1. Klik op "Boek nu" rechtsboven of "Reserveer je plek" in de hero
2. Doorloop alle 4 stappen
3. Bevestig de reservering
4. Ga naar [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
5. Log in met je admin account
6. Bekijk de reservering in het dashboard

---

## 🌐 Deployment naar Vercel

```bash
# 1. Push naar GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <jouw-repo>
git push -u origin main

# 2. Importeer in Vercel
# - Ga naar vercel.com → New Project
# - Selecteer je repo
# - Voeg dezelfde env variables toe als in .env.local
# - Deploy
```

Update na deployment in Supabase:
- **Authentication → URL Configuration**
- Voeg je productie URL toe aan **Site URL** en **Redirect URLs**

---

## 🔒 Hardening voor productie

De huidige opzet werkt voor één admin. Voor meerdere admins of strakkere security:

**1. Voeg een `admin` role toe in Supabase:**

```sql
-- In SQL Editor
create type user_role as enum ('admin', 'staff');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role default 'staff',
  created_at timestamptz default now()
);

-- Trigger om bij signup automatisch profile aan te maken
create function handle_new_user() returns trigger as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
```

**2. Pas RLS policies aan:**

```sql
-- Replace authenticated check with admin check
drop policy "bookings_admin_all" on bookings;
create policy "bookings_admin_all" on bookings
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );
```

**3. Update middleware.ts** om alleen admins door te laten:

```typescript
// In middleware na getUser():
if (url.startsWith('/admin/dashboard')) {
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}
```

**4. Activate rate limiting** op `/api/bookings` (via Vercel Edge of Upstash).

**5. Voeg email confirmation toe** voor bookings (via Supabase Edge Functions of Resend).

---

## 🎨 Customization

### Wijzig openingstijden
Edit `lib/config.ts` → `OPENING_HOURS`

### Wijzig services / prijzen
Edit de seed in `supabase/migrations/20260101000000_initial_schema.sql`, of update via Supabase UI in de `services` tabel.

### Wijzig kleurpalet
Edit `tailwind.config.ts` → `theme.extend.colors`

### Voeg eigen foto's toe
Upload naar `/public/images/` en vervang de Unsplash URLs in:
- `components/sections/Hero.tsx`
- `components/sections/Results.tsx`
- `components/sections/Barber.tsx`

### Custom hero video
Vervang de Coverr URL in `components/sections/Hero.tsx` met je eigen MP4. Tip: gebruik Cloudflare Stream of Mux voor optimale levering.

---

## 📞 Support

Voor vragen over deze codebase: neem contact op met je developer.

Voor Supabase docs: [supabase.com/docs](https://supabase.com/docs)
Voor Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
