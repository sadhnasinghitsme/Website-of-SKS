/**
 * Subtle, non-alarming banner shown when a page is rendering its built-in
 * static content because the live backend feed was unreachable. The page is
 * still fully usable, so this is an aside — not the full-width DataError card.
 */
export function DataNotice({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="mb-8 flex items-start gap-3 rounded-2xl border border-flame/25 bg-flame-50 px-4 py-3 text-sm text-ink/75"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-flame-700"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
      <p>{message}</p>
    </div>
  );
}
