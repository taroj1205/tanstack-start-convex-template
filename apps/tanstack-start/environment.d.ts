declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_CONVEX_URL: string;
      VITE_CONVEX_SITE_URL: string;
    }
  }
}

export {};
