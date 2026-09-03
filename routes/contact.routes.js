"use strict";

const express = require("express");
const { createContactMessage } = require("../controllers/contactController");
const { createContactRules } = require("../validators/contact.validator");
const validate = require("../middleware/validate");
const { publicPostLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// POST /api/contact  (public)
router.post("/", publicPostLimiter, createContactRules, validate, createContactMessage);

module.exports = router;
