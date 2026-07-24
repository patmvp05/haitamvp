# Deployment Guide — Haita MVP

This guide provides step-by-step instructions for provisioning a hosted Supabase database, applying migrations and seed data, deploying the Next.js application to Vercel, and verifying production readiness.

---

## Architecture Overview

- **Frontend / Server Runtime**: Next.js 16 (App Router, Server Components) hosted on [Vercel](https://vercel.com).
- **Database / Data Layer**: Managed PostgreSQL hosted on [Supabase](https://supabase.com).
- **Data Access Security**: All guest data reads occur server-side using the Supabase `service_role` secret key. Row Level Security (RLS) is enabled on all tables with no public policies, ensuring public `anon` keys cannot read room or guest records directly.

---

## Step 1: Provision a Hosted Supabase Project

1. Log in to your [Supabase Account](https://supabase.com/dashboard).
2. Click **New Project** and select your organization.
3. Configure the project:
   - **Name**: `Haita Hotel TV` (or your preferred name)
   - **Database Password**: Generate a secure password and store it safely.
   - **Region**: Select the region closest to your hotel location (e.g., `Singapore (ap-southeast-1)`).
4. Click **Create new project** and wait for database provisioning to complete (typically ~1-2 minutes).
5. Once ready, go to **Project Settings** (gear icon) → **API**:
   - Copy **Project URL** (e.g., `https://xyzcompany.supabase.co`).
   - Copy **`service_role` key** (Secret / Server-side key).
   - Copy **`anon` key** (Public key).

---

## Step 2: Initialize Database Schema and Seed Data

Execute the database SQL files in order using the Supabase SQL Editor.

### 1. Apply Schema Migration
1. In the Supabase Dashboard, open the **SQL Editor** from the left navigation menu.
2. Click **New Query**.
3. Open [`supabase/migrations/20260724000000_init_schema.sql`](../supabase/migrations/20260724000000_init_schema.sql) from this repository, copy its entire contents, and paste them into the SQL Editor.
4. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`).
5. Confirm output shows `Success. No rows returned`.

### 2. Apply Seed Data
1. Click **New Query** again.
2. Open [`supabase/seed.sql`](../supabase/seed.sql) from this repository, copy its entire contents, and paste them into the SQL Editor.
3. Click **Run**.
4. Navigate to **Table Editor** in the left menu to verify that the following tables exist and contain initial rows:
   - `hotel_settings`: 1 row (Hotel name: Haita, Wi-Fi: Haita_Guest, etc.)
   - `rooms`: 6 rows (Room 101 occupied, Rooms 102–106 stubs)
   - `guests`: 1 row (David Nguyen)
   - `recommendations`: 5 rows (Local attractions, restaurants, cafes)
   - `languages`: 2 rows (`en`, `vi`)

---

## Step 3: Deploy to Vercel

1. Log in to your [Vercel Account](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Select your Git provider and import the `patmvp05/haitamvp` repository.
4. Configure the deployment settings:
   - **Framework Preset**: `Next.js` (automatically detected).
   - **Root Directory**: `./` (default).
   - **Build Command**: `next build` (default).
   - **Output Directory**: `.next` (default).
5. Expand the **Environment Variables** section and add the following keys:

| Environment Variable | Value | Notes |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<YOUR-PROJECT-REF>.supabase.co` | From Supabase Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | `<YOUR-SERVICE-ROLE-KEY>` | **Secret** key for server-side data fetches |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `<YOUR-ANON-KEY>` | Public key (reserved for Phase 2 staff dashboard) |
| `NEXT_PUBLIC_FALLBACK_RECEPTION_PHONE` | `+84 28 1234 5678` | Displayed on fallback and 404 screens |

6. Click **Deploy**. Vercel will build the project and assign a production URL (e.g., `https://haita-mvp.vercel.app`).

---

## Step 4: Verify Production Deployment

Once Vercel completes the build, test the live deployment URL:

1. **Demo Room Screen (`/tv/101`)**:
   - Navigate to `https://<YOUR-VERCEL-DOMAIN>/tv/101`.
   - Verify guest welcome greeting displays **"Welcome, David"**.
   - Verify room readout displays **"ROOM 101"**.
   - Verify checkout time, local weather widget, 5 local recommendation tiles, and action dock icons (Wi-Fi, Reception, Movies) render with QR codes.
2. **Room Not Found Fallback (`/tv/999`)**:
   - Navigate to `https://<YOUR-VERCEL-DOMAIN>/tv/999`.
   - Verify the **"Room Not Found"** screen displays with the fallback reception contact number.
3. **Keyboard & Remote Control Navigation**:
   - Press `Tab` / `Shift+Tab` to verify focus indicator moves visibly across Wi-Fi, Reception, and Movies cards.
4. **Data Updates via Supabase Studio**:
   - In Supabase Table Editor, update `guests.first_name` or `hotel_settings.wifi_ssid`.
   - The TV screen will pick up changes automatically within 5 minutes or on page refresh.

---

## Troubleshooting

- **"We can't reach the hotel systems right now" Fallback Screen**:
  - Verify that `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` environment variables in Vercel settings match your Supabase project credentials exactly.
  - Redeploy the project on Vercel after updating environment variables.
- **Build Errors**:
  - Run `npm run typecheck` and `npm run lint` locally before pushing changes.
