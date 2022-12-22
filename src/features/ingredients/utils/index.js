import * as Yup from "yup"

export const ingredientSchema = () => {
  let schema = {
    name: Yup.string().required("nameRequired"),
    category: Yup.string().required("categoryRequired"),
    unit: Yup.number().required("unitRequired").positive(),
    size: Yup.string().required("sizeRequired"),
    sku: Yup.string().required("skuRequired"),
    brand: Yup.string().required("brandRequired"),
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
  unit: null,
  size: "",
  sku: "",
  brand: "",
  description: "",
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    name: processData.name,
    category: processData.category, // category name
    unit: processData.unit,
    size: processData.size,
    sku: processData.sku,
    brand: processData.brand,
    description: processData.description,
  }
}
