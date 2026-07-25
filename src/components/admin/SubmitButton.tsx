'use client';

import type { MouseEvent, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

const variantClasses = {
  primary: 'bg-slate-950 text-white hover:bg-emerald-800',
  secondary:
    'border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50',
  danger: 'bg-red-700 text-white hover:bg-red-800',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
};

interface SubmitButtonProps {
  children: ReactNode;
  pendingLabel?: string;
  variant?: keyof typeof variantClasses;
  confirmMessage?: string;
  className?: string;
}

export function SubmitButton({
  children,
  pendingLabel = 'Saving…',
  variant = 'primary',
  confirmMessage,
  className = '',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (confirmMessage && !window.confirm(confirmMessage)) {
      event.preventDefault();
    }
  }

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={handleClick}
      className={`rounded-xl px-4 py-2.5 text-[14px] font-semibold transition disabled:cursor-wait disabled:opacity-60 ${variantClasses[variant]} ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
