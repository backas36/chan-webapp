import { apiSlice } from "../../../services/api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        params,
      }),
      providesTags: (result, error, arg) => {
        if (result?.success && result?.users) {
          const usersList = result.users?.data
          return [
            { type: "Users", id: "LIST" },
            ...usersList.map((id) => ({ type: "Users", id })),
          ]
        } else {
          return [{ type: "Users", id: "LIST" }]
        }
      },
      transformResponse: (response, meta, arg) => {
        if (response?.success && response?.users) {
          return response.users
        }
        return []
      },
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: { ...userData },
      }),
      //invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...userData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { ...userData },
      }),
      async onQueryStarted({ id, ...userData }, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getUser", id, (draft) => {
            Object.assign(draft, userData)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      //invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    sendActivateMail: builder.mutation({
      query: (id) => ({
        url: `/users/resend-activate/${id}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSendActivateMailMutation,
} = usersApiSlice
