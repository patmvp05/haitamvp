# Haita MVP — Hotel TV Guest Experience

A TV-first web app that turns a boutique hotel's in-room Android smart TVs into a
personalized guest welcome screen. This is the **Phase 1 prototype**: a single
room (`/tv/101`) rendering real, personalized content from Supabase.

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

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase (Postgres).

## Getting started

1. **Install**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env.local` and fill in your Supabase values:

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

   Open <http://localhost:3000/tv/101>.

## How data works

All reads are server-side using the Supabase **service role** key. Every table
has Row Level Security enabled with **no policies**, so the anon/public key can
read nothing — a leaked anon key exposes no guest data. Edit room/guest content
directly in Supabase Studio; the screen auto-refreshes every 5 minutes.

## Project layout

```
src/app/tv/[room]/     Guest screen route + loading/error/not-found states
src/components/tv/      TV UI components (FocusableCard, WeatherWidget, …)
src/lib/                Supabase client, Open-Meteo weather, QR, data loader
supabase/               SQL migration + seed
```

## Not in this phase

Staff dashboard, the Android TV kiosk shell (FreeKiosk / Webview Kiosk on real
hardware), guest service requests, multi-language switching, promotions, device
telemetry, and authentication are all deferred to later phases. The schema is
already sized for them.
