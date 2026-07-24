-- Haita MVP — Hotel TV Guest Experience
-- Phase 1 schema. Defines the FULL product data model up front so later phases
-- (staff dashboard, service requests, device telemetry, multi-language) need no
-- breaking migration. Phase 1 application code only reads: rooms, guests,
-- hotel_settings, recommendations.

create extension if not exists "pgcrypto";

-- Supported guest languages (Phase 2 language picker will use this).
create table if not exists languages (
  code text primary key,
  label text not null,
  is_active boolean not null default true
);

-- Guest currently (or previously) assigned to a room.
create table if not exists guests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  preferred_language text not null default 'en' references languages(code),
  welcome_message text,
  special_occasion text,
  created_at timestamptz not null default now()
);

-- Single hotel's global settings. Enforced singleton (id = 1).
create table if not exists hotel_settings (
  id smallint primary key default 1,
  hotel_name text not null,
  wifi_ssid text,
  wifi_password text,
  breakfast_hours text,
  checkout_time time not null default '11:00',
  reception_phone text,
  reception_contact_label text,
  reception_contact_url text,
  jellyfin_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint hotel_settings_singleton check (id = 1)
);

-- One row per physical room / TV.
create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  room_number text not null unique,
  current_guest_id uuid references guests(id) on delete set null,
  checkin_date date,
  checkout_date date,
  checkout_time time not null default '11:00',
  weather_location_name text,
  weather_latitude numeric(9,6),
  weather_longitude numeric(9,6),
  housekeeping_status text not null default 'clean'
    check (housekeeping_status in ('clean','dirty','in_progress','inspected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Hotel-approved local recommendations shown to guests.
create table if not exists recommendations (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text not null,
  category text,
  distance_label text,
  hours_label text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Phase 2 stub tables. Created now so the schema matches the full product
-- model. NOT read or written by any Phase 1 code.
-- ---------------------------------------------------------------------------
create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references rooms(id) on delete cascade,
  request_type text not null,
  status text not null default 'open'
    check (status in ('open','in_progress','done','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table if not exists devices (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references rooms(id) on delete set null,
  device_label text,
  last_seen_at timestamptz,
  app_version text,
  created_at timestamptz not null default now()
);

create index if not exists idx_rooms_room_number on rooms (room_number);
create index if not exists idx_recommendations_active_sort
  on recommendations (is_active, sort_order);

-- ---------------------------------------------------------------------------
-- Row Level Security: enabled on every table with ZERO policies. Phase 1 has
-- no auth and does all reads server-side with the service_role key, which
-- bypasses RLS. Enabling RLS with no policies means anon/public clients can
-- read nothing, so a leaked anon key exposes no guest data.
-- ---------------------------------------------------------------------------
alter table languages enable row level security;
alter table guests enable row level security;
alter table hotel_settings enable row level security;
alter table rooms enable row level security;
alter table recommendations enable row level security;
alter table announcements enable row level security;
alter table service_requests enable row level security;
alter table devices enable row level security;
