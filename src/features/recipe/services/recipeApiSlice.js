import { apiSlice } from "../../../services/api/apiSlice"

export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductRecipes: builder.query({
      query: ({ productId, ...params }) => ({
        url: `/recipe/${productId}`,
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.recipe) {
          const recipeLists = result.recipe?.data
          return [
            { type: "Recipe", id: "LIST" },
            ...recipeLists.map((id) => ({ type: "Recipe", id })),
          ]
        } else {
          return [{ type: "Recipe", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.recipe) {
          return response.recipe
        }
        return []
      },
    }),
    addRecipeByPoId: builder.mutation({
      query: ({ productId, ...data }) => {
        console.log(productId, data)
        return {
          url: `/recipe/${productId}`,
          method: "POST",
          body: { ...data },
        }
      },
      //invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
    updateRecipe: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/recipe/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Recipe", id }],
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `/recipe/${id}`,
        method: "DELETE",
      }),
      //invalidatesTags: [{ type: "Recipe", id: "LIST" }],
    }),
  }),
})

export const {
  useGetProductRecipesQuery,
  useAddRecipeByPoIdMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApiSlice
