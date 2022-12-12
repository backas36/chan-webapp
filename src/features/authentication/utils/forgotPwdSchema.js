import * as Yup from "yup"

export const forgotPwdSchema = () => {
  const schema = {
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
  }
  return Yup.object().shape(schema)
}
