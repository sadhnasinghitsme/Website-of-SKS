"use strict";

/**
 * Seed the NewsEvent and Achievement collections.
 *
 *   npm run seed          # insert seed docs only if the collection is empty
 *   npm run seed:fresh    # wipe both collections first, then insert
 *
 * Enquiry / ContactMessage are never touched (real user submissions).
 */

const mongoose = require("mongoose");
const env = require("../config/env");
const { connectDB, disconnectDB } = require("../config/db");
const NewsEvent = require("../models/NewsEvent");
const Achievement = require("../models/Achievement");
const { news, achievements } = require("./seed-data");

const FRESH = process.argv.includes("--fresh");

async function seedCollection(Model, docs, label) {
  const existing = await Model.countDocuments();

  if (FRESH) {
    await Model.deleteMany({});
    console.log(`[seed] ${label}: cleared ${existing} existing doc(s)`);
  } else if (existing > 0) {
    console.log(`[seed] ${label}: ${existing} doc(s) already present — skipping (use --fresh to replace)`);
    return;
  }

  const created = await Model.insertMany(docs, { ordered: true });
  console.log(`[seed] ${label}: inserted ${created.length} doc(s)`);
}

async function run() {
  console.log(`[seed] connecting to ${env.MONGODB_URI}`);
  await connectDB();

  try {
    await seedCollection(
      NewsEvent,
      news.map((n) => ({
        title: n.title,
        description: n.description,
        category: n.category || "General",
        date: new Date(n.date),
        images: n.images || [],
      })),
      "NewsEvent"
    );

    await seedCollection(
      Achievement,
      achievements.map((a) => ({
        title: a.title,
        description: a.description,
        year: a.year || "",
        date: a.date ? new Date(a.date) : null,
        images: a.images || [],
      })),
      "Achievement"
    );

    console.log("[seed] done.");
  } finally {
    await disconnectDB();
    await mongoose.disconnect().catch(() => {});
  }
}

run().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
