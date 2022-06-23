import {
  Box,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LockOpen } from "tabler-icons-react";
import useYupValidationResolver from "../hooks/useYupValidationResolver";
import usePageTitle from "../hooks/usePageTitle";
import { loginSchema } from "../validations/authSchemas";
import useAuthStore from "../store/useAuthStore";
import { showNotification } from "@mantine/notifications";
import baseService from "../services/baseService";

function LoginPage() {
  usePageTitle({ title: "Login" });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
    resolver: useYupValidationResolver(loginSchema),
  });

  async function onLogin({ username, password }) {
    try {
      await login(username, password);
      navigate("/", { replace: true });
      showNotification({
        message: "Login successful",
        color: "teal",
      });
    } catch (error) {
      showNotification({
        message: error?.response?.data ?? "An error occurred",
        color: "red",
      });
    }
  }

  return (
    <Box
      component="form"
      sx={(theme) => ({
        position: "relative",
        margin: "auto",
        width: "30%",
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.radius.md,
        padding: "2rem",
        boxShadow: theme.shadows.md,
        [`@media (max-width:${theme.breakpoints.xs}px)`]: {
          width: "90%",
        },
        [`@media (max-width:${theme.breakpoints.sm}px)`]: {
          width: "60%",
        },
      })}
      onSubmit={handleSubmit(onLogin)}
    >
      <LoadingOverlay visible={isSubmitting} />

      <Stack spacing={20} mb={10}>
        <TextInput
          placeholder="example@mail.com"
          label="Username"
          description="Enter your username"
          error={errors?.username?.message}
          {...register("username")}
        />

        <PasswordInput
          label="Password"
          placeholder="**********"
          description="Enter your password"
          error={errors?.password?.message}
          {...register("password")}
        />

        <Button
          color={"indigo"}
          leftIcon={<LockOpen size="22" />}
          type="submit"
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
          sx={(theme) => ({
            fontSize: theme.fontSizes.md,
          })}
        >
          Login
        </Button>
      </Stack>

      <Text
        sx={(theme) => ({ cursor: "pointer", color: theme.colors.indigo[6] })}
        variant="link"
        onClick={() => navigate("/register")}
      >
        Don&apos;t have an account?
      </Text>
    </Box>
  );
}
export default LoginPage;
