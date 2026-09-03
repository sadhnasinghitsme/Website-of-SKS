"use strict";

const asyncHandler = require("../utils/asyncHandler");
const Enquiry = require("../models/Enquiry");

/**
 * POST /api/enquiry  (public)
 * Save an admission enquiry.
 */
const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, grade, message } = req.body;

  const enquiry = await Enquiry.create({
    name,
    phone,
    email: email || "",
    grade: grade || "",
    message: message || "",
  });

  res.status(201).json({
    success: true,
    message: "Enquiry received. Our admissions team will get in touch.",
    data: { id: enquiry._id, date: enquiry.date, status: enquiry.status },
  });
});

module.exports = { createEnquiry };
