"use strict";

const { Schema, model } = require("mongoose");

const ENQUIRY_STATUSES = ["new", "contacted", "closed"];

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      // 10–12 digits, spaces allowed in input (stored as given, trimmed)
      match: [/^[0-9 +\-()]{10,20}$/, "Phone number looks invalid"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email looks invalid"],
    },
    grade: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ENQUIRY_STATUSES,
        message: "Invalid status",
      },
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

const Enquiry = model("Enquiry", enquirySchema);
Enquiry.STATUSES = ENQUIRY_STATUSES;

module.exports = Enquiry;
