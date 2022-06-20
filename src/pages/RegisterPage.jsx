import {
  Box,
  Stack,
  TextInput,
  PasswordInput,
  Button,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ShieldLock } from "tabler-icons-react";
import { registerSchema } from "../validations/authSchemas";
import useYupValidationResolver from "../hooks/useYupValidationResolver";
import { useForm } from "react-hook-form";
import usePageTitle from "../hooks/usePageTitle";

function RegisterPage() {
  usePageTitle({ title: "Register" });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "all",
    resolver: useYupValidationResolver(registerSchema),
  });

  function onRegister(data) {
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
      onSubmit={handleSubmit(onRegister)}
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

        <PasswordInput
          label="Confirm Password"
          placeholder="**********"
          description="Enter confirm password"
          error={errors?.confirmpassword?.message}
          {...register("confirmpassword")}
        />

        <Button
          type="submit"
          color={"indigo"}
          leftIcon={<ShieldLock size="22" />}
          disabled={isSubmitting || !isValid}
          loading={isSubmitting}
          sx={(theme) => ({
            fontSize: theme.fontSizes.md,
          })}
        >
          Register
        </Button>

        <Text
          sx={(theme) => ({ cursor: "pointer", color: theme.colors.indigo[5] })}
          variant="link"
          onClick={() => navigate("/login")}
        >
          Already have an account?
        </Text>
      </Stack>
    </Box>
  );
}

export default RegisterPage;
