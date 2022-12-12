export { default as RequireAuth } from "./components/RequireAuth"
export { default as VerifyLogin } from "./components/VerifyLogin"
export { default as LoginForm } from "./components/LoginForm"
export { default as RequireAdmin } from "./components/RequireAdmin"

export {
  authApiSlice,
  useLoginMutation,
  useVerifyQuery,
  useLogoutMutation,
  useActivateMutation,
  useForgetPwdMutation,
  useSendResetPwdMutation,
  useLoginWithGoogleMutation,
  useRegisterMutation,
} from "./services/authApiSlice"

export {
  default as authReducer,
  tokensMiddleware,
  postLogin,
  postLogout,
  checkLogin,
  selectVerifiedUser,
  selectIsLogin,
} from "./services/authSlice"
