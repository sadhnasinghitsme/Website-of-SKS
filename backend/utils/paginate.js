"use strict";

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

/** Parse ?page & ?limit query params into safe numbers. */
function getPagination(query) {
  let page = Number.parseInt(query.page, 10);
  let limit = Number.parseInt(query.limit, 10);

  if (!Number.isFinite(page) || page < 1) page = 1;
  if (!Number.isFinite(limit) || limit < 1) limit = DEFAULT_LIMIT;
  if (limit > MAX_LIMIT) limit = MAX_LIMIT;

  return { page, limit, skip: (page - 1) * limit };
}

/** Build a standard pagination envelope. */
function buildMeta({ page, limit, total }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  return {
    page,
    limit,
    total,
    totalPages,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
  };
}

module.exports = { getPagination, buildMeta, DEFAULT_LIMIT, MAX_LIMIT };
