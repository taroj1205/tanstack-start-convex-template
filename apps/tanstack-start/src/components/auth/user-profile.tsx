import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Text,
  VStack,
} from "@yamada-ui/react";
import { authClient } from "@/lib/auth-client";

export const UserProfile = () => {
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      window.location.reload();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <Card maxW="md" w="full">
      <CardHeader>
        <HStack gap={4}>
          <Avatar
            name="User"
            size="lg"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          />
          <VStack align="start" gap={1}>
            <Text fontSize="lg" fontWeight="semibold">
              John Doe
            </Text>
            <Text color="muted" fontSize="sm">
              john.doe@example.com
            </Text>
            <Badge colorScheme="green" size="sm">
              Active
            </Badge>
          </VStack>
        </HStack>
      </CardHeader>
      <Divider />
      <CardBody>
        <VStack gap={4}>
          <VStack align="start" gap={2} w="full">
            <Text fontWeight="medium">Account Information</Text>
            <Text color="muted" fontSize="sm">
              Member since January 2024
            </Text>
          </VStack>

          <HStack gap={2} w="full">
            <Button flex={1} variant="outline">
              Edit Profile
            </Button>
            <Button
              colorScheme="red"
              flex={1}
              onClick={handleSignOut}
              variant="outline"
            >
              Sign Out
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
