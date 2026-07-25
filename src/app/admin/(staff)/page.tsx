import Link from 'next/link';
import { StatusBanner } from '@/components/admin/StatusBanner';
import { getAdminRooms } from '@/lib/admin/data';

const statusMessages = {
  'room-missing': 'That room could not be found.',
};

function formatDate(value: string | null): string {
  if (!value) return 'Not set';

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`));
}

export default async function RoomsDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const [rooms, query] = await Promise.all([getAdminRooms(), searchParams]);
  const status =
    typeof query.status === 'string' ? query.status : query.status?.[0];
  const occupiedCount = rooms.filter((room) => room.guest !== null).length;

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
            Front desk
          </p>
          <h1 className="mt-1 text-[30px] font-bold tracking-tight">Rooms</h1>
          <p className="mt-2 text-[15px] text-slate-600">
            {occupiedCount} occupied · {rooms.length - occupiedCount} vacant
          </p>
        </div>
        <p className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          {rooms.length} rooms total
        </p>
      </div>

      <StatusBanner status={status} messages={statusMessages} />

      {rooms.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => {
            const occupied = room.guest !== null;
            const guestName = room.guest
              ? `${room.guest.first_name} ${room.guest.last_name}`
              : 'Ready for next guest';

            return (
              <Link
                key={room.id}
                href={`/admin/rooms/${room.id}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 text-slate-950 no-underline shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Room
                    </p>
                    <h2 className="mt-1 text-[28px] font-bold">
                      {room.room_number}
                    </h2>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[12px] font-bold ${
                      occupied
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {occupied ? 'Occupied' : 'Vacant'}
                  </span>
                </div>

                <div className="mt-7">
                  <p className="truncate text-[16px] font-semibold">
                    {guestName}
                  </p>
                  <p className="mt-1 text-[13px] text-slate-500">
                    {occupied
                      ? `Checkout ${formatDate(room.checkout_date)}`
                      : 'No guest assigned'}
                  </p>
                </div>

                <p className="mt-5 text-[13px] font-semibold text-emerald-700">
                  {occupied ? 'Edit stay' : 'Assign guest'}{' '}
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-[20px] font-bold">No rooms found</h2>
          <p className="mt-2 text-[14px] text-slate-600">
            Apply the Supabase schema and seed data, then refresh this page.
          </p>
        </div>
      )}
    </>
  );
}
