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
/**
 *    {
                "id": "684932b2-7ade-40e4-a9dd-dacb956452a4",
                "quantity": 10,
                "unitPrice": 180,
                "purchasePrice": 1800,
                "purchaseDate": "2022-12-17T00:00:00.000Z",
                "ingredientExpDate": "2022-12-30T00:00:00.000Z",
                "supplierName": "Aimee",
                "supplierType": "shopee", 
                "location": "https://shopee.tw/shop/15984217/search?shopCollection=28122818", (x)
                "supplierContact": "bakery123", (x)
                "ingredientId": "7c522fc6-8a57-496f-a902-a6b66b22cab5",
                "ingredientName": "whole milk",
                "ingredientBrand": "dairygood",
                "ingredientUnit": 1200,
                "ingredientSize": "ml",
                "ingredientSku": "jug",
                "ingredientDesc": "not good for bakery", (x)
                "categoryName": "milk",
                "createdByName": "Ashi",
                "createdAt": "2022-12-21T07:47:40.339Z",
                "updatedAt": "2022-12-21T07:47:40.339Z"
            }
 */
//quantity, purchaseDate, unitPrice, purchasePrice,supplierName, supplierType
//quantity,unitPrice,purchaseDate,ingredientExpDate,purchasePrice,createByName
// supplierName,  supplierType, ingredientName,ingredientBrand, ingredientUnit,ingredientBrand,categoryName
