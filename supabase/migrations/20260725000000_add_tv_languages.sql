-- Add every language offered by the guest TV selector. These rows also keep
-- guests.preferred_language valid for staff-selected Chinese and Korean stays.
insert into languages (code, label, is_active) values
  ('en', 'English', true),
  ('zh', '简体中文', true),
  ('ko', '한국어', true),
  ('vi', 'Tiếng Việt', true)
on conflict (code) do update set
  label = excluded.label,
  is_active = true;
