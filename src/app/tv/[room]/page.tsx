import { getRoomTvData } from '@/lib/data/getRoomTvData';
import { formatCheckout } from '@/lib/format';
import { AutoRefresh } from '@/components/tv/AutoRefresh';
import { HeroBuildingArt } from '@/components/tv/HeroBuildingArt';
import { TimeReadout } from '@/components/tv/TimeReadout';
import { WelcomePanel } from '@/components/tv/WelcomePanel';
import { RecommendationsList } from '@/components/tv/RecommendationsList';
import { ActionDock } from '@/components/tv/ActionDock';

// Always render per-request so AutoRefresh picks up live weather and any
// Supabase Studio edits; never statically cache the guest screen.
export const dynamic = 'force-dynamic';

export default async function RoomTvPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = await params;
  const data = await getRoomTvData(room);
  const checkoutLabel = formatCheckout(data.room.checkout_date, data.room.checkout_time);

  return (
    <>
      <AutoRefresh />
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        {/* Fixed 16:9 "device screen" — matches the actual TV panel regardless
            of the outer window's own aspect ratio. */}
        <div className="relative grid h-[min(100vh,56.25vw)] w-[min(100vw,177.78vh)] grid-rows-[58fr_24fr_18fr] overflow-hidden bg-[color:var(--ground)]">
          {/* h-full is required at every level down from the grid row — a
              track's fr size only constrains a child that actually claims
              h-full; without it, panels fall back to their natural content
              height and can overflow past the screen's clipped edge. */}
          <div className="grid h-full min-h-0 grid-cols-[42fr_58fr]">
            <div className="relative h-full min-w-0 overflow-hidden">
              <HeroBuildingArt />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,12,12,0.92)_0%,rgba(6,12,12,0.35)_46%,rgba(6,12,12,0)_68%)]" />
              <TimeReadout weather={data.weather} />
            </div>
            <WelcomePanel
              guestFirstName={data.guest?.first_name ?? null}
              welcomeMessage={data.guest?.welcome_message ?? null}
              specialOccasion={data.guest?.special_occasion ?? null}
              roomNumber={data.room.room_number}
              checkoutLabel={checkoutLabel}
              hotelSettings={data.hotelSettings}
            />
          </div>

          <RecommendationsList recommendations={data.recommendations} />

          <ActionDock
            hotelSettings={data.hotelSettings}
            wifiQrDataUrl={data.wifiQrDataUrl}
            receptionQrDataUrl={data.receptionQrDataUrl}
          />
        </div>
      </div>
    </>
  );
}
