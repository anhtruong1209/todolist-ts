import * as yup from "yup"
import { validEmailRegex } from "../../../utils"

export const loginSchema = yup.object({
  email: yup.string().matches(validEmailRegex, "emailInvalid").required("emailRequire"),
  password: yup.string().min(4, "minPasswordInvalid").required("passwordRequire"),
})

export const registerSchema = yup.object({
  email: yup.string().matches(validEmailRegex, "emailInvalid").required("emailRequire"),
  password: yup.string().min(4, "minPasswordInvalid").required("passwordRequire"),
  repeatPassword: yup
    .string()
    .required("passwordRequire")
    .oneOf([yup.ref("password"), "null"], "confirmPasswordInvalid"),
  name: yup.string().required("nameRequire"),
  // region: yup.string()
  //     .required('regionRequire'),
  // state: yup.string()
  //     .required('stateRequire'),
  // gender: yup.string()
  //     .required('genderRequire'),
})

export const addTodoListSchema = yup.object({
  plan: yup.string().required("planRequire"),
})
