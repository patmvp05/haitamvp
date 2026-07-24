import 'server-only';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '../supabase/server';
import { fetchWeatherSafely } from '../weather';
import { buildWifiQrPayload, generateQrDataUrl } from '../qrcode';
import { retry } from '../retry';
import { HotelSystemsUnavailableError } from '../errors';
import type {
  GuestRecord,
  HotelSettingsRecord,
  RecommendationRecord,
  RoomRecord,
  RoomTvData,
} from './types';

interface CoreData {
  room: RoomRecord | null;
  hotelSettings: HotelSettingsRecord;
  recommendations: RecommendationRecord[];
}

/**
 * Load everything the guest screen needs for a given room number.
 *
 * - Supabase reads are retried, then wrapped in HotelSystemsUnavailableError on
 *   persistent failure so the route's error boundary shows the fallback screen.
 * - A room number that simply doesn't exist triggers notFound() (a different,
 *   non-error condition than an outage). notFound() is called OUTSIDE the
 *   try/catch so its control-flow signal isn't swallowed as a systems error.
 * - Weather and QR generation are best-effort and never fail the whole screen.
 */
export async function getRoomTvData(roomNumber: string): Promise<RoomTvData> {
  let core: CoreData;
  try {
    core = await retry(async () => {
      const supabase = getSupabaseServer();

      const [roomRes, settingsRes, recsRes] = await Promise.all([
        supabase
          .from('rooms')
          .select(
            'id, room_number, current_guest_id, checkin_date, checkout_date, checkout_time, ' +
              'weather_location_name, weather_latitude, weather_longitude, housekeeping_status, ' +
              'guest:current_guest_id (id, first_name, last_name, preferred_language, welcome_message, special_occasion)',
          )
          .eq('room_number', roomNumber)
          .maybeSingle(),
        supabase.from('hotel_settings').select('*').eq('id', 1).maybeSingle(),
        supabase
          .from('recommendations')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true }),
      ]);

      if (roomRes.error) throw roomRes.error;
      if (settingsRes.error) throw settingsRes.error;
      if (recsRes.error) throw recsRes.error;
      if (!settingsRes.data) throw new Error('hotel_settings row is missing');

      const roomRow = roomRes.data as (RoomRecord & { guest: GuestRecord | GuestRecord[] | null }) | null;

      return {
        room: roomRow,
        hotelSettings: settingsRes.data as HotelSettingsRecord,
        recommendations: (recsRes.data ?? []) as RecommendationRecord[],
      };
    }, 2, 500);
  } catch (error) {
    console.error('[getRoomTvData] hotel systems unavailable:', error);
    throw new HotelSystemsUnavailableError(undefined, { cause: error });
  }

  const roomRow = core.room as (RoomRecord & { guest: GuestRecord | GuestRecord[] | null }) | null;
  if (!roomRow) notFound();

  // Supabase returns an embedded to-one relation as an object, but the typings
  // widen it to an array in some versions — normalize either shape.
  const guest: GuestRecord | null = Array.isArray(roomRow.guest)
    ? roomRow.guest[0] ?? null
    : roomRow.guest ?? null;

  const { hotelSettings, recommendations } = core;

  const [weather, wifiQrDataUrl, receptionQrDataUrl] = await Promise.all([
    fetchWeatherSafely(
      roomRow.weather_latitude,
      roomRow.weather_longitude,
      roomRow.weather_location_name,
    ),
    hotelSettings.wifi_ssid
      ? generateQrDataUrl(
          buildWifiQrPayload(hotelSettings.wifi_ssid, hotelSettings.wifi_password ?? ''),
        ).catch(() => null)
      : Promise.resolve(null),
    hotelSettings.reception_contact_url
      ? generateQrDataUrl(hotelSettings.reception_contact_url).catch(() => null)
      : Promise.resolve(null),
  ]);

  return {
    room: {
      id: roomRow.id,
      room_number: roomRow.room_number,
      current_guest_id: roomRow.current_guest_id,
      checkin_date: roomRow.checkin_date,
      checkout_date: roomRow.checkout_date,
      checkout_time: roomRow.checkout_time,
      weather_location_name: roomRow.weather_location_name,
      weather_latitude: roomRow.weather_latitude,
      weather_longitude: roomRow.weather_longitude,
      housekeeping_status: roomRow.housekeeping_status,
    },
    guest,
    hotelSettings,
    recommendations,
    weather,
    wifiQrDataUrl,
    receptionQrDataUrl,
  };
}
