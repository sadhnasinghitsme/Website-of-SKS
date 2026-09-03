import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { DataError } from "../components/DataError";
import { content } from "@/lib/content";
import { api, ApiError, type NewsItem } from "@/lib/api";

export const metadata: Metadata = {
  title: `News & Events — ${content.school.name}, Noida`,
  description:
    "Assemblies, workshops, competitions, trips and celebrations at SKS World School, Sector 137, Noida.",
  alternates: { canonical: "/news" },
};

// Fetch fresh from the backend on every request (news changes when the admin
// posts, and this keeps the build decoupled from the backend being reachable).
export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsEventsPage() {
  let items: NewsItem[] | null = null;
  let error: string | null = null;

  try {
    const res = await api.getNews({ limit: 50 });
    items = res.data;
  } catch (err) {
    error =
      err instanceof ApiError
        ? err.message
        : "An unexpected error occurred while loading news & events.";
  }

  return (
    <PageShell
      eyebrow="News & Events"
      title="News & Events"
      intro="Assemblies, workshops, competitions, trips and celebrations through the school year at SKS World School, Sector 137."
    >
      {error && <DataError message={error} />}

      {items && items.length === 0 && (
        <p className="text-sm text-ink/60">
          No news or events have been published yet. Please check back soon.
        </p>
      )}

      {items && items.length > 0 && (
        <ol className="relative space-y-8 border-l-2 border-ink/10 pl-6 sm:pl-8">
          {items.map((e) => (
            <li key={e._id} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[1.7rem] top-1.5 h-3 w-3 rounded-full border-2 border-flame bg-paper sm:-left-[2.2rem]"
              />
              <article className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-card sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-flame-700">
                  {formatDate(e.date)}
                </p>
                <h2 className="mt-1.5 font-display text-lg font-bold text-brick-700 sm:text-xl">
                  {e.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">
                  {e.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-10 text-xs text-ink/45">
        Events as reported on the school&rsquo;s website
        (sksworldschoolnoida.ac.in/our-events). Dates and details are accurate to
        that page.
      </p>
    </PageShell>
  );
}
