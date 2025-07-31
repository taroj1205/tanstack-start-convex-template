import { convexAdapter } from "@convex-dev/better-auth";
import { convex, crossDomain } from "@convex-dev/better-auth/plugins";
import { betterAuthComponent } from "@repo/convex/auth";
import type { GenericCtx } from "@repo/convex/server";
import { betterAuth } from "better-auth";

// You'll want to replace this with an environment variable
const siteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

export const createAuth = (ctx: GenericCtx) =>
  // Configure your Better Auth instance here
  betterAuth({
    trustedOrigins: [siteUrl],
    database: convexAdapter(ctx, betterAuthComponent),

    // Simple non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Convex plugin is required
      convex(),

      // The cross domain plugin is required for client side frameworks
      crossDomain({
        siteUrl,
      }),
    ],
  });
