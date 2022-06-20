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

function LoginPage() {
  usePageTitle({ title: "Login" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
    resolver: useYupValidationResolver(loginSchema),
  });

  function onLogin(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(data);
        resolve();
      }, 2000);
    });
  }

  return (
    <Box
      component="form"
      sx={(theme) => ({
        position: "relative",
        margin: "auto",
        width: "20%",
        backgroundColor: theme.colors.gray[0],
        borderRadius: theme.radius.md,
        padding: "2rem",
        boxShadow: theme.shadows.md,
      })}
      onSubmit={handleSubmit(onLogin)}
    >
      <LoadingOverlay visible={isSubmitting} />

      <Stack spacing={20} mb={10}>
        <TextInput
          placeholder="example@mail.com"
          label="E-mail Address"
          description="We'll never share your email with anyone else."
          error={errors?.email?.message}
          {...register("email")}
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
