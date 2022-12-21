import { apiSlice } from "../../../services/api/apiSlice"

export const purchasesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPurchases: builder.query({
      query: (params) => ({
        url: "/purchase",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.purchases) {
          const purchasesLists = result.purchases?.data
          return [
            { type: "Purchases", id: "LIST" },
            ...purchasesLists.map((id) => ({ type: "Purchases", id })),
          ]
        } else {
          return [{ type: "Purchases", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.purchases) {
          return response.purchases
        }
        return []
      },
    }),
    getPurchase: builder.query({
      query: (id) => ({
        url: `/purchase/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Purchases", id }],
    }),
    addPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase",
        method: "POST",
        body: { ...data },
      }),
      //invalidatesTags: [{ type: "Purchases", id: "LIST" }],
    }),
    updatePurchase: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/purchase/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getPurchase", id, (draft) => {
            Object.assign(draft, data)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Purchases", id }],
    }),
    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchase/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Purchases", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllPurchasesQuery,
  useGetPurchaseQuery,
  useAddPurchaseMutation,
  useUpdatePurchaseMutation,
  useDeletePurchaseMutation,
} = purchasesApiSlice
