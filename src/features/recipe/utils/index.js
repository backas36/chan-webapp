import * as Yup from "yup"

export const recipeSchema = () => {
  let schema = {
    productId: Yup.string().uuid("idInvalid").required("idRequired"),
    ingredientId: Yup.string().uuid("idInvalid").required("idRequired"),
    quantity: Yup.number().required("quantityRequired").positive(),
  }
  return Yup.object().shape(schema)
}

export const validateField = (field, value) => {
  return Yup.reach(recipeSchema(), field).validate(value)
}

export const validateRecipe = (inputData) => {
  return recipeSchema().validate(inputData, { abortEarly: false })
}

export const initVal = {
  productId: "",
  ingredientId: "",
  quantity: null,
  categoryId: "",
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    productId: processData.productId,
    ingredientId: processData.ingredientId,
    quantity: processData.quantity,
  }
}
