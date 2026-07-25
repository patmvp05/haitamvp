import { saveHotelSettingsAction } from '@/app/admin/actions';
import { StatusBanner } from '@/components/admin/StatusBanner';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { getAdminHotelSettings } from '@/lib/admin/data';

const labelClass =
  'mb-2 block text-[13px] font-semibold text-slate-700';
const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100';

const statusMessages = {
  saved: 'Hotel settings saved. Room screens will use the updated details.',
  invalid: 'Check the required time and make sure both URLs are valid.',
  error: 'The settings could not be saved. Please try again.',
};

export default async function HotelSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const [settings, query] = await Promise.all([
    getAdminHotelSettings(),
    searchParams,
  ]);
  const status =
    typeof query.status === 'string' ? query.status : query.status?.[0];

  return (
    <>
      <div className="mb-7">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
          Guest information
        </p>
        <h1 className="mt-1 text-[30px] font-bold tracking-tight">
          Hotel settings
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-slate-600">
          These shared details appear across every occupied room&apos;s TV
          screen.
        </p>
      </div>

      <StatusBanner status={status} messages={statusMessages} />

      <form action={saveHotelSettingsAction} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-[20px] font-bold">Wi-Fi and stay details</h2>
            <p className="mt-1 text-[14px] text-slate-500">
              Used in the information cards and Wi-Fi QR code.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="wifi_ssid" className={labelClass}>
                Wi-Fi network name
              </label>
              <input
                id="wifi_ssid"
                name="wifi_ssid"
                maxLength={100}
                defaultValue={settings.wifi_ssid ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="wifi_password" className={labelClass}>
                Wi-Fi password
              </label>
              <input
                id="wifi_password"
                name="wifi_password"
                maxLength={200}
                defaultValue={settings.wifi_password ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="breakfast_hours" className={labelClass}>
                Breakfast hours
              </label>
              <input
                id="breakfast_hours"
                name="breakfast_hours"
                maxLength={200}
                defaultValue={settings.breakfast_hours ?? ''}
                placeholder="6:30 AM – 9:30 AM"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="checkout_time" className={labelClass}>
                Checkout time
              </label>
              <input
                id="checkout_time"
                name="checkout_time"
                type="time"
                required
                defaultValue={settings.checkout_time?.slice(0, 5) ?? '11:00'}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-[20px] font-bold">Reception</h2>
            <p className="mt-1 text-[14px] text-slate-500">
              Phone and chat details shown when guests contact the front desk.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="reception_phone" className={labelClass}>
                Reception phone
              </label>
              <input
                id="reception_phone"
                name="reception_phone"
                type="tel"
                maxLength={60}
                defaultValue={settings.reception_phone ?? ''}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="reception_contact_label" className={labelClass}>
                Contact button label
              </label>
              <input
                id="reception_contact_label"
                name="reception_contact_label"
                maxLength={120}
                defaultValue={settings.reception_contact_label ?? ''}
                placeholder="Chat with Reception on Zalo"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="reception_contact_url" className={labelClass}>
              Reception contact URL
            </label>
            <input
              id="reception_contact_url"
              name="reception_contact_url"
              type="url"
              maxLength={2048}
              defaultValue={settings.reception_contact_url ?? ''}
              placeholder="https://zalo.me/…"
              className={inputClass}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-[20px] font-bold">Entertainment</h2>
          <p className="mt-1 text-[14px] text-slate-500">
            Destination for the Watch Movies button.
          </p>
          <div className="mt-5">
            <label htmlFor="jellyfin_url" className={labelClass}>
              Jellyfin URL
            </label>
            <input
              id="jellyfin_url"
              name="jellyfin_url"
              type="url"
              maxLength={2048}
              defaultValue={settings.jellyfin_url ?? ''}
              placeholder="https://movies.example.com"
              className={inputClass}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <SubmitButton>Save hotel settings</SubmitButton>
        </div>
      </form>
    </>
  );
}
