"use strict";

/**
 * End-to-end smoke test against a real MongoDB instance.
 *
 *   npm run smoke
 *
 * Uses a throwaway database (…_smoke) which is dropped afterwards. Requires a
 * reachable MongoDB (local mongod or Atlas). Override the target with
 * SMOKE_MONGODB_URI, otherwise it derives one from MONGODB_URI / the default.
 */

// --- Force a test config BEFORE anything reads process.env ---
const baseUri =
  process.env.SMOKE_MONGODB_URI ||
  (process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sks_school").replace(
    /\/[^/?]+(\?|$)/,
    "/sks_school_smoke$1"
  );

process.env.NODE_ENV = "test";
process.env.MONGODB_URI = baseUri;
process.env.ADMIN_API_KEY = "smoke-test-key";
process.env.PORT = "0";

const assert = require("node:assert/strict");
const { connectDB, disconnectDB, mongoose } = require("../config/db");
const createApp = require("../app");

let passed = 0;
let failed = 0;

async function test(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${name}\n    ${err.message}`);
  }
}

async function main() {
  console.log(`[smoke] db: ${baseUri}`);
  await connectDB();
  // clean slate
  await mongoose.connection.dropDatabase();

  const app = createApp();
  const server = app.listen(0);
  await new Promise((r) => server.once("listening", r));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;
  const api = (p, opts) => fetch(base + p, opts).then(async (r) => ({ status: r.status, body: await r.json().catch(() => ({})) }));

  console.log("\n[smoke] running...");

  await test("GET /health -> 200", async () => {
    const r = await api("/health");
    assert.equal(r.status, 200);
    assert.equal(r.body.status, "ok");
  });

  await test("GET /api -> 200 with endpoint map", async () => {
    const r = await api("/api");
    assert.equal(r.status, 200);
    assert.ok(r.body.endpoints["POST /api/enquiry"]);
  });

  await test("POST /api/enquiry (valid) -> 201", async () => {
    const r = await api("/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Test Parent", phone: "9876543210", email: "t@example.com", grade: "Class I", message: "Hello" }),
    });
    assert.equal(r.status, 201);
    assert.equal(r.body.success, true);
    assert.equal(r.body.data.status, "new");
  });

  await test("POST /api/enquiry (missing name) -> 422", async () => {
    const r = await api("/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ phone: "9876543210" }),
    });
    assert.equal(r.status, 422);
    assert.equal(r.body.success, false);
    assert.ok(Array.isArray(r.body.errors));
  });

  await test("POST /api/enquiry (NoSQL operator in phone) -> 422 not crash", async () => {
    const r = await api("/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Injector", phone: { $ne: null } }),
    });
    // mongo-sanitize strips `$ne`; validator then rejects the empty/short phone
    assert.equal(r.status, 422);
  });

  await test("POST /api/contact (valid) -> 201", async () => {
    const r = await api("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "c@example.com", mobile: "9876543210", message: "Question about admissions" }),
    });
    assert.equal(r.status, 201);
    assert.equal(r.body.success, true);
  });

  await test("POST /api/contact (missing message) -> 422", async () => {
    const r = await api("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Test", email: "c@example.com", mobile: "9876543210" }),
    });
    assert.equal(r.status, 422);
  });

  // seed two news + one achievement directly for the GET tests
  const NewsEvent = require("../models/NewsEvent");
  const Achievement = require("../models/Achievement");
  const n1 = await NewsEvent.create({ title: "Older event", description: "desc", category: "Event", date: new Date("2024-01-01") });
  const n2 = await NewsEvent.create({ title: "Newer event", description: "desc", category: "Workshop", date: new Date("2025-01-01") });
  await Achievement.create({ title: "An award", description: "desc", year: "2025" });

  await test("GET /api/news -> 200, newest first, pagination meta", async () => {
    const r = await api("/api/news?page=1&limit=1");
    assert.equal(r.status, 200);
    assert.equal(r.body.data.length, 1);
    assert.equal(r.body.data[0].title, "Newer event");
    assert.equal(r.body.pagination.total, 2);
    assert.equal(r.body.pagination.totalPages, 2);
    assert.equal(r.body.pagination.hasNextPage, true);
  });

  await test("GET /api/news?category=Workshop -> filtered", async () => {
    const r = await api("/api/news?category=Workshop");
    assert.equal(r.status, 200);
    assert.equal(r.body.data.length, 1);
    assert.equal(r.body.data[0].category, "Workshop");
  });

  await test("GET /api/news/:id (valid) -> 200", async () => {
    const r = await api(`/api/news/${n1._id}`);
    assert.equal(r.status, 200);
    assert.equal(r.body.data.title, "Older event");
  });

  await test("GET /api/news/:id (bad id) -> 422", async () => {
    const r = await api("/api/news/not-an-id");
    assert.equal(r.status, 422);
  });

  await test("GET /api/news/:id (well-formed but missing) -> 404", async () => {
    const r = await api("/api/news/507f1f77bcf86cd799439011");
    assert.equal(r.status, 404);
  });

  await test("GET /api/achievements -> 200 paginated", async () => {
    const r = await api("/api/achievements");
    assert.equal(r.status, 200);
    assert.equal(r.body.pagination.total, 1);
  });

  await test("POST /api/news (no api key) -> 401", async () => {
    const r = await api("/api/news", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Nope", description: "no key" }),
    });
    assert.equal(r.status, 401);
  });

  await test("POST /api/news (wrong api key) -> 403", async () => {
    const r = await api("/api/news", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "wrong" },
      body: JSON.stringify({ title: "Nope", description: "bad key" }),
    });
    assert.equal(r.status, 403);
  });

  await test("POST /api/news (valid api key) -> 201", async () => {
    const r = await api("/api/news", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "smoke-test-key" },
      body: JSON.stringify({ title: "Created via API", description: "hello world", category: "Announcement" }),
    });
    assert.equal(r.status, 201);
    assert.equal(r.body.data.category, "Announcement");
  });

  await test("POST /api/news (valid key, invalid body) -> 422", async () => {
    const r = await api("/api/news", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "smoke-test-key" },
      body: JSON.stringify({ title: "x" }),
    });
    assert.equal(r.status, 422);
  });

  await test("POST /api/achievements (valid api key) -> 201", async () => {
    const r = await api("/api/achievements", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": "smoke-test-key" },
      body: JSON.stringify({ title: "New achievement", description: "we won something", year: "2026" }),
    });
    assert.equal(r.status, 201);
  });

  await test("unknown route -> 404 json", async () => {
    const r = await api("/api/does-not-exist");
    assert.equal(r.status, 404);
    assert.equal(r.body.success, false);
  });

  await test("malformed JSON body -> 400", async () => {
    const r = await api("/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{ not json",
    });
    assert.equal(r.status, 400);
  });

  // teardown
  await mongoose.connection.dropDatabase();
  await new Promise((r) => server.close(r));
  await disconnectDB();

  console.log(`\n[smoke] ${passed} passed, ${failed} failed`);
  process.exit(failed === 0 ? 0 : 1);
}

main().catch(async (err) => {
  console.error("[smoke] fatal:", err);
  try {
    await disconnectDB();
  } catch (_) {
    /* ignore */
  }
  process.exit(1);
});
