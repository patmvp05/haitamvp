import Link from 'next/link';
import { logoutAction } from '@/app/admin/actions';
import { SubmitButton } from '@/components/admin/SubmitButton';
import { requireStaffSession } from '@/lib/admin/auth';

export default async function StaffAreaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireStaffSession();

  return (
    <div className="min-h-full">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-7 gap-y-3 px-5 py-4">
          <Link
            href="/admin"
            className="mr-auto flex items-center gap-3 text-slate-950 no-underline"
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-700 text-[17px] font-bold text-white"
            >
              H
            </span>
            <span>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
                Haita
              </span>
              <span className="block text-[18px] font-bold leading-5">
                Staff dashboard
              </span>
            </span>
          </Link>

          <nav
            aria-label="Staff dashboard"
            className="flex flex-wrap items-center gap-1"
          >
            <Link
              href="/admin"
              className="rounded-xl px-3 py-2 text-[14px] font-semibold text-slate-600 no-underline transition hover:bg-slate-100 hover:text-slate-950"
            >
              Rooms
            </Link>
            <Link
              href="/admin/settings"
              className="rounded-xl px-3 py-2 text-[14px] font-semibold text-slate-600 no-underline transition hover:bg-slate-100 hover:text-slate-950"
            >
              Hotel settings
            </Link>
            <Link
              href="/admin/recommendations"
              className="rounded-xl px-3 py-2 text-[14px] font-semibold text-slate-600 no-underline transition hover:bg-slate-100 hover:text-slate-950"
            >
              Recommendations
            </Link>
          </nav>

          <form action={logoutAction}>
            <SubmitButton
              variant="ghost"
              pendingLabel="Signing out…"
              className="whitespace-nowrap"
            >
              Sign out
            </SubmitButton>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
