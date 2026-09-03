"use strict";

const { body } = require("express-validator");

const createEnquiryRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 120 }).withMessage("Name must be 2–120 characters"),

  body("phone")
    .trim()
    .notEmpty().withMessage("Phone is required")
    .matches(/^[0-9 +\-()]{10,20}$/).withMessage("Phone number looks invalid"),

  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail().withMessage("Email looks invalid")
    .normalizeEmail(),

  body("grade")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 60 }).withMessage("Grade is too long"),

  body("message")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 2000 }).withMessage("Message must be 2000 characters or fewer"),
];

module.exports = { createEnquiryRules };
