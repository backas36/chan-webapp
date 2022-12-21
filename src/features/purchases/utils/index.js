import * as Yup from "yup"

export const purchaseSchema = () => {
  let schema = {
    quantity: Yup.number().required("quantityRequired").positive(),
    ingredientId: Yup.string().uuid("idInvalid").required("idRequired"),
    purchaseDate: Yup.date("dateValid").nullable().required("dateRequired"),
    unitPrice: Yup.number().required("unitRequired").positive(),
    purchasePrice: Yup.number().required("purchasePrice").positive(),
    supplierName: Yup.string().required("supplierName"),
    supplierType: Yup.string().required("typeRequired"),
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
  quantity: null,
  purchaseDate: null,
  unit: null,
  unitPrice: null,
  purchasePrice: null,
  supplierName: "",
  supplierType: "",
}

export const formatData = (processData) => {
  return {
    id: processData.id,
    quantity: processData.quantity,
    ingredientId: processData.ingredientId,
    purchaseDate: processData.purchaseDate,
    unit: processData.unit,
    unitPrice: processData.unitPrice,
    purchasePrice: processData.purchasePrice,
    supplierName: processData.supplierName,
    supplierType: processData.supplierType,
  }
}
