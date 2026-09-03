"use strict";

const crypto = require("crypto");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

/** Constant-time compare so we don't leak key length / prefix via timing. */
function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Admin guard for write routes. The client must send the shared secret in the
 * `x-api-key` header (or `Authorization: Bearer <key>`).
 */
function requireApiKey(req, _res, next) {
  const headerKey =
    req.get("x-api-key") ||
    (req.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();

  if (!headerKey) {
    return next(ApiError.unauthorized("Missing API key (x-api-key header)"));
  }
  if (!safeEqual(headerKey, env.ADMIN_API_KEY)) {
    return next(ApiError.forbidden("Invalid API key"));
  }
  return next();
}

module.exports = { requireApiKey };
