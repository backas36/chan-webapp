import * as Yup from "yup"

export const activateSchema = () => {
  const schema = {
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, Lowercase, and Number"
      ),
    okPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please enter new password again.")
      .matches(
        /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, Lowercase, and Number"
      ),
  }
  return Yup.object().shape(schema)
}
