// @ts-check

const { withSentryConfig } = require("@sentry/nextjs");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  swcMinify: true,
};

/**
 * @type {Partial<import('@sentry/nextjs').SentryWebpackPluginOptions>}
 * https://github.com/getsentry/sentry-webpack-plugin#options.
 */
const sentryWebpackPluginOptions = {
  silent: true,
  dryRun: process.env.VERCEL_ENV !== "production",
};

// @ts-ignore
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
