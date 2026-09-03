"use strict";

/**
 * NoSQL-injection guard.
 *
 * Recursively removes any object key that starts with `$` or contains a `.`
 * from the request body, query and route params. These are the characters
 * MongoDB uses for operators / dotted paths, so stripping them stops payloads
 * like `{"email": {"$ne": null}}` or `{"user.role": "admin"}` from ever
 * reaching Mongoose.
 *
 * Works on Express 5 (where `req.query` is a read-only getter) because it
 * mutates the existing objects in place instead of reassigning them. The app
 * also uses the "simple" query parser, so query values are always plain strings
 * — operator objects can only ever appear in the JSON body, which is scrubbed
 * here before any controller runs.
 */

const FORBIDDEN_KEY = /^\$|\./;

function scrub(value, onStrip, pathPrefix = "") {
  if (Array.isArray(value)) {
    value.forEach((item, i) => scrub(item, onStrip, `${pathPrefix}[${i}]`));
    return;
  }
  if (value === null || typeof value !== "object") return;

  for (const key of Object.keys(value)) {
    if (FORBIDDEN_KEY.test(key)) {
      delete value[key];
      if (onStrip) onStrip(pathPrefix ? `${pathPrefix}.${key}` : key);
      continue;
    }
    scrub(value[key], onStrip, pathPrefix ? `${pathPrefix}.${key}` : key);
  }
}

function mongoSanitize(options = {}) {
  const { onStrip } = options;
  return function mongoSanitizeMiddleware(req, _res, next) {
    const report = (where) => (k) => {
      if (onStrip) onStrip({ req, where, key: k });
    };
    if (req.body) scrub(req.body, report("body"));
    if (req.params) scrub(req.params, report("params"));
    if (req.query) scrub(req.query, report("query")); // mutate in place
    next();
  };
}

module.exports = mongoSanitize;
