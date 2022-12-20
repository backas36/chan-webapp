import { apiSlice } from "../../../services/api/apiSlice"

export const supplierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuppliers: builder.query({
      query: (params) => ({
        url: "/supplier",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.suppliers) {
          const usersList = result.suppliers?.data
          return [
            { type: "Suppliers", id: "LIST" },
            ...usersList.map((id) => ({ type: "Suppliers", id })),
          ]
        } else {
          return [{ type: "Suppliers", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.suppliers) {
          return response.suppliers
        }
        return []
      },
    }),
    getSupplier: builder.query({
      query: (id) => ({
        url: `/supplier/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Suppliers", id }],
    }),
    addSupplier: builder.mutation({
      query: (supplierData) => ({
        url: "/supplier",
        method: "POST",
        body: { ...supplierData },
      }),
      invalidatesTags: [{ type: "Suppliers", id: "LIST" }],
    }),
    updateSupplier: builder.mutation({
      query: ({ id, ...supplierData }) => ({
        url: `/supplier/${id}`,
        method: "PATCH",
        body: { ...supplierData },
      }),
      async onQueryStarted(
        { id, ...supplierData },
        { dispatch, queryFulfilled }
      ) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getSupplier", id, (draft) => {
            Object.assign(draft, supplierData)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Suppliers", id }],
    }),
    deleteSupplier: builder.mutation({
      query: (id) => ({
        url: `/supplier/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Suppliers", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllSuppliersQuery,
  useGetSupplierQuery,
  useAddSupplierMutation,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApiSlice
