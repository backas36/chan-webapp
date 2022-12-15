import * as Yup from "yup"

export const forgotPwdSchema = () => {
  const schema = {
    email: Yup.string().email("emailInValid").required("emailRequire"),
  }
  return Yup.object().shape(schema)
}

export const activateSchema = () => {
  const schema = {
    password: Yup.string()
      .required("pwdRequired")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "pwdInValid"
      ),
    okPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "pwdNotMatch")
      .required("notEmpty")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "pwdInValid"
      ),
  }
  return Yup.object().shape(schema)
}

export const LoginSchema = (isRegister) => {
  const schema = {
    email: Yup.string().email("emailInValid").required("emailRequire"),
    password: Yup.string()
      .required("pwdRequired")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "pwdInValid"
      ),
    ...(isRegister && {
      name: Yup.string().required("notEmpty"),
      okPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "pwdNotMatch")
        .required("notEmpty")
        .matches(
          /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "pwdInValid"
        ),
    }),
  }
  return Yup.object().shape(schema)
}
