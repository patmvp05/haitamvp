'use client';

export function AdminSystemsUnavailable({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500" />
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-amber-700">
          Connection error
        </p>
      </div>

      <h1 className="mt-3 text-[26px] font-bold tracking-tight text-slate-950">
        Can&apos;t reach hotel systems right now
      </h1>

      <p className="mt-3 max-w-xl text-[15px] leading-6 text-slate-600">
        We couldn&apos;t connect to the database to load this dashboard. Please
        check your internet connection or verify the hotel database status, then try again.
      </p>

      <div className="mt-6">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-slate-950 px-5 py-3 text-[14px] font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-100"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
