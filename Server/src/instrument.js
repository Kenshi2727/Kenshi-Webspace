import * as Sentry from "@sentry/node"
import dotenv from "dotenv"

dotenv.config()

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: import.meta.env.MODE || "development",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});