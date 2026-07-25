import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  clearRoomGuestAction,
  saveRoomGuestAction,
} from '@/app/admin/actions';
import { StatusBanner } from '@/components/admin/StatusBanner';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { getActiveLanguages, getAdminRoom } from '@/lib/admin/data';

const labelClass =
  'mb-2 block text-[13px] font-semibold text-slate-700';
const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100';

const statusMessages = {
  saved: 'Guest and stay details saved.',
  cleared: 'The guest was cleared and the room is now marked vacant.',
  invalid: 'Check the required fields and enter a valid checkout date.',
  'invalid-language': 'Choose an active language from the list.',
  error: 'The update could not be saved. Please try again.',
};

export default async function RoomEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const [{ roomId }, query] = await Promise.all([params, searchParams]);
  const [room, languages] = await Promise.all([
    getAdminRoom(roomId),
    getActiveLanguages(),
  ]);

  if (!room) notFound();

  const status =
    typeof query.status === 'string' ? query.status : query.status?.[0];
  const guest = room.guest;
  const currentLanguageIsActive = languages.some(
    (language) => language.code === guest?.preferred_language,
  );
  const saveAction = saveRoomGuestAction.bind(null, room.id);
  const clearAction = clearRoomGuestAction.bind(null, room.id);

  return (
    <>
      <Link
        href="/admin"
        className="text-[14px] font-semibold text-emerald-700 no-underline hover:text-emerald-900"
      >
        ← All rooms
      </Link>

      <div className="mb-7 mt-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
            {guest ? 'Occupied room' : 'Vacant room'}
          </p>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight">
            Room {room.room_number}
          </h1>
          <p className="mt-2 text-[15px] text-slate-600">
            {guest
              ? `Currently assigned to ${guest.first_name} ${guest.last_name}`
              : 'Add the arriving guest and their welcome details.'}
          </p>
        </div>
        <span
          className={`rounded-full px-4 py-2 text-[13px] font-bold ${
            guest
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-white text-slate-600 ring-1 ring-slate-200'
          }`}
        >
          {guest ? 'Occupied' : 'Vacant'}
        </span>
      </div>

      <StatusBanner status={status} messages={statusMessages} />

      <form action={saveAction} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-[20px] font-bold">Guest</h2>
            <p className="mt-1 text-[14px] text-slate-500">
              This name and message appear on the room TV.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first_name" className={labelClass}>
                First name
              </label>
              <input
                id="first_name"
                name="first_name"
                required
                maxLength={100}
                defaultValue={guest?.first_name ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="last_name" className={labelClass}>
                Last name
              </label>
              <input
                id="last_name"
                name="last_name"
                required
                maxLength={100}
                defaultValue={guest?.last_name ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="checkout_date" className={labelClass}>
                Checkout date
              </label>
              <input
                id="checkout_date"
                name="checkout_date"
                type="date"
                defaultValue={room.checkout_date ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="preferred_language" className={labelClass}>
                Preferred language
              </label>
              <select
                id="preferred_language"
                name="preferred_language"
                required
                defaultValue={
                  guest?.preferred_language ?? languages[0]?.code ?? ''
                }
                className={inputClass}
              >
                {!currentLanguageIsActive && guest?.preferred_language ? (
                  <option value={guest.preferred_language}>
                    {guest.preferred_language} (inactive)
                  </option>
                ) : null}
                {!languages.length ? (
                  <option value="">No active languages</option>
                ) : null}
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="welcome_message" className={labelClass}>
              Welcome message
            </label>
            <textarea
              id="welcome_message"
              name="welcome_message"
              rows={4}
              maxLength={1000}
              defaultValue={guest?.welcome_message ?? ''}
              placeholder="A short personal note for the guest…"
              className={inputClass}
            />
            <p className="mt-2 text-[12px] text-slate-500">
              Leave blank to use the TV screen&apos;s standard welcome.
            </p>
          </div>

          <div className="mt-5">
            <label htmlFor="special_occasion" className={labelClass}>
              Special occasion
            </label>
            <input
              id="special_occasion"
              name="special_occasion"
              maxLength={200}
              defaultValue={guest?.special_occasion ?? ''}
              placeholder="Anniversary, birthday, honeymoon…"
              className={inputClass}
            />
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4">
          {guest ? (
            <p className="max-w-xl text-[13px] leading-5 text-slate-500">
              After checkout, clear the room to remove this guest&apos;s personal
              details and mark the room vacant.
            </p>
          ) : (
            <p className="text-[13px] text-slate-500">
              Saving will mark this room occupied.
            </p>
          )}
          <SubmitButton pendingLabel={guest ? 'Saving…' : 'Assigning…'}>
            {guest ? 'Save guest details' : 'Assign guest'}
          </SubmitButton>
        </div>
      </form>

      {guest ? (
        <section className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-[18px] font-bold text-red-900">After checkout</h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-6 text-red-800">
            Clearing removes the guest&apos;s stored personal details and resets
            the stay dates. It does not change the room&apos;s housekeeping
            status.
          </p>
          <form action={clearAction} className="mt-5">
            <SubmitButton
              variant="danger"
              pendingLabel="Clearing…"
              confirmMessage={`Clear ${guest.first_name} ${guest.last_name} from room ${room.room_number}?`}
            >
              Clear guest
            </SubmitButton>
          </form>
        </section>
      ) : null}
    </>
  );
}
