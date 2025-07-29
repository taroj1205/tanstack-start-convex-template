import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Container, Text, VStack } from "@yamada-ui/react";
import { api } from "backend/convex/_generated/api";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const healthCheck = useSuspenseQuery(convexQuery(api.healthCheck.get, {}));

  return (
    <VStack>
      <Container>
        <Text>
          {(() => {
            if (healthCheck.isLoading) {
              return "Checking...";
            }

            if (healthCheck.data === "OK") {
              return "Connected";
            }

            return "Error";
          })()}
        </Text>
      </Container>
    </VStack>
  );
}
