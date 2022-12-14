import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  verifiedUser: null,
  isLogin: !!localStorage.getItem("accessToken"),
}

console.log("authSlice accessToken", localStorage.getItem("accessToken"))

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    postLogin: (state, action) => {
      console.log("postLogin reducer")
      state.isLogin = true
    },
    postLogout: (state, action) => {
      console.log("logout reducer")
      state.verifiedUser = null
      state.isLogin = false
    },
    checkLogin: (state, action) => {
      console.log("checkLogin reducer")
      state.verifiedUser = action.payload
    },
  },
})

export const tokensMiddleware = (store) => (next) => (action) => {
  if (authSlice.actions.postLogin().type.match(action.type)) {
    const response = action.payload
    if (!response?.success || !response?.tokens) {
      console.log("tokens middleware, response failed", response)
      store.dispatch(postLogout())
      return
    }
    const { accessToken, refreshToken } = response.tokens
    console.log("tokens middleware, success")
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  } else if (authSlice.actions.postLogout().type.match(action.type)) {
    console.log("tokens middleware  remove localStorage")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
  return next(action)
}

export const { postLogin, postLogout, checkLogin } = authSlice.actions

export default authSlice.reducer

export const selectVerifiedUser = (state) => state.auth.verifiedUser
export const selectIsLogin = (state) => state.auth.isLogin
