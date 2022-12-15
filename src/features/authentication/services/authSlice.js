import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  verifiedUser: null,
  isLogin: !!localStorage.getItem("accessToken"),
}

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
  if (authSlice.actions.postLogin().type.match(action.type)) {
    const response = action.payload
    if (!response?.success || !response?.tokens) {
      store.dispatch(postLogout())
      return
    }
    const { accessToken, refreshToken } = response.tokens
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  } else if (authSlice.actions.postLogout().type.match(action.type)) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }
  return next(action)
}

export const { postLogin, postLogout, checkLogin } = authSlice.actions

export default authSlice.reducer

export const selectVerifiedUser = (state) => state.auth.verifiedUser
export const selectIsLogin = (state) => state.auth.isLogin
