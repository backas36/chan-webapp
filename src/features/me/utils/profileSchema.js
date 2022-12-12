import * as Yup from "yup"

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const profileSchema = (isCreate = false, isUpdate = false) => {
  let schema = {
    name: Yup.string().required("Name is required"),

    email: Yup.string()
      .email("Provide a valid email address")
      .required("Email is required"),
    address: Yup.string().nullable(),
    lineId: Yup.string().nullable(),
    birthDate: Yup.date("Must be a valid date").nullable(),

    mobile: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .nullable(),
    ...(isCreate && {
      role: Yup.string().required("Role is required"),
    }),
    ...(isUpdate && {
      status: Yup.string().required("Status is required"),
    }),
  }
  return Yup.object().shape(schema)
}

export default profileSchema
