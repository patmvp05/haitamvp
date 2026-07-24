import { QrImage } from './QrImage';
import { formatClockTime } from '@/lib/format';
import type { HotelSettingsRecord } from '@/lib/data/types';

interface HotelInfoCardProps {
  hotelSettings: HotelSettingsRecord;
  wifiQrDataUrl: string | null;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-base uppercase tracking-wide text-neutral-400">{label}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
}

export function HotelInfoCard({ hotelSettings, wifiQrDataUrl }: HotelInfoCardProps) {
  const checkout = formatClockTime(hotelSettings.checkout_time);

  return (
    <div className="flex-1 rounded-2xl bg-neutral-900 p-6">
      <h2 className="mb-4 text-2xl font-bold">Hotel Information</h2>
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-3">
          {hotelSettings.wifi_ssid && (
            <div>
              <p className="text-base uppercase tracking-wide text-neutral-400">Wi-Fi</p>
              <p className="text-lg font-semibold">{hotelSettings.wifi_ssid}</p>
              {hotelSettings.wifi_password && (
                <p className="text-lg text-neutral-300">
                  Password: {hotelSettings.wifi_password}
                </p>
              )}
            </div>
          )}
          {hotelSettings.breakfast_hours && (
            <InfoRow label="Breakfast" value={hotelSettings.breakfast_hours} />
          )}
          {checkout && <InfoRow label="Checkout Time" value={checkout} />}
          {hotelSettings.reception_phone && (
            <InfoRow label="Reception" value={hotelSettings.reception_phone} />
          )}
        </div>

        {wifiQrDataUrl && (
          <div className="shrink-0 text-center">
            <QrImage dataUrl={wifiQrDataUrl} alt="Scan to join the Wi-Fi network" size={130} />
            <p className="mt-1 text-sm text-neutral-400">Scan to join Wi-Fi</p>
          </div>
        )}
      </div>
    </div>
  );
}
