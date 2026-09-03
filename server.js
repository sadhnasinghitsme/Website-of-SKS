"use strict";

const env = require("./config/env");
const createApp = require("./app");
const { connectDB, disconnectDB } = require("./config/db");

async function start() {
  try {
    await connectDB();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[server] Could not connect to MongoDB — is it running? Exiting.");
    process.exit(1);
  }

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] SKS API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = (signal) => async () => {
    // eslint-disable-next-line no-console
    console.log(`\n[server] ${signal} received — shutting down...`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    // force-exit if it hangs
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on("SIGINT", shutdown("SIGINT"));
  process.on("SIGTERM", shutdown("SIGTERM"));

  process.on("unhandledRejection", (reason) => {
    // eslint-disable-next-line no-console
    console.error("[server] Unhandled rejection:", reason);
  });
}

start();
