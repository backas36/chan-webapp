import { isRejectedWithValue } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"
import { customToast } from "../../components/notify/NotifyToast"
import { postLogin, postLogout } from "../../features/authentication"

const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080"

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, api) => {
    const { getState } = api
    const isLogin = getState().auth.isLogin
    const token = localStorage.getItem("accessToken") || null
    if (isLogin && token) {
      headers.set("Authorization", "Bearer " + token)
    }
    return headers
  },
})

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshToken = localStorage.getItem("refreshToken") || null
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        )
        if (refreshResult?.data?.success) {
          api.dispatch(postLogin(refreshResult.data))

          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(postLogout())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["ActionLogs", "Me", "Users"],
  endpoints: (builder) => ({}),
})

export const rtkQueryErrorMiddleware = (api) => (next) => (action) => {
  const tokenExpired = action?.payload?.data?.message === "jwt expired"

  if (isRejectedWithValue(action)) {
    const message = tokenExpired
      ? "Your login has expired"
      : action?.payload?.data?.message

    customToast.error(message)
  }

  return next(action)
}
