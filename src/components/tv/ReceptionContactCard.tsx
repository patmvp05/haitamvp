import { FocusableCard } from './FocusableCard';
import { QrImage } from './QrImage';
import type { HotelSettingsRecord } from '@/lib/data/types';

interface ReceptionContactCardProps {
  hotelSettings: HotelSettingsRecord;
  receptionQrDataUrl: string | null;
}

export function ReceptionContactCard({
  hotelSettings,
  receptionQrDataUrl,
}: ReceptionContactCardProps) {
  const url = hotelSettings.reception_contact_url;

  return (
    <div className="flex items-center gap-6 rounded-2xl bg-neutral-900 p-6">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold">Contact Reception</h2>
        {hotelSettings.reception_phone && (
          <p className="mt-2 text-xl text-neutral-300">{hotelSettings.reception_phone}</p>
        )}
        {url && (
          <FocusableCard href={url} external className="mt-4 w-fit text-xl">
            {hotelSettings.reception_contact_label ?? 'Message Reception'}
          </FocusableCard>
        )}
      </div>

      {receptionQrDataUrl && (
        <div className="shrink-0 text-center">
          <QrImage dataUrl={receptionQrDataUrl} alt="Scan to contact reception" size={120} />
          <p className="mt-1 text-sm text-neutral-400">Scan to chat</p>
        </div>
      )}
    </div>
  );
}
