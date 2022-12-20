import * as Yup from "yup"

export const inCateSchema = () => {
  let schema = {
    name: Yup.string().required("nameRequired"),
  }
  return Yup.object().shape(schema)
}

export const validateField = (field, value) => {
  return Yup.reach(inCateSchema(), field).validate(value)
}

export const validateCategory = (inputData) => {
  return inCateSchema().validate(inputData, { abortEarly: false })
}

export const initVal = {
  name: "",
}

export const formatData = (processData) => {
  return {
    name: processData.name,
  }
}
