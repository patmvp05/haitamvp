'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  clearStaffSession,
  createStaffSession,
  isStaffAuthConfigured,
  requireStaffSession,
  verifyStaffPassword,
} from '@/lib/admin/auth';
import type { LoginState } from '@/lib/admin/types';
import { getSupabaseServer } from '@/lib/supabase/server';

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function readText(
  formData: FormData,
  name: string,
  maxLength: number,
): string | null {
  const entry = formData.get(name);
  if (typeof entry !== 'string') return null;

  const value = entry.trim();
  return value.length > 0 && value.length <= maxLength ? value : null;
}

function readOptionalText(
  formData: FormData,
  name: string,
  maxLength: number,
): string | null | undefined {
  const entry = formData.get(name);
  if (typeof entry !== 'string') return undefined;

  const value = entry.trim();
  if (!value) return null;
  return value.length <= maxLength ? value : undefined;
}

function isValidDate(value: string | null): boolean {
  if (value === null) return true;
  if (!DATE_PATTERN.test(value)) return false;

  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

function isValidHttpUrl(value: string | null): boolean {
  if (value === null) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function readSortOrder(formData: FormData): number | null {
  const raw = formData.get('sort_order');
  if (typeof raw !== 'string' || !/^-?\d+$/.test(raw)) return null;

  const value = Number(raw);
  return Number.isSafeInteger(value) && value >= -1000 && value <= 10000
    ? value
    : null;
}

function redirectToStatus(path: string, status: string): never {
  redirect(`${path}?status=${status}`);
}

function revalidateTvScreens(): void {
  revalidatePath('/tv/[room]', 'page');
}

function currentHotelDate(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isStaffAuthConfigured()) {
    return {
      error:
        'Staff login is not configured. Ask the site administrator to set the staff environment variables.',
    };
  }

  const password = formData.get('password');
  if (typeof password !== 'string' || !verifyStaffPassword(password)) {
    return { error: 'That password is not correct.' };
  }

  await createStaffSession();
  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  await clearStaffSession();
  redirect('/admin/login');
}

export async function saveRoomGuestAction(
  roomId: string,
  formData: FormData,
): Promise<void> {
  await requireStaffSession();

  const path = `/admin/rooms/${roomId}`;
  const firstName = readText(formData, 'first_name', 100);
  const lastName = readText(formData, 'last_name', 100);
  const preferredLanguage = readText(
    formData,
    'preferred_language',
    20,
  );
  const welcomeMessage = readOptionalText(
    formData,
    'welcome_message',
    1000,
  );
  const specialOccasion = readOptionalText(
    formData,
    'special_occasion',
    200,
  );
  const checkoutDate = readOptionalText(formData, 'checkout_date', 10);

  if (
    !UUID_PATTERN.test(roomId) ||
    !firstName ||
    !lastName ||
    !preferredLanguage ||
    welcomeMessage === undefined ||
    specialOccasion === undefined ||
    checkoutDate === undefined ||
    !isValidDate(checkoutDate)
  ) {
    redirectToStatus(path, 'invalid');
  }

  const supabase = getSupabaseServer();
  const [roomResult, languageResult] = await Promise.all([
    supabase
      .from('rooms')
      .select('id, room_number, current_guest_id')
      .eq('id', roomId)
      .maybeSingle(),
    supabase
      .from('languages')
      .select('code')
      .eq('code', preferredLanguage)
      .eq('is_active', true)
      .maybeSingle(),
  ]);

  if (roomResult.error || languageResult.error) {
    console.error(
      '[staff-dashboard] Failed to validate room guest update:',
      roomResult.error ?? languageResult.error,
    );
    redirectToStatus(path, 'error');
  }
  if (!roomResult.data) redirectToStatus('/admin', 'room-missing');
  if (!languageResult.data) redirectToStatus(path, 'invalid-language');

  let guestId = roomResult.data.current_guest_id as string | null;
  let createdGuestId: string | null = null;

  if (guestId) {
    const { error } = await supabase
      .from('guests')
      .update({
        first_name: firstName,
        last_name: lastName,
        preferred_language: preferredLanguage,
        welcome_message: welcomeMessage,
        special_occasion: specialOccasion,
      })
      .eq('id', guestId)
      .select('id')
      .single();

    if (error) {
      console.error('[staff-dashboard] Failed to update guest:', error);
      redirectToStatus(path, 'error');
    }
  } else {
    const { data, error } = await supabase
      .from('guests')
      .insert({
        first_name: firstName,
        last_name: lastName,
        preferred_language: preferredLanguage,
        welcome_message: welcomeMessage,
        special_occasion: specialOccasion,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('[staff-dashboard] Failed to create guest:', error);
      redirectToStatus(path, 'error');
    }

    guestId = data.id as string;
    createdGuestId = guestId;
  }

  const roomUpdate: {
    current_guest_id: string;
    checkout_date: string | null;
    updated_at: string;
    checkin_date?: string;
  } = {
    current_guest_id: guestId,
    checkout_date: checkoutDate,
    updated_at: new Date().toISOString(),
  };

  if (!roomResult.data.current_guest_id) {
    roomUpdate.checkin_date = currentHotelDate();
  }

  const { error: roomUpdateError } = await supabase
    .from('rooms')
    .update(roomUpdate)
    .eq('id', roomId)
    .select('id')
    .single();

  if (roomUpdateError) {
    if (createdGuestId) {
      await supabase.from('guests').delete().eq('id', createdGuestId);
    }
    console.error(
      '[staff-dashboard] Failed to assign guest to room:',
      roomUpdateError,
    );
    redirectToStatus(path, 'error');
  }

  revalidatePath('/admin');
  revalidatePath(path);
  revalidatePath(`/tv/${roomResult.data.room_number as string}`);
  redirectToStatus(path, 'saved');
}

export async function clearRoomGuestAction(roomId: string): Promise<void> {
  await requireStaffSession();

  const path = `/admin/rooms/${roomId}`;
  if (!UUID_PATTERN.test(roomId)) redirectToStatus('/admin', 'room-missing');

  const supabase = getSupabaseServer();
  const { data: room, error: roomError } = await supabase
    .from('rooms')
    .select('room_number, current_guest_id')
    .eq('id', roomId)
    .maybeSingle();

  if (roomError || !room) {
    console.error('[staff-dashboard] Failed to load room for clearing:', roomError);
    redirectToStatus('/admin', 'room-missing');
  }

  const { error: updateError } = await supabase
    .from('rooms')
    .update({
      current_guest_id: null,
      checkin_date: null,
      checkout_date: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', roomId)
    .select('id')
    .single();

  if (updateError) {
    console.error('[staff-dashboard] Failed to clear room guest:', updateError);
    redirectToStatus(path, 'error');
  }

  if (room.current_guest_id) {
    const { error: deleteError } = await supabase
      .from('guests')
      .delete()
      .eq('id', room.current_guest_id);

    if (deleteError) {
      console.error(
        '[staff-dashboard] Room was cleared but guest cleanup failed:',
        deleteError,
      );
    }
  }

  revalidatePath('/admin');
  revalidatePath(path);
  revalidatePath(`/tv/${room.room_number as string}`);
  redirectToStatus(path, 'cleared');
}

export async function saveHotelSettingsAction(
  formData: FormData,
): Promise<void> {
  await requireStaffSession();

  const path = '/admin/settings';
  const wifiSsid = readOptionalText(formData, 'wifi_ssid', 100);
  const wifiPassword = readOptionalText(formData, 'wifi_password', 200);
  const breakfastHours = readOptionalText(
    formData,
    'breakfast_hours',
    200,
  );
  const checkoutTime = readText(formData, 'checkout_time', 5);
  const receptionPhone = readOptionalText(
    formData,
    'reception_phone',
    60,
  );
  const receptionContactLabel = readOptionalText(
    formData,
    'reception_contact_label',
    120,
  );
  const receptionContactUrl = readOptionalText(
    formData,
    'reception_contact_url',
    2048,
  );
  const jellyfinUrl = readOptionalText(formData, 'jellyfin_url', 2048);

  if (
    wifiSsid === undefined ||
    wifiPassword === undefined ||
    breakfastHours === undefined ||
    !checkoutTime ||
    !TIME_PATTERN.test(checkoutTime) ||
    receptionPhone === undefined ||
    receptionContactLabel === undefined ||
    receptionContactUrl === undefined ||
    jellyfinUrl === undefined ||
    !isValidHttpUrl(receptionContactUrl) ||
    !isValidHttpUrl(jellyfinUrl)
  ) {
    redirectToStatus(path, 'invalid');
  }

  const { error } = await getSupabaseServer()
    .from('hotel_settings')
    .update({
      wifi_ssid: wifiSsid,
      wifi_password: wifiPassword,
      breakfast_hours: breakfastHours,
      checkout_time: checkoutTime,
      reception_phone: receptionPhone,
      reception_contact_label: receptionContactLabel,
      reception_contact_url: receptionContactUrl,
      jellyfin_url: jellyfinUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1)
    .select('id')
    .single();

  if (error) {
    console.error('[staff-dashboard] Failed to update hotel settings:', error);
    redirectToStatus(path, 'error');
  }

  revalidatePath(path);
  revalidateTvScreens();
  redirectToStatus(path, 'saved');
}

function readRecommendationForm(formData: FormData) {
  const name = readText(formData, 'name', 160);
  const description = readText(formData, 'description', 1000);
  const category = readOptionalText(formData, 'category', 80);
  const distanceLabel = readOptionalText(formData, 'distance_label', 100);
  const hoursLabel = readOptionalText(formData, 'hours_label', 160);
  const sortOrder = readSortOrder(formData);

  if (
    !name ||
    !description ||
    category === undefined ||
    distanceLabel === undefined ||
    hoursLabel === undefined ||
    sortOrder === null
  ) {
    return null;
  }

  return {
    name,
    description,
    category,
    distance_label: distanceLabel,
    hours_label: hoursLabel,
    sort_order: sortOrder,
    is_active: formData.get('is_active') === 'on',
  };
}

export async function createRecommendationAction(
  formData: FormData,
): Promise<void> {
  await requireStaffSession();

  const path = '/admin/recommendations';
  const recommendation = readRecommendationForm(formData);
  if (!recommendation) redirectToStatus(path, 'invalid');

  const { error } = await getSupabaseServer()
    .from('recommendations')
    .insert(recommendation);

  if (error) {
    console.error('[staff-dashboard] Failed to create recommendation:', error);
    redirectToStatus(path, error.code === '23505' ? 'duplicate' : 'error');
  }

  revalidatePath(path);
  revalidateTvScreens();
  redirectToStatus(path, 'created');
}

export async function updateRecommendationAction(
  recommendationId: string,
  formData: FormData,
): Promise<void> {
  await requireStaffSession();

  const path = '/admin/recommendations';
  const recommendation = readRecommendationForm(formData);
  if (!UUID_PATTERN.test(recommendationId) || !recommendation) {
    redirectToStatus(path, 'invalid');
  }

  const { error } = await getSupabaseServer()
    .from('recommendations')
    .update({
      ...recommendation,
      updated_at: new Date().toISOString(),
    })
    .eq('id', recommendationId)
    .select('id')
    .single();

  if (error) {
    console.error('[staff-dashboard] Failed to update recommendation:', error);
    redirectToStatus(path, error.code === '23505' ? 'duplicate' : 'error');
  }

  revalidatePath(path);
  revalidateTvScreens();
  redirectToStatus(path, 'updated');
}

export async function setRecommendationActiveAction(
  recommendationId: string,
  isActive: boolean,
): Promise<void> {
  await requireStaffSession();

  const path = '/admin/recommendations';
  if (!UUID_PATTERN.test(recommendationId) || typeof isActive !== 'boolean') {
    redirectToStatus(path, 'invalid');
  }

  const { error } = await getSupabaseServer()
    .from('recommendations')
    .update({
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', recommendationId)
    .select('id')
    .single();

  if (error) {
    console.error(
      '[staff-dashboard] Failed to change recommendation status:',
      error,
    );
    redirectToStatus(path, 'error');
  }

  revalidatePath(path);
  revalidateTvScreens();
  redirectToStatus(path, isActive ? 'activated' : 'deactivated');
}
