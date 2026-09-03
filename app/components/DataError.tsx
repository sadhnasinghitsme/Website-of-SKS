import { content, telHref } from "@/lib/content";

/**
 * Friendly fallback shown when a server-side data fetch to the backend fails
 * (backend down, network error, CORS). Keeps the page usable instead of blank.
 */
export function DataError({ message }: { message: string }) {
  const phone = content.contact.phones[0];

  return (
    <div className="mx-auto max-w-xl rounded-3xl border-2 border-berry/30 bg-berry-50 p-8 text-center">
      <span
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-berry text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      </span>
      <h2 className="mt-4 font-display text-lg font-bold text-brick sm:text-xl">
        This section couldn&rsquo;t load
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/75">{message}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <a href={telHref(phone)} className="btn-primary">
          Call {phone}
        </a>
        <a href="/contact" className="btn-ghost">
          Contact us
        </a>
      </div>
    </div>
  );
}
