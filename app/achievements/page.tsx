import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { DataError } from "../components/DataError";
import { content } from "@/lib/content";
import { api, ApiError, type AchievementItem } from "@/lib/api";

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
  let items: AchievementItem[] | null = null;
  let error: string | null = null;

  try {
    const res = await api.getAchievements({ limit: 50 });
    items = res.data;
  } catch (err) {
    error =
      err instanceof ApiError
        ? err.message
        : "An unexpected error occurred while loading achievements.";
  }

  return (
    <PageShell
      eyebrow="Achievements"
      title="Achievements"
      intro="Together we shine, together we rise — recognition earned by SKS World School, Sector 137, Noida."
    >
      {error && <DataError message={error} />}

      {items && items.length === 0 && (
        <p className="text-sm text-ink/60">
          No achievements have been published yet. Please check back soon.
        </p>
      )}

      {items && items.length > 0 && (
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
