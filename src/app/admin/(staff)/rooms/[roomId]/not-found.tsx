import Link from 'next/link';

export default function RoomNotFound() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
        Room not found
      </p>
      <h1 className="mt-2 text-[26px] font-bold">This room does not exist</h1>
      <p className="mt-3 text-[14px] text-slate-600">
        It may have been removed, or the link may be out of date.
      </p>
      <Link
        href="/admin"
        className="mt-6 inline-block rounded-xl bg-slate-950 px-5 py-3 text-[14px] font-semibold text-white no-underline hover:bg-emerald-800"
      >
        Back to rooms
      </Link>
    </section>
  );
}
