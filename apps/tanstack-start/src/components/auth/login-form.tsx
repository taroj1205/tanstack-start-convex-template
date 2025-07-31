import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  Heading,
  Input,
  PasswordInput,
  Text,
  useNotice,
} from "@yamada-ui/react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Link } from "../ui";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const notice = useNotice();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (result.error) {
          setError(result.error.message || "An error occurred");
          notice({
            title: "Error",
            description: result.error.message || "An error occurred",
            status: "error",
          });
        } else {
          setError(null);
          navigate({ to: "/" });
        }
      } catch {
        setError("An unexpected error occurred");
        notice({
          title: "Error",
          description: "An unexpected error occurred",
          status: "error",
        });
      }
    },
  });

  return (
    <Card
      as="form"
      colorScheme={["whiteAlpha", "blackAlpha"]}
      maxW="2xl"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      size="lg"
      variant="solid"
      w="full"
    >
      <CardHeader>
        <Heading as="h2" size="lg">
          Welcome back!
        </Heading>
      </CardHeader>
      <CardBody gap="md">
        {form.state.submissionAttempts > 0 &&
          form.state.canSubmit === false &&
          error && <Text color={["danger.500", "danger.400"]}>{error}</Text>}

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "Email is required";
              }
              if (!value.includes("@")) {
                return "Please enter a valid email";
              }
            },
          }}
        >
          {(field) => (
            <FormControl
              errorMessage={field.state.meta.errors}
              invalid={field.state.meta.errors.length > 0}
              label="Email"
            >
              <Input
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your email"
                type="email"
                value={field.state.value}
              />
            </FormControl>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "Password is required";
              }
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
            },
          }}
        >
          {(field) => (
            <FormControl
              errorMessage={field.state.meta.errors}
              invalid={field.state.meta.errors.length > 0}
              label="Password"
            >
              <PasswordInput
                autoComplete="current-password"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your password"
                value={field.state.value}
              />
            </FormControl>
          )}
        </form.Field>
      </CardBody>

      <CardFooter flexDirection="column" gap="md">
        <Button
          colorScheme="blue"
          loading={form.state.isSubmitting}
          loadingText="Signing in..."
          type="submit"
          width="full"
        >
          Sign In
        </Button>
        <Text color="muted" fontSize="sm" textAlign="center" w="full">
          Don't have an account?{" "}
          <Link size="sm" to="/auth/signup">
            Sign up
          </Link>
        </Text>
      </CardFooter>
    </Card>
  );
};
