import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import { LoginForm, selectIsLogin } from "../../features/authentication"
import useTitle from "../../hooks/useTitle"
import LoginWrapper from "../../layout/LoginWrapper"

const Login = () => {
  const { t } = useTranslation()
  useTitle(t("login"))

  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = useSelector(selectIsLogin)

  useEffect(() => {
    if (isLogin) {
      navigate("/", { state: { from: location }, replace: true })
    }
  }, [isLogin, navigate, location])

  return (
    <LoginWrapper title={t("signIn")}>
      <LoginForm />
    </LoginWrapper>
  )
}
export default Login
