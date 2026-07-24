# Haita MVP — Hotel TV and Staff Dashboard

A TV-first web app that turns a boutique hotel's in-room Android smart TVs into a
personalized guest welcome screen, with a small staff dashboard for managing the
six rooms and their content.

## What it shows

Visit `/tv/101` for a full guest screen:

- Time-appropriate greeting + guest name, room number, and checkout date/time
- Live weather (Open-Meteo, no API key)
- Hotel info: Wi-Fi (network + password + scannable QR), breakfast hours,
  checkout time, reception phone
- Five hotel-approved local recommendations
- Contact Reception (phone + Zalo/WhatsApp QR)
- A "Watch Movies" button (Jellyfin URL placeholder)

Designed for a TV and remote: large high-contrast type, D-pad-navigable focus
states, no hover dependency, one non-scrolling viewport. If the hotel systems
can't be reached, a calm fallback screen appears (and self-heals) instead of a
blank crash.

## Staff dashboard

Visit `/admin` and sign in with the shared staff password configured in the
server environment. Staff can:

- See occupied and vacant rooms at a glance
- Assign, update, and clear room guests
- Update Wi-Fi, breakfast, checkout, reception, and Jellyfin details
- Add, edit, activate, and deactivate local recommendations

The dashboard uses signed, HTTP-only staff sessions. Every data read and Server
Action verifies that session before using the server-only Supabase service-role
client.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres).

## Getting started

1. **Install**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env.local` and fill in your Supabase and staff login
   values:

   ```bash
   cp .env.example .env.local
   ```

3. **Set up the database**

   Apply the schema and seed. Locally (requires Docker):

   ```bash
   npx supabase start
   npx supabase db reset   # applies migrations/ then seed.sql
   ```

   Or on a hosted Supabase project: run `supabase/migrations/20260724000000_init_schema.sql`
   then `supabase/seed.sql` in the SQL Editor.

4. **Run**

   ```bash
   npm run dev
   ```

   Open <http://localhost:3000/tv/101> for the seeded guest screen, or
   <http://localhost:3000/admin> for the staff dashboard.

## How data works

All Supabase access is server-side using the **service role** key. Every table
has Row Level Security enabled with **no policies**, so the anon/public key can
read or write nothing — a leaked anon key exposes no guest data. Staff writes
are accepted only from authenticated Server Actions. The guest screen
auto-refreshes every 5 minutes.

## Project layout

```
src/app/tv/[room]/     Guest screen route + loading/error/not-found states
src/app/admin/          Staff login, rooms, settings, and recommendations
src/components/admin/  Shared staff dashboard form components
src/components/tv/      TV UI components (FocusableCard, WeatherWidget, …)
src/lib/admin/          Staff session and protected data-access helpers
src/lib/                Supabase client, Open-Meteo weather, QR, data loader
supabase/               SQL migration + seed
```

## Not yet included

The Android TV kiosk shell (FreeKiosk / Webview Kiosk on real hardware), guest
service requests, multi-language TV rendering, promotions, device telemetry,
and a full multi-user identity system remain deferred. The schema is already
sized for them.
