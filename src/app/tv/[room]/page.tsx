import { getRoomTvData } from '@/lib/data/getRoomTvData';
import { formatCheckout } from '@/lib/format';
import { AutoRefresh } from '@/components/tv/AutoRefresh';
import { GreetingClock } from '@/components/tv/GreetingClock';
import { WeatherWidget } from '@/components/tv/WeatherWidget';
import { HotelInfoCard } from '@/components/tv/HotelInfoCard';
import { RecommendationsList } from '@/components/tv/RecommendationsList';
import { ReceptionContactCard } from '@/components/tv/ReceptionContactCard';
import { MovieButton } from '@/components/tv/MovieButton';

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
      <main className="grid h-screen w-screen grid-rows-[auto_1fr_auto] gap-6 overflow-hidden p-10">
        <GreetingClock
          guestFirstName={data.guest?.first_name ?? null}
          welcomeMessage={data.guest?.welcome_message ?? null}
          specialOccasion={data.guest?.special_occasion ?? null}
          roomNumber={data.room.room_number}
          checkoutLabel={checkoutLabel}
        />

        <section className="grid min-h-0 grid-cols-3 gap-6">
          <div className="flex min-h-0 flex-col gap-6">
            <WeatherWidget weather={data.weather} />
            <HotelInfoCard
              hotelSettings={data.hotelSettings}
              wifiQrDataUrl={data.wifiQrDataUrl}
            />
          </div>
          <div className="col-span-2 min-h-0">
            <RecommendationsList recommendations={data.recommendations} />
          </div>
        </section>

        <footer className="grid grid-cols-2 gap-6">
          <ReceptionContactCard
            hotelSettings={data.hotelSettings}
            receptionQrDataUrl={data.receptionQrDataUrl}
          />
          <MovieButton jellyfinUrl={data.hotelSettings.jellyfin_url} />
        </footer>
      </main>
    </>
  );
}
