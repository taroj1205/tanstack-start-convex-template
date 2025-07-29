declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_CONVEX_URL: string;
    }
  }
}

export {};
