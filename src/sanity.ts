import { createClient } from "next-sanity";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: false,
};

export const sanityClient = createClient(config);
