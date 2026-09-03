"use strict";

const { Schema, model } = require("mongoose");

const achievementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 3,
      maxlength: 8000,
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.every((s) => typeof s === "string" && s.length <= 500),
        message: "Each image must be a string URL up to 500 chars",
      },
    },
    // Free-form label as it appears on certificates ("2024-25", "2018-21", "2025").
    year: {
      type: String,
      trim: true,
      maxlength: 20,
      default: "",
      index: true,
    },
    // Optional precise date when known.
    date: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

achievementSchema.index({ createdAt: -1 });

module.exports = model("Achievement", achievementSchema);
