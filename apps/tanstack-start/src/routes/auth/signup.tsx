import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "@/components/auth/signup-form";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignupForm />;
}
