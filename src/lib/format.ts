/**
 * Format a Postgres `time` value ("HH:MM" / "HH:MM:SS") as a friendly clock
 * time like "11:00 AM". Returns null for empty input.
 */
export function formatClockTime(time: string | null | undefined): string | null {
  if (!time) return null;
  const [h, m] = time.split(':');
  const hour = Number(h);
  const minute = Number(m ?? '0');
  if (Number.isNaN(hour)) return time;
  const dt = new Date();
  dt.setHours(hour, Number.isNaN(minute) ? 0 : minute, 0, 0);
  return dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

/**
 * Combine a checkout date ("YYYY-MM-DD") and time into "Monday at 11:00 AM".
 * Parsed without a timezone suffix so the calendar day and wall-clock time are
 * preserved regardless of server timezone. Returns null for empty input.
 */
export function formatCheckout(
  date: string | null,
  time: string | null,
): string | null {
  if (!date) return null;
  const clock = (time ?? '11:00').slice(0, 5);
  const dt = new Date(`${date}T${clock}`);
  if (Number.isNaN(dt.getTime())) return null;
  const weekday = dt.toLocaleDateString('en-US', { weekday: 'long' });
  const t = dt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${weekday} at ${t}`;
}
