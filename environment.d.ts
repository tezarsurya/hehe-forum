export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GH_CLIENT_ID: string;
      GH_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
    }
  }
}
