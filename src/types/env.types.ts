type AppEnvType = "production" | "preview" | "development";

export const environment =
  (process.env.NEXT_PUBLIC_VERCEL_ENV as AppEnvType) || "development";

console.log(environment, process.env.NEXT_PUBLIC_VERCEL_ENV, "ENVIRONMENT");

export const isProduction = environment === "production";
