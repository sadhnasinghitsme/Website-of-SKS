"use strict";

const { body, param, query } = require("express-validator");

const listAchievementRules = [
  query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer"),
  query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("limit must be 1–50"),
];

const achievementIdRule = [
  param("id").isMongoId().withMessage("Invalid achievement id"),
];

const createAchievementRules = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3, max: 200 }).withMessage("Title must be 3–200 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 3, max: 8000 }).withMessage("Description must be 3–8000 characters"),

  body("images")
    .optional()
    .isArray({ max: 20 }).withMessage("images must be an array (max 20)"),
  body("images.*")
    .optional()
    .isString().withMessage("each image must be a string")
    .isLength({ max: 500 }).withMessage("image URL too long"),

  body("year")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 20 }).withMessage("year label too long"),

  body("date")
    .optional({ values: "falsy" })
    .isISO8601().withMessage("date must be an ISO-8601 date")
    .toDate(),
];

module.exports = { listAchievementRules, achievementIdRule, createAchievementRules };
