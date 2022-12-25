import sanityClient from "@sanity/client";

export const sanity = sanityClient({
  projectId: "em8nd69q",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_PULBIC_SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});
