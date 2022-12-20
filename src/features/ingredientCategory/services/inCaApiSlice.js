import { apiSlice } from "../../../services/api/apiSlice"

export const inCaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllInCategories: builder.query({
      query: (params) => ({
        url: "/ingredient-category",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.inCategories) {
          const inCategoriesList = result.inCategories?.data
          return [
            { type: "InCategories", id: "LIST" },
            ...inCategoriesList.map((id) => ({ type: "InCategories", id })),
          ]
        } else {
          return [{ type: "InCategories", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.inCategories) {
          return response.inCategories
        }
        return []
      },
    }),
    getInCategory: builder.query({
      query: (id) => ({
        url: `/ingredient-category/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "InCategories", id }],
    }),
    addInCategory: builder.mutation({
      query: (data) => ({
        url: "/ingredient-category",
        method: "POST",
        body: { ...data },
      }),
      //invalidatesTags: [{ type: "InCategories", id: "LIST" }],
    }),
    updateInCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/ingredient-category/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getInCategory", id, (draft) => {
            Object.assign(draft, data)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "InCategories", id },
      ],
    }),
    deleteInCategory: builder.mutation({
      query: (id) => ({
        url: `/ingredient-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "InCategories", id: "LIST" }],
    }),
  }),
})

export const {
  useGetAllInCategoriesQuery,
  useGetInCategoryQuery,
  useAddInCategoryMutation,
  useUpdateInCategoryMutation,
  useDeleteInCategoryMutation,
} = inCaApiSlice
