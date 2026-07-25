import 'server-only';

import { requireStaffSession } from '@/lib/admin/auth';
import type {
  AdminHotelSettingsRecord,
  AdminRecommendationRecord,
  AdminRoomRecord,
  LanguageRecord,
} from '@/lib/admin/types';
import type { GuestRecord } from '@/lib/data/types';
import { HotelSystemsUnavailableError } from '@/lib/errors';
import { retry } from '@/lib/retry';
import { getSupabaseServer } from '@/lib/supabase/server';

type RoomQueryRow = Omit<AdminRoomRecord, 'guest'> & {
  guest: GuestRecord | GuestRecord[] | null;
};

function normalizeGuest(
  guest: GuestRecord | GuestRecord[] | null,
): GuestRecord | null {
  return Array.isArray(guest) ? guest[0] ?? null : guest;
}

export async function getAdminRooms(): Promise<AdminRoomRecord[]> {
  await requireStaffSession();

  try {
    return await retry(async () => {
      const { data, error } = await getSupabaseServer()
        .from('rooms')
        .select(
          'id, room_number, current_guest_id, checkin_date, checkout_date, ' +
            'guest:current_guest_id (id, first_name, last_name, preferred_language, welcome_message, special_occasion)',
        )
        .order('room_number', { ascending: true });

      if (error) throw error;

      return ((data ?? []) as unknown as RoomQueryRow[]).map((room) => ({
        ...room,
        guest: normalizeGuest(room.guest),
      }));
    }, 2, 500);
  } catch (error) {
    console.error('[getAdminRooms] hotel systems unavailable:', error);
    throw new HotelSystemsUnavailableError(undefined, { cause: error });
  }
}

export async function getAdminRoom(
  roomId: string,
): Promise<AdminRoomRecord | null> {
  await requireStaffSession();

  let roomRow: RoomQueryRow | null = null;
  try {
    roomRow = await retry(async () => {
      const { data, error } = await getSupabaseServer()
        .from('rooms')
        .select(
          'id, room_number, current_guest_id, checkin_date, checkout_date, ' +
            'guest:current_guest_id (id, first_name, last_name, preferred_language, welcome_message, special_occasion)',
        )
        .eq('id', roomId)
        .maybeSingle();

      if (error) throw error;
      return (data as unknown as RoomQueryRow) ?? null;
    }, 2, 500);
  } catch (error) {
    console.error('[getAdminRoom] hotel systems unavailable:', error);
    throw new HotelSystemsUnavailableError(undefined, { cause: error });
  }

  if (!roomRow) return null;
  return { ...roomRow, guest: normalizeGuest(roomRow.guest) };
}

export async function getActiveLanguages(): Promise<LanguageRecord[]> {
  await requireStaffSession();

  try {
    return await retry(async () => {
      const { data, error } = await getSupabaseServer()
        .from('languages')
        .select('code, label')
        .eq('is_active', true)
        .order('label', { ascending: true });

      if (error) throw error;
      return (data ?? []) as LanguageRecord[];
    }, 2, 500);
  } catch (error) {
    console.error('[getActiveLanguages] hotel systems unavailable:', error);
    throw new HotelSystemsUnavailableError(undefined, { cause: error });
  }
}

export async function getAdminHotelSettings(): Promise<AdminHotelSettingsRecord> {
  await requireStaffSession();

  try {
    return await retry(async () => {
      const { data, error } = await getSupabaseServer()
        .from('hotel_settings')
        .select(
          'id, hotel_name, wifi_ssid, wifi_password, breakfast_hours, checkout_time, ' +
            'reception_phone, reception_contact_label, reception_contact_url, jellyfin_url',
        )
        .eq('id', 1)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('The hotel_settings singleton row is missing.');
      return data as unknown as AdminHotelSettingsRecord;
    }, 2, 500);
  } catch (error) {
    console.error('[getAdminHotelSettings] hotel systems unavailable:', error);
    throw new HotelSystemsUnavailableError(undefined, { cause: error });
  }
}

export async function getAdminRecommendations(): Promise<
  AdminRecommendationRecord[]
> {
  await requireStaffSession();

  try {
    return await retry(async () => {
      const { data, error } = await getSupabaseServer()
        .from('recommendations')
        .select(
          'id, name, description, category, distance_label, hours_label, sort_order, is_active',
        )
        .order('is_active', { ascending: false })
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      return (data ?? []) as AdminRecommendationRecord[];
    }, 2, 500);
  } catch (error) {
    console.error('[getAdminRecommendations] hotel systems unavailable:', error);
    throw new HotelSystemsUnavailableError(undefined, { cause: error });
  }
}
