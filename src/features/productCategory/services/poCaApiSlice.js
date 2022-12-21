import { apiSlice } from "../../../services/api/apiSlice"

export const poCaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPoCategories: builder.query({
      query: (params) => ({
        url: "/products-category",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.poCategories) {
          const poCategoriesList = result.poCategories?.data
          return [
            { type: "PoCategories", id: "LIST" },
            ...poCategoriesList.map((id) => ({ type: "PoCategories", id })),
          ]
        } else {
          return [{ type: "PoCategories", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.poCategories) {
          return response.poCategories
        }
        return []
      },
    }),
    getPoCategory: builder.query({
      query: (id) => ({
        url: `/products-category/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "PoCategories", id }],
    }),
    addPoCategory: builder.mutation({
      query: (data) => ({
        url: "/products-category",
        method: "POST",
        body: { ...data },
      }),
      //invalidatesTags: [{ type: "PoCategories", id: "LIST" }],
    }),
    updatePoCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products-category/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getPoCategory", id, (draft) => {
            Object.assign(draft, data)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "PoCategories", id },
      ],
    }),
    deletePoCategory: builder.mutation({
      query: (id) => ({
        url: `/products-category/${id}`,
        method: "DELETE",
      }),
      //invalidatesTags: [{ type: "PoCategories", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllPoCategoriesQuery,
  useGetPoCategoryQuery,
  useAddPoCategoryMutation,
  useUpdatePoCategoryMutation,
  useDeletePoCategoryMutation,
} = poCaApiSlice
