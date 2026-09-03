"use strict";

const env = require("../config/env");
const ApiError = require("../utils/ApiError");

/**
 * Central error handler. Normalises Mongoose / body-parser / rate-limit / custom
 * errors into a consistent JSON envelope and hides internals in production.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let details = err.details;

  // Mongoose: bad ObjectId / cast failure
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Mongoose: schema validation
  if (err.name === "ValidationError" && err.errors) {
    statusCode = 400;
    message = "Validation failed";
    details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Mongo: duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value for ${field}`;
  }

  // body-parser: malformed JSON
  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Malformed JSON in request body";
  }

  const isServerError = statusCode >= 500;
  if (isServerError) {
    // eslint-disable-next-line no-console
    console.error(`[error] ${req.method} ${req.originalUrl}`, err);
  }

  const body = {
    success: false,
    message: isServerError && env.isProd ? "Internal server error" : message,
  };
  if (details) body.errors = details;
  if (!env.isProd && isServerError && !(err instanceof ApiError)) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
}

module.exports = errorHandler;
