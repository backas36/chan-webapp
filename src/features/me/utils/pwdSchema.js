import * as Yup from "yup"

export const pwdSchema = () => {
  return Yup.object().shape({
    originalPassword: Yup.string().required("No password provided."),
    //.min(8, "Password is too short - should be 8 chars minimum."),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "At least 8 characters, and must includes numbers and special characters"
      ),
    newOkPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please enter new password again.")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "At least 8 characters, and must includes numbers and special characters"
      ),
  })
}
