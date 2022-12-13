import * as Yup from "yup"

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const profileSchema = (isCreate = false, isUpdate = false) => {
  let schema = {
    name: Yup.string().required("nameRequired"),

    email: Yup.string().email("emailInValid").required("emailRequire"),
    address: Yup.string().nullable(),
    lineId: Yup.string().nullable(),
    birthDate: Yup.date("dateValid").nullable(),

    mobile: Yup.string().matches(phoneRegExp, "phoneInvalid").nullable(),
    ...(isCreate && {
      role: Yup.string().required("roleRequired"),
    }),
    ...(isUpdate && {
      status: Yup.string().required("statusRequired"),
    }),
  }
  return Yup.object().shape(schema)
}

export const pwdSchema = () => {
  return Yup.object().shape({
    originalPassword: Yup.string().required("pwdRequired"),
    //.min(8, "Password is too short - should be 8 chars minimum."),
    newPassword: Yup.string()
      .required("pwdRequired")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "pwdInValid"
      ),
    newOkPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "pwdNotMatch")
      .required("notEmpty")
      .matches(
        /^(?=.*[A-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "pwdInValid"
      ),
  })
}
