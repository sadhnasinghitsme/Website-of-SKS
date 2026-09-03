"use strict";

const express = require("express");
const {
  listAchievements,
  getAchievementById,
  createAchievement,
} = require("../controllers/achievementController");
const {
  listAchievementRules,
  achievementIdRule,
  createAchievementRules,
} = require("../validators/achievement.validator");
const validate = require("../middleware/validate");
const { requireApiKey } = require("../middleware/auth");
const { adminPostLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// GET /api/achievements        (public, paginated)
router.get("/", listAchievementRules, validate, listAchievements);

// GET /api/achievements/:id    (public)
router.get("/:id", achievementIdRule, validate, getAchievementById);

// POST /api/achievements       (admin — x-api-key)
router.post(
  "/",
  requireApiKey,
  adminPostLimiter,
  createAchievementRules,
  validate,
  createAchievement
);

module.exports = router;
