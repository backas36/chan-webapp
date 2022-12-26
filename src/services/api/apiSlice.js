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
  console.log("baseQueryWithReAuth")
  console.log("🐑 ~ api", api)
  console.log("🐑 ~ extraOptions", extraOptions)
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  console.log("🐑 ~ result", result)

  if (result?.error?.status === 403) {
    console.log("got 403")
    if (!mutex.isLocked()) {
      console.log("api not locked")
      const release = await mutex.acquire()

      try {
        const refreshToken = localStorage.getItem("refreshToken") || null
        console.log("old refresh token: " + refreshToken)
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken },
          },
          api,
          extraOptions
        )
        console.log("refresh result", refreshResult)
        if (refreshResult?.data?.success) {
          console.log("refresh success")
          api.dispatch(postLogin(refreshResult.data))
          console.log("🐑 ~ api", api)
          result = await baseQuery(args, api, extraOptions)
          console.log("🐑 ~ result", result)
        } else {
          console.log("🐑 ~ extraOptions", extraOptions)
          console.log("refresh failed")
          api.dispatch(postLogout())
        }
      } finally {
        console.log("release api")
        release()
      }
    } else {
      console.log("api is locked")

      await mutex.waitForUnlock()
      console.log("after unlock")
      result = await baseQuery(args, api, extraOptions)
      console.log("🐑 ~ extraOptions", extraOptions)
    }
  }
  console.log("pass")
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "ActionLogs",
    "Me",
    "Users",
    "Suppliers",
    "InCategories",
    "PoCategories",
    "Purchases",
    "Ingredients",
    "Products",
    "Recipe",
  ],
  endpoints: (builder) => ({}),
})

export const rtkQueryErrorMiddleware = (api) => (next) => (action) => {
  const tokenExpired = action?.payload?.data?.message === "jwt expired"

  if (isRejectedWithValue(action)) {
    const message = tokenExpired
      ? "Please Login Again"
      : action?.payload?.data?.message

    customToast.error(message)
  }

  return next(action)
}
