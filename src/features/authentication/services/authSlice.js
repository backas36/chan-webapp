import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  verifiedUser: null,
  isLogin: !!localStorage.getItem("accessToken"),
}
console.log("authSlice isLogin", initialState.isLogin)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    postLogin: (state, action) => {
      state.isLogin = true
    },
    postLogout: (state, action) => {
      state.verifiedUser = null
      state.isLogin = false
    },
    checkLogin: (state, action) => {
      state.verifiedUser = action.payload
    },
  },
})

export const tokensMiddleware = (store) => (next) => (action) => {
  console.log(action.type)
  if (authSlice.actions.postLogin().type.match(action.type)) {
    const response = action.payload
    console.log("tokens middleware", response)
    if (!response?.success || !response?.tokens) {
      console.log("tokens middleware postLogout")
      store.dispatch(postLogout())
      return
    }
    const { accessToken, refreshToken } = response.tokens
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  } else if (authSlice.actions.postLogout().type.match(action.type)) {
    console.log("tokens middleware logout")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
  return next(action)
}

export const { postLogin, postLogout, checkLogin } = authSlice.actions

export default authSlice.reducer

export const selectVerifiedUser = (state) => state.auth.verifiedUser
export const selectIsLogin = (state) => state.auth.isLogin
