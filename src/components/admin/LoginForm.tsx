'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/admin/actions';
import type { LoginState } from '@/lib/admin/types';

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="staff-password"
          className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-600"
        >
          Staff password
        </label>
        <input
          id="staff-password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[16px] text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-slate-950 px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? 'Signing in…' : 'Open staff dashboard'}
      </button>
    </form>
  );
}
