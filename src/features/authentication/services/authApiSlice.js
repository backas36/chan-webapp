import { apiSlice } from "../../../services/api/apiSlice"
import { checkLogin, postLogin, postLogout } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(postLogin(data))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    loginWithGoogle: builder.mutation({
      query: (credential) => ({
        url: "/auth/verify/google-login",
        method: "GET",
        headers: {
          Authorization: "Bearer " + credential,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(postLogin(data))
        } catch (err) {
          console.log(err)
        }
      },
    }),
    forgetPwd: builder.mutation({
      query: (email) => ({
        url: "reset-password",
        method: "POST",
        body: email,
      }),
    }),
    sendResetPwd: builder.mutation({
      query: (credentials) => ({
        url: "active-reset-password",
        method: "POST",
        body: {
          token: credentials.token,
          password: credentials.password,
        },
      }),
    }),
    activate: builder.mutation({
      query: (credentials) => ({
        url: "activate-account",
        method: "POST",
        body: {
          token: credentials.token,
          password: credentials.password,
        },
      }),
    }),
    verify: builder.query({
      query: () => "/auth/verify",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data?.success && data?.verifiedUser) {
            dispatch(checkLogin(data?.verifiedUser))
          }
        } catch (err) {
          console.log("verify failed")
          await dispatch(apiSlice.endpoints.logout.initiate())
        }
      },
    }),
    logout: builder.mutation({
      query: () => {
        console.log("logout mutation")
        const refreshToken = localStorage.getItem("refreshToken")
        return {
          url: "/auth/logout",
          method: "POST",
          body: { refreshToken },
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } finally {
          dispatch(postLogout())
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        }
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useVerifyQuery,
  useLogoutMutation,
  useActivateMutation,
  useForgetPwdMutation,
  useSendResetPwdMutation,
  useLoginWithGoogleMutation,
} = authApiSlice
