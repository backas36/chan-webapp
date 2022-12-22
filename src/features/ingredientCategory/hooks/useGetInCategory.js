import { useGetAllInCategoriesQuery } from "../services/inCaApiSlice"

const useGetInCategory = (id) => {
  const { inCategory } = useGetAllInCategoriesQuery(null, {
    selectFromResult: ({ data }) => {
      return {
        inCategory: data?.data?.find((item) => item.id === id),
      }
    },
  })
  return inCategory
}
export default useGetInCategory
