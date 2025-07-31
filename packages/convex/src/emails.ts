import { Resend } from "@convex-dev/resend";
import { v } from "convex/values";
import { components } from "./_generated/api";
import { internalMutation } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {
  testMode: true, // Set to false for production
});

export const sendWelcomeEmail = internalMutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await resend.sendEmail(ctx, {
      from: "noreply@yourdomain.com",
      to: args.email,
      subject: "Welcome to our app!",
      html: `
        <h1>Welcome ${args.name || "there"}!</h1>
        <p>Thank you for signing up to our app.</p>
        <p>We're excited to have you on board!</p>
      `,
    });
  },
});

export const sendPasswordResetEmail = internalMutation({
  args: {
    email: v.string(),
    resetToken: v.string(),
  },
  handler: async (ctx, args) => {
    const resetUrl = `${process.env.CONVEX_SITE_URL}/reset-password?token=${args.resetToken}`;

    await resend.sendEmail(ctx, {
      from: "noreply@yourdomain.com",
      to: args.email,
      subject: "Reset your password",
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
  },
});
