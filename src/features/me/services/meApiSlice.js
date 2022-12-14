import { apiSlice } from "../../../services/api/apiSlice"
import { postLogout } from "../../authentication"
import { setCurrentUser } from "./meSlice"

export const meApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/me",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log("getMe query", data)
          dispatch(setCurrentUser(data))
        } catch (err) {
          console.log("getMe failed , and trigger logout query")

          await dispatch(apiSlice.endpoints.logout.initiate())
        }
      },
      providesTags: ["Me"],
    }),
    updateMyPwd: builder.mutation({
      query: (credentials) => ({
        url: "/me/password",
        method: "PATCH",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data?.success) {
            dispatch(postLogout())
          }
        } catch {}
      },
      invalidatesTags: ["Me"],
    }),
    updateMyProfile: builder.mutation({
      query: (userData) => ({
        url: "/me/profile",
        method: "PATCH",
        body: { ...userData },
      }),
      async onQueryStarted(userData, { dispatch, queryFulfilled }) {
        const result = dispatch(
          apiSlice.util.updateQueryData("getMe", null, (draft) => {
            Object.assign(draft, userData)
          })
        )
        queryFulfilled.catch(result.undo)
      },
      invalidatesTags: ["Me"],
    }),
  }),
})

export const {
  useGetMeQuery,
  useUpdateMyProfileMutation,
  useUpdateMyPwdMutation,
} = meApiSlice
