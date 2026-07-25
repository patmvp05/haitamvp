'use client';

import { ActionDock } from './ActionDock';
import { HeroBuildingArt } from './HeroBuildingArt';
import { RecommendationsList } from './RecommendationsList';
import { TimeReadout } from './TimeReadout';
import { TvDpadNavigation } from './TvDpadNavigation';
import { TvLanguageProvider } from './TvLanguageProvider';
import { WelcomePanel } from './WelcomePanel';
import type { RoomTvData } from '@/lib/data/types';

export function TvExperience({ data }: { data: RoomTvData }) {
  return (
    <TvLanguageProvider initialLanguage={data.guest?.preferred_language}>
      <TvDpadNavigation />
      <div className="flex h-screen w-screen items-center justify-center bg-[color:var(--ground)]">
        <div
          data-tv-screen
          className="relative grid h-[min(100vh,56.25vw)] w-[min(100vw,177.78vh)] grid-rows-[62fr_24fr_14fr] overflow-hidden bg-[color:var(--ground)]"
        >
          <div className="grid h-full min-h-0 grid-cols-[33fr_67fr]">
            <div className="relative h-full min-w-0 overflow-hidden">
              <HeroBuildingArt />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(14,9,16,0.94)_0%,rgba(14,9,16,0.38)_44%,rgba(14,9,16,0.04)_72%)]" />
              <TimeReadout weather={data.weather} />
            </div>
            <WelcomePanel
              guestFirstName={data.guest?.first_name ?? null}
              welcomeMessage={data.guest?.welcome_message ?? null}
              specialOccasion={data.guest?.special_occasion ?? null}
              roomNumber={data.room.room_number}
              checkoutDate={data.room.checkout_date}
              checkoutTime={data.room.checkout_time}
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
    </TvLanguageProvider>
  );
}
