import type { WeatherSnapshot } from '../weather';

export interface GuestRecord {
  id: string;
  first_name: string;
  last_name: string;
  preferred_language: string;
  welcome_message: string | null;
  special_occasion: string | null;
}

export interface HotelSettingsRecord {
  id: number;
  hotel_name: string;
  wifi_ssid: string | null;
  wifi_password: string | null;
  breakfast_hours: string | null;
  checkout_time: string | null;
  reception_phone: string | null;
  reception_contact_label: string | null;
  reception_contact_url: string | null;
  jellyfin_url: string | null;
}

export interface RoomRecord {
  id: string;
  room_number: string;
  current_guest_id: string | null;
  checkin_date: string | null;
  checkout_date: string | null;
  checkout_time: string | null;
  weather_location_name: string | null;
  weather_latitude: number | null;
  weather_longitude: number | null;
  housekeeping_status: string;
}

export interface RecommendationRecord {
  id: string;
  name: string;
  description: string;
  category: string | null;
  distance_label: string | null;
  hours_label: string | null;
  sort_order: number;
  is_active: boolean;
}

/** Everything the guest TV screen needs, assembled server-side. */
export interface RoomTvData {
  room: RoomRecord;
  guest: GuestRecord | null;
  hotelSettings: HotelSettingsRecord;
  recommendations: RecommendationRecord[];
  weather: WeatherSnapshot | null;
  wifiQrDataUrl: string | null;
  receptionQrDataUrl: string | null;
}
