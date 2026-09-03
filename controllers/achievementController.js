"use strict";

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const Achievement = require("../models/Achievement");
const { getPagination, buildMeta } = require("../utils/paginate");

/**
 * GET /api/achievements  (public, paginated)
 * Query: ?page=1&limit=10
 */
const listAchievements = asyncHandler(async (req, res) => {
  const { page, limit, skip } = getPagination(req.query);

  // Newest recognition first: `year` label desc ("2025" > "2024-25" > "2018-21"),
  // then most-recently added.
  const [items, total] = await Promise.all([
    Achievement.find({})
      .sort({ year: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Achievement.countDocuments({}),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: buildMeta({ page, limit, total }),
  });
});

/**
 * GET /api/achievements/:id  (public) — handy companion to the list route
 */
const getAchievementById = asyncHandler(async (req, res) => {
  const item = await Achievement.findById(req.params.id).lean();
  if (!item) throw ApiError.notFound("Achievement not found");

  res.json({ success: true, data: item });
});

/**
 * POST /api/achievements  (admin)
 */
const createAchievement = asyncHandler(async (req, res) => {
  const { title, description, images, year, date } = req.body;

  const item = await Achievement.create({
    title,
    description,
    images: Array.isArray(images) ? images : [],
    year: year || "",
    ...(date ? { date } : {}),
  });

  res.status(201).json({ success: true, data: item });
});

module.exports = { listAchievements, getAchievementById, createAchievement };
