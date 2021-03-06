import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).required(),
});

export const registerSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(6).required(),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
