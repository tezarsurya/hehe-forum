export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GH_CLIENT_ID: string;
      GH_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      SANITY_TOKEN: string;
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_SANITY_TOKEN: string;
      NEXT_PUBLIC_SANITY_PROJECT_ID: string;
      NEXT_PUBLIC_SANITY_DATASET: string;
      NEXT_PUBLIC_SANITY_API_VERSION: string;
    }
  }
}
