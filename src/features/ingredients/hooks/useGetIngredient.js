import { useGetAllIngredientsQuery } from "../services/ingredientApiSlice"

const useGetIngredient = (id) => {
  const { ingredient } = useGetAllIngredientsQuery(null, {
    selectFromResult: ({ data }) => {
      return {
        ingredient: data?.data?.find((item) => item.id === id),
      }
    },
  })

  return ingredient
}
export default useGetIngredient
