"use strict";

const { Schema, model } = require("mongoose");

const contactMessageSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email looks invalid"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^[0-9 +\-()]{10,20}$/, "Mobile number looks invalid"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: 2,
      maxlength: 4000,
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = model("ContactMessage", contactMessageSchema);
