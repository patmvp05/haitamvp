/** Room numbers this six-room hotel deployment serves. */
export const ROOM_NUMBERS = ['101', '102', '103', '104', '105', '106'] as const;

export type RoomNumber = (typeof ROOM_NUMBERS)[number];

export function isKnownRoomNumber(value: string): value is RoomNumber {
  return (ROOM_NUMBERS as readonly string[]).includes(value);
}

/**
 * Last-resort reception phone, shown on the "can't reach hotel systems" screen
 * when even hotel_settings can't be loaded from Supabase. Configured via env so
 * it can differ per hotel without a code change.
 */
export const FALLBACK_RECEPTION_PHONE =
  process.env.NEXT_PUBLIC_FALLBACK_RECEPTION_PHONE ?? 'the front desk';
