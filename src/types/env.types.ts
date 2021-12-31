type AppEnvType = "production" | "preview" | "development";

export const environment =
  (process.env.NEXT_PUBLIC_VERCEL_ENV as AppEnvType) || "development";

console.log(environment, "ENVIRONMENT");

export const isProduction = environment === "production";
