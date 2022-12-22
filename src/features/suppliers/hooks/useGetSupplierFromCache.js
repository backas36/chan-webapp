import { useGetAllSuppliersQuery } from "../services/suppliersApiSlice"

const useGetSupplier = (id) => {
  const { supplier } = useGetAllSuppliersQuery(null, {
    selectFromResult: ({ data }) => {
      return {
        supplier: data?.data?.find((supplier) => supplier.id === id),
      }
    },
  })

  return supplier
}

export default useGetSupplier
