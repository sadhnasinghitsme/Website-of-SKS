"use strict";

const express = require("express");

const enquiryRoutes = require("./enquiry.routes");
const contactRoutes = require("./contact.routes");
const newsRoutes = require("./news.routes");
const achievementRoutes = require("./achievement.routes");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    name: "SKS World School API",
    version: 1,
    endpoints: {
      "POST /api/enquiry": "public — submit an admission enquiry",
      "POST /api/contact": "public — submit a contact message",
      "GET /api/news": "public — list news & events (paginated)",
      "GET /api/news/:id": "public — one news item",
      "POST /api/news": "admin (x-api-key) — create a news item",
      "GET /api/achievements": "public — list achievements (paginated)",
      "GET /api/achievements/:id": "public — one achievement",
      "POST /api/achievements": "admin (x-api-key) — create an achievement",
    },
  });
});

router.use("/enquiry", enquiryRoutes);
router.use("/contact", contactRoutes);
router.use("/news", newsRoutes);
router.use("/achievements", achievementRoutes);

module.exports = router;
