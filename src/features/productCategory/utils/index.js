import * as Yup from "yup"

export const poCateSchema = () => {
  let schema = {
    name: Yup.string().required("nameRequired"),
  }
  return Yup.object().shape(schema)
}

export const validateField = (field, value) => {
  return Yup.reach(poCateSchema(), field).validate(value)
}

export const validatePoCategory = (inputData) => {
  return poCateSchema().validate(inputData, { abortEarly: false })
}

export const initVal = {
  name: "",
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    name: processData.name,
  }
}
