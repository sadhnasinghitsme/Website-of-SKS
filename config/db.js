"use strict";

const mongoose = require("mongoose");
const env = require("./env");

mongoose.set("strictQuery", true);

/**
 * Connect to MongoDB. Retries are left to the caller / process manager —
 * on a hard failure we exit so the problem is visible instead of the API
 * silently serving 500s.
 */
async function connectDB(uri = env.MONGODB_URI) {
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    // eslint-disable-next-line no-console
    console.log(`[db] MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[db] MongoDB connection error: ${err.message}`);
    throw err;
  }
}

async function disconnectDB() {
  await mongoose.connection.close();
}

module.exports = { connectDB, disconnectDB, mongoose };
