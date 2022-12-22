export {
  useGetAllIngredientsQuery,
  useGetIngredientQuery,
  useAddIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  ingredientApiSlice,
} from "./services/ingredientApiSlice"

export { default as ingredientReducer } from "./services/ingredientSlice"
export { default as useGetIngredient } from "./hooks/useGetIngredient"
