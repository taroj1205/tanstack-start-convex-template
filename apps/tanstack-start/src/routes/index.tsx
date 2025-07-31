import { createFileRoute } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  DiscList,
  Grid,
  GridItem,
  Heading,
  HStack,
  ListItem,
  Text,
  VStack,
} from "@yamada-ui/react";
import { Link } from "@/components/ui";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <VStack gap={8} justify="center" maxW="4xl" minH="100vh" mx="auto" p={8}>
      <VStack gap={4} textAlign="center">
        <Heading size="2xl">Welcome to Better Auth + Convex</Heading>
        <Text color="muted" fontSize="lg" maxW="2xl">
          A complete authentication solution with Convex backend, Resend email
          service, and TanStack Start frontend. Built with modern tools and best
          practices.
        </Text>
      </VStack>

      <Grid
        gap={6}
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        w="full"
      >
        <GridItem>
          <Card h="full">
            <CardHeader>
              <VStack align="start" gap={2}>
                <Heading size="md">Authentication</Heading>
                <Text color="muted" fontSize="sm">
                  Sign in or create a new account to get started
                </Text>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack gap={4}>
                <Text color="muted" fontSize="sm">
                  Features:
                </Text>
                <DiscList>
                  <ListItem>Email/Password authentication</ListItem>
                  <ListItem>Secure session management</ListItem>
                  <ListItem>Password reset functionality</ListItem>
                  <ListItem>Email verification (optional)</ListItem>
                </DiscList>
                <Button
                  as={Link}
                  colorScheme="primary"
                  to="/auth/signin"
                  width="full"
                >
                  Get Started
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card h="full">
            <CardHeader>
              <VStack align="start" gap={2}>
                <Heading size="md">Dashboard</Heading>
                <Text color="muted" fontSize="sm">
                  Access your personalized dashboard with protected routes
                </Text>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack gap={4}>
                <Text color="muted" fontSize="sm">
                  Features:
                </Text>
                <DiscList>
                  <ListItem>Protected route system</ListItem>
                  <ListItem>User profile management</ListItem>
                  <ListItem>Real-time data with Convex</ListItem>
                  <ListItem>Responsive design</ListItem>
                </DiscList>
                <Button
                  as={Link}
                  to="/dashboard"
                  variant="outline"
                  width="full"
                >
                  View Dashboard
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <HStack color="muted" fontSize="sm" gap={4}>
        <Text>Built with:</Text>
        <HStack gap={2}>
          <Badge colorScheme="blue">Convex</Badge>
          <Badge colorScheme="green">Better Auth</Badge>
          <Badge colorScheme="purple">TanStack Start</Badge>
          <Badge colorScheme="orange">Resend</Badge>
        </HStack>
      </HStack>
    </VStack>
  );
}
