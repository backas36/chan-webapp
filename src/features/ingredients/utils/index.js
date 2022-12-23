import * as Yup from "yup"

export const ingredientSchema = () => {
  let schema = {
    name: Yup.string().required("nameRequired"),
    category: Yup.string().required("categoryRequired"),
    sku: Yup.string().required("skuRequired"),
  }
  return Yup.object().shape(schema)
}

export const validateField = (field, value) => {
  return Yup.reach(ingredientSchema(), field).validate(value)
}

export const validateIngredient = (inputData) => {
  return ingredientSchema().validate(inputData, { abortEarly: false })
}

export const initVal = {
  name: "",
  category: "",
  sku: "",
  description: "",
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    name: processData.name,
    category: processData.category, // category name
    sku: processData.sku,
    description: processData.description,
  }
}
