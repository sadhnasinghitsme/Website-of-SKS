"use strict";

const rateLimit = require("express-rate-limit");
const env = require("../config/env");

const jsonMessage = (message) => ({ success: false, message });

/** Generous limiter applied to every request as a backstop. */
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage("Too many requests, please try again later."),
});

/** Strict limiter for public write endpoints (enquiry / contact form spam). */
const publicPostLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_POST,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage(
    "Too many submissions from this IP. Please wait a while and try again."
  ),
});

/** Limiter for admin write endpoints (still cheap to brute-force-guard). */
const adminPostLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: jsonMessage("Too many requests."),
});

module.exports = { globalLimiter, publicPostLimiter, adminPostLimiter };
