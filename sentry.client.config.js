// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://3fad960693fa445682e5a9087e1ccd11@o885468.ingest.sentry.io/5837674",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
});
