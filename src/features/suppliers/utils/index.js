import * as Yup from "yup"

export const supplierSchema = () => {
  let schema = {
    name: Yup.string().required("nameRequired"),
    type: Yup.string().required("typeRequired"),
    contact: Yup.string().nullable(),
    location: Yup.string().nullable(),
  }
  return Yup.object().shape(schema)
}

export const validateOneInSupplier = (field, value) => {
  return Yup.reach(supplierSchema(), field).validate(value)
}

export const validateSupplier = (inputData) => {
  return supplierSchema().validate(inputData, { abortEarly: false })
}

export const initVal = {
  name: "",
  type: "",
  contact: "",
  location: "",
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    name: processData.name,
    type: processData.type,
    contact: processData.contact,
    location: processData.location,
  }
}
