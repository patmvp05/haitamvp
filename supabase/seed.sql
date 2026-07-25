-- Haita MVP — Phase 1 seed data.
-- Populates a demo hotel with room 101 occupied, so /tv/101 renders real-looking
-- content out of the box. Run automatically by `supabase db reset`, or paste
-- into the Supabase SQL Editor after applying the migration on a hosted project.

insert into languages (code, label, is_active) values
  ('en', 'English', true),
  ('zh', '简体中文', true),
  ('ko', '한국어', true),
  ('vi', 'Tiếng Việt', true)
on conflict (code) do nothing;

insert into hotel_settings (
  id, hotel_name, wifi_ssid, wifi_password, breakfast_hours, checkout_time,
  reception_phone, reception_contact_label, reception_contact_url, jellyfin_url
) values (
  1,
  'Haita',
  'Haita_Guest',
  'Welcome2026!',
  '6:30 AM – 9:30 AM',
  '11:00',
  '+84 28 1234 5678',
  'Chat with Reception on Zalo',
  'https://zalo.me/84281234567',
  'https://movies.example.com/placeholder'
)
on conflict (id) do update set
  hotel_name              = excluded.hotel_name,
  wifi_ssid               = excluded.wifi_ssid,
  wifi_password           = excluded.wifi_password,
  breakfast_hours         = excluded.breakfast_hours,
  checkout_time           = excluded.checkout_time,
  reception_phone         = excluded.reception_phone,
  reception_contact_label = excluded.reception_contact_label,
  reception_contact_url   = excluded.reception_contact_url,
  jellyfin_url            = excluded.jellyfin_url,
  updated_at              = now();

-- Room 101: occupied by a demo guest for a 3-day stay.
with new_guest as (
  insert into guests (first_name, last_name, preferred_language, welcome_message, special_occasion)
  values (
    'David', 'Nguyen', 'en',
    'Welcome back, David. We hope you enjoy your stay with us at Haita — and that tonight feels worth celebrating.',
    'Anniversary'
  )
  returning id
)
insert into rooms (
  room_number, current_guest_id, checkin_date, checkout_date, checkout_time,
  weather_location_name, weather_latitude, weather_longitude, housekeeping_status
)
select
  '101', new_guest.id, current_date, current_date + interval '3 days', '11:00',
  'Ho Chi Minh City, Vietnam', 10.7769, 106.7009, 'clean'
from new_guest
on conflict (room_number) do update set
  current_guest_id      = excluded.current_guest_id,
  checkin_date          = excluded.checkin_date,
  checkout_date         = excluded.checkout_date,
  checkout_time         = excluded.checkout_time,
  weather_location_name = excluded.weather_location_name,
  weather_latitude      = excluded.weather_latitude,
  weather_longitude     = excluded.weather_longitude,
  updated_at            = now();

-- Rooms 102–106: unoccupied stubs so the deployment is sized for six rooms.
insert into rooms (room_number, weather_location_name, weather_latitude, weather_longitude)
values
  ('102', 'Ho Chi Minh City, Vietnam', 10.7769, 106.7009),
  ('103', 'Ho Chi Minh City, Vietnam', 10.7769, 106.7009),
  ('104', 'Ho Chi Minh City, Vietnam', 10.7769, 106.7009),
  ('105', 'Ho Chi Minh City, Vietnam', 10.7769, 106.7009),
  ('106', 'Ho Chi Minh City, Vietnam', 10.7769, 106.7009)
on conflict (room_number) do nothing;

-- Five hotel-approved local recommendations.
insert into recommendations (name, description, category, distance_label, hours_label, sort_order, is_active) values
  ('Bánh Mì Huỳnh Hoa', 'Legendary loaded bánh mì stacked with cold cuts and pâté.', 'Food', '6 min walk', '6:00 AM – 9:00 PM', 1, true),
  ('War Remnants Museum', 'Powerful war history museum with outdoor military exhibits.', 'Attraction', '15 min walk', '7:30 AM – 6:00 PM', 2, true),
  ('Bến Thành Market', 'Iconic covered market for souvenirs, textiles, and street food.', 'Shopping', '10 min walk', '6:00 AM – 6:00 PM', 3, true),
  ('L''Usine Cafe', 'Industrial-chic cafe with strong Vietnamese coffee and pastries.', 'Cafe', '8 min walk', '7:00 AM – 10:00 PM', 4, true),
  ('Bitexco Skydeck', 'Panoramic city views from the 49th-floor observation deck.', 'Attraction', '12 min walk', '9:30 AM – 9:30 PM', 5, true)
on conflict (name) do nothing;
