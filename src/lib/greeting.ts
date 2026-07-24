/**
 * Time-appropriate greeting. Computed from the device's local time (the TV sits
 * physically in the hotel), so it is correct regardless of server timezone.
 */
export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}
