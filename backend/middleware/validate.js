"use strict";

const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

/**
 * Runs after a chain of express-validator rules. If any failed, responds 422
 * with a compact list of field errors; otherwise continues.
 */
function validate(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array({ onlyFirstError: true }).map((e) => ({
    field: e.path,
    message: e.msg,
  }));

  return next(new ApiError(422, "Validation failed", errors));
}

module.exports = validate;
