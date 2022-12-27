import * as Yup from "yup"

export const purchaseSchema = () => {
  let schema = {
    brand: Yup.string().required("brandRequired"),
    supplierId: Yup.string().uuid("idInvalid").required("idRequired"),
    ingredientId: Yup.string().uuid("idInvalid").required("idRequired"),
    quantity: Yup.number().required("quantityRequired").positive(),
    unitPrice: Yup.number().required("unitPrice").positive(),
    purchasePrice: Yup.number().required("purchasePrice").positive(),
    purchaseDate: Yup.date("dateValid").required("dateRequired"),
    ingredientExpDate: Yup.date("dateValid").nullable().notRequired(),
  }
  return Yup.object().shape(schema)
}

export const validateField = (field, value) => {
  return Yup.reach(purchaseSchema(), field).validate(value)
}

export const validatePurchase = (inputData) => {
  return purchaseSchema().validate(inputData, { abortEarly: false })
}

export const initVal = {
  supplierId: "",
  ingredientId: "",
  brand: "",
  quantity: null,
  purchaseDate: null,
  purchasePrice: null,
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    supplierId: processData.supplierId,
    ingredientId: processData.ingredientId,
    brand: processData.brand,
    quantity: processData.quantity,
    unitPrice: processData.purchasePrice / processData.quantity,
    purchasePrice: processData.purchasePrice,
    purchaseDate: processData.purchaseDate,
    ingredientExpDate: processData.ingredientExpDate,
  }
}
