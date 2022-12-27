export {
  useGetAllInCategoriesQuery,
  useGetInCategoryQuery,
  useAddInCategoryMutation,
  useUpdateInCategoryMutation,
  useDeleteInCategoryMutation,
  inCaApiSlice,
} from "./services/inCaApiSlice"

export { default as inCategoriesReducer } from "./services/inCaSlice"
export { default as useGetInCategory } from "./hooks/useGetInCategory"
