"use strict";

/**
 * Seed content for the NewsEvent and Achievement collections.
 *
 * Source of truth is content/news.json at the repo root (transcribed from
 * sksworldschoolnoida.ac.in/our-events and /achievements). The same file is
 * imported by the Next.js frontend (lib/newsFallback.ts) as its offline
 * fallback, so the seeded DB and the static fallback never drift apart.
 *
 * `date` values are ISO strings; ambiguous "Month YYYY" labels are pinned to
 * the 1st. If the shared file can't be found (e.g. backend deployed on its own),
 * we fall back to an empty set and the seeder simply inserts nothing.
 */

const path = require("path");

let shared = { news: [], achievements: [] };
try {
  // backend/scripts -> repo root /content/news.json
  shared = require(path.join(__dirname, "..", "..", "content", "news.json"));
} catch (err) {
  console.warn(
    "[seed-data] content/news.json not found — seeding an empty data set.",
    err.message
  );
}

const news = (shared.news || []).map((n) => ({
  date: n.date,
  category: n.category || "General",
  title: n.title,
  description: n.description,
  images: n.images || [],
}));

const achievements = (shared.achievements || []).map((a) => ({
  title: a.title,
  year: a.year || "",
  date: a.date || null,
  description: a.description,
  images: a.images || [],
}));

module.exports = { news, achievements };
