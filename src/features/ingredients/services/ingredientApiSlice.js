import { apiSlice } from "../../../services/api/apiSlice"

export const ingredientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllIngredients: builder.query({
      query: (params) => ({
        url: "/ingredients",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.ingredients) {
          const ingredientsList = result.ingredients?.data
          return [
            { type: "Ingredients", id: "LIST" },
            ...ingredientsList.map((id) => ({ type: "Ingredients", id })),
          ]
        } else {
          return [{ type: "Ingredients", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.ingredients) {
          return response.ingredients
        }
        return []
      },
    }),
    getIngredient: builder.query({
      query: (id) => ({
        url: `/ingredients/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Ingredients", id }],
    }),
    addIngredient: builder.mutation({
      query: (data) => ({
        url: "/ingredients",
        method: "POST",
        body: { ...data },
      }),
      //invalidatesTags: [{ type: "Ingredients", id: "LIST" }],
    }),
    updateIngredient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/ingredients/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      async onQueryStarted({ id, ...data }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getIngredient", id, (draft) => {
            Object.assign(draft, data)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Ingredients", id }],
    }),
    deleteIngredient: builder.mutation({
      query: (id) => ({
        url: `/ingredients/${id}`,
        method: "DELETE",
      }),
      //invalidatesTags: (result, error, { id }) => [{ type: "Ingredients", id }],
    }),
  }),
})

export const {
  useGetAllIngredientsQuery,
  useGetIngredientQuery,
  useAddIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientApiSlice
