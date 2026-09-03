"use strict";

const express = require("express");
const { listNews, getNewsById, createNews } = require("../controllers/newsController");
const {
  listNewsRules,
  newsIdRule,
  createNewsRules,
} = require("../validators/news.validator");
const validate = require("../middleware/validate");
const { requireApiKey } = require("../middleware/auth");
const { adminPostLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// GET /api/news            (public, paginated)
router.get("/", listNewsRules, validate, listNews);

// GET /api/news/:id        (public)
router.get("/:id", newsIdRule, validate, getNewsById);

// POST /api/news           (admin — x-api-key)
router.post("/", requireApiKey, adminPostLimiter, createNewsRules, validate, createNews);

module.exports = router;
