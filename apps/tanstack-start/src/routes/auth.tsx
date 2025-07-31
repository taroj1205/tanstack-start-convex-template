import { createFileRoute, Outlet } from "@tanstack/react-router";
import { VStack } from "@yamada-ui/react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  return (
    <VStack alignItems="center" as="main" justifyContent="center">
      <Outlet />
    </VStack>
  );
}
