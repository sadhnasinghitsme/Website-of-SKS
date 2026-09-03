"use strict";

const { Schema, model } = require("mongoose");

const NEWS_CATEGORIES = [
  "Event",
  "Workshop",
  "Celebration",
  "Competition",
  "Trip",
  "Assembly",
  "Programme",
  "Announcement",
  "General",
];

const newsEventSchema = new Schema(
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
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    category: {
      type: String,
      enum: { values: NEWS_CATEGORIES, message: "Invalid category" },
      default: "General",
      index: true,
    },
  },
  { timestamps: true }
);

newsEventSchema.index({ date: -1 });

const NewsEvent = model("NewsEvent", newsEventSchema);
NewsEvent.CATEGORIES = NEWS_CATEGORIES;

module.exports = NewsEvent;
