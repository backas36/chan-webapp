import { apiSlice } from "../../../services/api/apiSlice"

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.products) {
          const productsList = result.products?.data
          return [
            { type: "Products", id: "LIST" },
            ...productsList.map((id) => ({ type: "Products", id })),
          ]
        } else {
          return [{ type: "Products", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.products) {
          return response.products
        }
        return []
      },
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: { ...data },
      }),
      //invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getProduct", id, (draft) => {
            Object.assign(draft, data)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      //invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice
