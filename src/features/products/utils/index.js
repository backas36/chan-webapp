import * as Yup from "yup"

export const productSchema = () => {
  let schema = {
    name: Yup.string().required("nameRequired"),
    fixedPrice: Yup.number().required("fixedPrice").positive(),
    sku: Yup.string().required("skuRequired"),
    category: Yup.string().required("categoryRequired"),
    variant: Yup.string().required("variantRequired"),
  }
  return Yup.object().shape(schema)
}

export const validateField = (field, value) => {
  return Yup.reach(productSchema(), field).validate(value)
}

export const validateProduct = (inputData) => {
  return productSchema().validate(inputData, { abortEarly: false })
}

export const initVal = {
  name: "",
  fixedPrice: null,
  sku: "",
  category: "",
  variant: "",
  description: "",
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    name: processData.name,
    fixedPrice: processData.fixedPrice,
    sku: processData.sku,
    variant: processData.variant,
    category: processData.category,
    description: processData.description,
  }
}
