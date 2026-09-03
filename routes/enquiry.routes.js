"use strict";

const express = require("express");
const { createEnquiry } = require("../controllers/enquiryController");
const { createEnquiryRules } = require("../validators/enquiry.validator");
const validate = require("../middleware/validate");
const { publicPostLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// POST /api/enquiry  (public)
router.post("/", publicPostLimiter, createEnquiryRules, validate, createEnquiry);

module.exports = router;
