"use strict";

const { body } = require("express-validator");

const createContactRules = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2, max: 120 }).withMessage("Name must be 2–120 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email looks invalid")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .notEmpty().withMessage("Mobile number is required")
    .matches(/^[0-9 +\-()]{10,20}$/).withMessage("Mobile number looks invalid"),

  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ min: 2, max: 4000 }).withMessage("Message must be 2–4000 characters"),
];

module.exports = { createContactRules };
