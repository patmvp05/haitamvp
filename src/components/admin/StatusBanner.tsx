interface StatusBannerProps {
  status: string | undefined;
  messages: Record<string, string>;
}

const errorStatuses = new Set([
  'error',
  'invalid',
  'invalid-language',
  'duplicate',
  'room-missing',
]);

export function StatusBanner({ status, messages }: StatusBannerProps) {
  if (!status || !messages[status]) return null;

  const isError = errorStatuses.has(status);

  return (
    <p
      role="status"
      className={`mb-6 rounded-xl border px-4 py-3 text-[14px] ${
        isError
          ? 'border-red-200 bg-red-50 text-red-800'
          : 'border-emerald-200 bg-emerald-50 text-emerald-900'
      }`}
    >
      {messages[status]}
    </p>
  );
}
