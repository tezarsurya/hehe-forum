import { createClient } from "next-sanity";

const env = process.env.NODE_ENV;

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env === "development" ? "dev" : "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: true,
};

export const sanityClient = createClient(config);
