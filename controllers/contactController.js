"use strict";

const asyncHandler = require("../utils/asyncHandler");
const ContactMessage = require("../models/ContactMessage");

/**
 * POST /api/contact  (public)
 * Save a contact-form message.
 */
const createContactMessage = asyncHandler(async (req, res) => {
  const { name, email, mobile, message } = req.body;

  const doc = await ContactMessage.create({ name, email, mobile, message });

  res.status(201).json({
    success: true,
    message: "Message received. We'll get back to you soon.",
    data: { id: doc._id, date: doc.date },
  });
});

module.exports = { createContactMessage };
