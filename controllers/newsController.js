"use strict";

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const NewsEvent = require("../models/NewsEvent");
const { getPagination, buildMeta } = require("../utils/paginate");

/**
 * GET /api/news  (public, paginated)
 * Query: ?page=1&limit=10&category=Workshop
 */
const listNews = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  const filter = {};
  if (req.query.category) filter.category = req.query.category;

  const [items, total] = await Promise.all([
    NewsEvent.find(filter).sort({ date: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    NewsEvent.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: buildMeta({ page, limit, total }),
  });
});

/**
 * GET /api/news/:id  (public)
 */
const getNewsById = asyncHandler(async (req, res) => {
  const item = await NewsEvent.findById(req.params.id).lean();
  if (!item) throw ApiError.notFound("News item not found");

  res.json({ success: true, data: item });
});

/**
 * POST /api/news  (admin)
 */
const createNews = asyncHandler(async (req, res) => {
  const { title, description, images, date, category } = req.body;

  const item = await NewsEvent.create({
    title,
    description,
    images: Array.isArray(images) ? images : [],
    ...(date ? { date } : {}),
    ...(category ? { category } : {}),
  });

  res.status(201).json({ success: true, data: item });
});

module.exports = { listNews, getNewsById, createNews };
