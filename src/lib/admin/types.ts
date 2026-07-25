import type {
  GuestRecord,
  HotelSettingsRecord,
  RecommendationRecord,
} from '@/lib/data/types';

export interface AdminRoomRecord {
  id: string;
  room_number: string;
  current_guest_id: string | null;
  checkin_date: string | null;
  checkout_date: string | null;
  guest: GuestRecord | null;
}

export interface LanguageRecord {
  code: string;
  label: string;
}

export type AdminHotelSettingsRecord = HotelSettingsRecord;
export type AdminRecommendationRecord = RecommendationRecord;

export interface LoginState {
  error: string | null;
}
