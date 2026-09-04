import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { DataError } from "../components/DataError";
import { DataNotice } from "../components/DataNotice";
import { content } from "@/lib/content";
import { api, ApiError, type AchievementItem } from "@/lib/api";
import { FALLBACK_ACHIEVEMENTS } from "@/lib/newsFallback";

export const metadata: Metadata = {
  title: `Achievements — ${content.school.name}, Noida`,
  description:
    "Awards and recognition earned by SKS World School, Noida — the British Council International School Award, AISSE board results and national education honours.",
  alternates: { canonical: "/achievements" },
};

// Fetch fresh from the backend on every request (achievements change when the
// admin posts, and this keeps the build decoupled from the backend).
export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  let items: AchievementItem[] = [];
  let usingFallback = false;
  let error: string | null = null;

  try {
    const res = await api.getAchievements({ limit: 50 });
    items = res.data ?? [];
    if (items.length === 0) {
      items = FALLBACK_ACHIEVEMENTS;
      usingFallback = true;
    }
  } catch (err) {
    // Backend unreachable or errored: fall back to the built-in list.
    items = FALLBACK_ACHIEVEMENTS;
    usingFallback = true;
    if (!(err instanceof ApiError)) {
      error = "An unexpected error occurred while loading the live achievements feed.";
    }
  }

  return (
    <PageShell
      eyebrow="Achievements"
      title="Achievements"
      intro="Together we shine, together we rise — recognition earned by SKS World School, Sector 137, Noida."
    >
      {usingFallback && items.length > 0 && (
        <DataNotice message="Showing accolades on record. The live feed is temporarily unavailable — please check back later for the latest additions." />
      )}

      {items.length === 0 && error && <DataError message={error} />}

      {items.length === 0 && !error && (
        <p className="text-sm text-ink/60">
          No achievements have been published yet. Please check back soon.
        </p>
      )}

      {items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((a) => (
            <article
              key={a._id}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-7"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-brick-700 text-flame"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
                  <path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
                </svg>
              </span>

              {a.year && (
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-flame-700">
                  {a.year}
                </p>
              )}
              <h2 className="mt-1.5 font-display text-lg font-bold text-brick-700 sm:text-xl">
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                {a.description}
              </p>
            </article>
          ))}
        </div>
      )}

      <p className="mt-10 text-xs text-ink/45">
        Accolades as listed on the school&rsquo;s website
        (sksworldschoolnoida.ac.in/achievements).
      </p>
    </PageShell>
  );
}
