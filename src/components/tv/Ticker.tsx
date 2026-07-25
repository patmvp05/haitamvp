/**
 * Ambient service notes. The full-width TV dock gives them room to remain
 * still, avoiding ornamental motion on an otherwise calm screen.
 */
export function Ticker({ items }: { items: string[] }) {
  return (
    <div className="flex min-w-0 items-center overflow-hidden text-[clamp(0.7rem,0.9vw,0.82rem)] text-[color:var(--ink-dim)]">
      {items.map((item) => (
        <span
          key={item}
          className="min-w-0 truncate border-l border-[color:var(--hairline)] px-[clamp(0.7rem,1.4vw,1.2rem)] first:border-l-0 first:pl-0"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
