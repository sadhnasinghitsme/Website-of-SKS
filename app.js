"use strict";

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const mongoSanitize = require("./middleware/mongoSanitize");

const env = require("./config/env");
const apiRoutes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const { globalLimiter } = require("./middleware/rateLimiter");

function createApp() {
  const app = express();

  // Behind a proxy (Render/Nginx/etc.) trust the first hop so rate-limit &
  // logging see the real client IP. Off in local dev.
  app.set("trust proxy", env.isProd ? 1 : false);
  app.disable("x-powered-by");

  // Flat query strings only (no nested `qs` objects) — a first line of defence
  // against `?field[$ne]=` style operator injection in query params.
  app.set("query parser", "simple");

  // --- Security headers ---
  app.use(helmet());

  // --- CORS (allow-list from env) ---
  app.use(
    cors({
      origin(origin, callback) {
        // allow same-origin / curl / mobile apps (no Origin header)
        if (!origin) return callback(null, true);
        if (env.CORS_ORIGIN.includes(origin)) return callback(null, true);
        return callback(new Error(`CORS: origin not allowed (${origin})`));
      },
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "x-api-key", "Authorization"],
      credentials: false,
      maxAge: 86400,
    })
  );

  // --- Body parsing ---
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ extended: false, limit: "100kb" }));

  // --- NoSQL injection protection: strip `$` / `.` keys from body/query/params ---
  app.use(
    mongoSanitize({
      onStrip: ({ req, where, key }) => {
        // eslint-disable-next-line no-console
        console.warn(
          `[sanitize] stripped key "${key}" from ${where} on ${req.method} ${req.originalUrl}`
        );
      },
    })
  );

  // --- Misc ---
  app.use(compression());
  if (!env.isTest) {
    app.use(morgan(env.isProd ? "combined" : "dev"));
  }

  // --- Backstop rate limiter for every request ---
  app.use(globalLimiter);

  // --- Health check ---
  app.get("/health", (_req, res) => {
    res.json({ success: true, status: "ok", uptime: process.uptime() });
  });

  // --- API ---
  app.use("/api", apiRoutes);

  // --- 404 + error handling (must be last) ---
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;
