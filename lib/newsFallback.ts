/**
 * Static fallback for the News & Events and Achievements pages.
 *
 * Source of truth is content/news.json (transcribed from
 * sksworldschoolnoida.ac.in/our-events and /achievements). When the backend
 * REST API is unreachable — server down, network error, CORS — the pages render
 * this instead of a hard error card, so the sections always show real content.
 *
 * Shapes match the backend responses (`NewsItem` / `AchievementItem` in
 * lib/api.ts) so the page components don't need a separate code path.
 */

import data from "@/content/news.json";
import type { NewsItem, AchievementItem } from "./api";

interface RawNews {
  id: string;
  date: string;
  category: string;
  title: string;
  description: string;
}

interface RawAchievement {
  id: string;
  title: string;
  year: string;
  date: string | null;
  description: string;
}

/** News & events, newest first — same ordering the backend uses (`date` desc). */
export const FALLBACK_NEWS: NewsItem[] = (data.news as RawNews[])
  .map((n) => ({
    _id: n.id,
    title: n.title,
    description: n.description,
    images: [] as string[],
    date: n.date,
    category: n.category,
  }))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const FALLBACK_ACHIEVEMENTS: AchievementItem[] = (
  data.achievements as RawAchievement[]
).map((a) => ({
  _id: a.id,
  title: a.title,
  description: a.description,
  images: [] as string[],
  year: a.year || undefined,
  date: a.date,
}));
