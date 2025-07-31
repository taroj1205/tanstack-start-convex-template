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
import { Link } from "@/components/ui";
import { authClient } from "@/lib/auth-client";

export const SignupForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const notice = useNotice();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        if (value.password !== value.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const result = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
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
          Create your account
        </Heading>
      </CardHeader>
      <CardBody gap="md">
        {form.state.submissionAttempts > 0 &&
          form.state.canSubmit === false &&
          error && <Text color={["danger.500", "danger.400"]}>{error}</Text>}

        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "Name is required";
              }
              if (value.length < 2) {
                return "Name must be at least 2 characters";
              }
            },
          }}
        >
          {(field) => (
            <FormControl
              errorMessage={field.state.meta.errors}
              invalid={field.state.meta.errors.length > 0}
              label="Full Name"
            >
              <Input
                autoComplete="name"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your full name"
                type="text"
                value={field.state.value}
              />
            </FormControl>
          )}
        </form.Field>

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
                autoComplete="email"
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
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (value.length > 128) {
                return "Password must be less than 128 characters";
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
                autoComplete="new-password"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your password"
                value={field.state.value}
              />
            </FormControl>
          )}
        </form.Field>

        <form.Field
          name="confirmPassword"
          validators={{
            onChange: ({ value }) => {
              if (!value) {
                return "Please confirm your password";
              }
            },
          }}
        >
          {(field) => (
            <FormControl
              errorMessage={field.state.meta.errors}
              invalid={field.state.meta.errors.length > 0}
              label="Confirm Password"
            >
              <PasswordInput
                autoComplete="new-password"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Confirm your password"
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
          loadingText="Creating account..."
          type="submit"
          width="full"
        >
          Create Account
        </Button>
        <Text color="muted" fontSize="sm" textAlign="center" w="full">
          Already have an account?{" "}
          <Link size="sm" to="/auth/signin">
            Sign in
          </Link>
        </Text>
      </CardFooter>
    </Card>
  );
};
