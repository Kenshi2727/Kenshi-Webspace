import * as Sentry from "@sentry/node"

Sentry.init({
    dsn: "https://10bb190c98c3480754ab8042d96edfa1@o4510391099654144.ingest.de.sentry.io/4510391299670096",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});