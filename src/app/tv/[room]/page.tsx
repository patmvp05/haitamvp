import { getRoomTvData } from '@/lib/data/getRoomTvData';
import { AutoRefresh } from '@/components/tv/AutoRefresh';
import { TvExperience } from '@/components/tv/TvExperience';

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

  return (
    <>
      <AutoRefresh />
      <TvExperience data={data} />
    </>
  );
}
