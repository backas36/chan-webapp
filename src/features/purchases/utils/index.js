import * as Yup from "yup"

export const purchaseSchema = () => {
  let schema = {
    supplierId: Yup.string().uuid("idInvalid").required("idRequired"),
    ingredientId: Yup.string().uuid("idInvalid").required("idRequired"),
    quantity: Yup.number().required("quantityRequired").positive(),
    unitPrice: Yup.number().required("unitRequired").positive(),
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
  quantity: null,
  purchaseDate: null,
  unit: null,
  purchasePrice: null,
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    supplierId: processData.supplierId,
    ingredientId: processData.ingredientId,
    quantity: processData.quantity,
    unitPrice: processData.unitPrice,
    purchasePrice: processData.purchasePrice,
    purchaseDate: processData.purchaseDate,
    ingredientExpDate: processData.ingredientExpDate,
  }
}
