import * as Yup from "yup"

export const LoginSchema = (isRegister) => {
  const schema = {
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "At least 8 characters, and must includes numbers and special characters"
      ),
    ...(isRegister && {
      name: Yup.string().required("Name is required"),
      okPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please enter new password again.")
        .matches(
          /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "At least 8 characters, and must includes numbers and special characters"
        ),
    }),
  }
  return Yup.object().shape(schema)
}
