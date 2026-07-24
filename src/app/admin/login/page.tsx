import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/admin/LoginForm';
import { hasValidStaffSession } from '@/lib/admin/auth';

export default async function StaffLoginPage() {
  if (await hasValidStaffSession()) redirect('/admin');

  return (
    <main className="flex min-h-full items-center justify-center px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-700 text-[18px] font-bold text-white"
          >
            H
          </span>
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Haita
            </p>
            <h1 className="text-[25px] font-bold tracking-tight">
              Staff dashboard
            </h1>
          </div>
        </div>

        <p className="mt-6 text-[15px] leading-6 text-slate-600">
          Sign in with the shared staff password to manage rooms, guest
          welcomes, hotel details, and recommendations.
        </p>

        <LoginForm />
      </section>
    </main>
  );
}
