"use strict";

const path = require("path");
const dotenv = require("dotenv");

// Load .env from the backend root regardless of where the process is started.
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function required(name) {
  const value = process.env[name];
  if (!value || !String(value).trim()) {
    // eslint-disable-next-line no-console
    console.error(`\n[config] Missing required environment variable: ${name}`);
    console.error("[config] Copy .env.example to .env and fill it in.\n");
    process.exit(1);
  }
  return String(value).trim();
}

function optionalInt(name, fallback) {
  const raw = process.env[name];
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

const NODE_ENV = process.env.NODE_ENV || "development";

const env = {
  NODE_ENV,
  isProd: NODE_ENV === "production",
  isTest: NODE_ENV === "test",
  PORT: optionalInt("PORT", 5000),

  MONGODB_URI: required("MONGODB_URI"),

  // Comma-separated -> array of trimmed origins
  CORS_ORIGIN: (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),

  ADMIN_API_KEY: required("ADMIN_API_KEY"),

  RATE_LIMIT_WINDOW_MS: optionalInt("RATE_LIMIT_WINDOW_MINUTES", 15) * 60 * 1000,
  RATE_LIMIT_MAX_POST: optionalInt("RATE_LIMIT_MAX_POST", 10),
};

module.exports = env;
