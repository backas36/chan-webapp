import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Divider, Paper, styled, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import logoImage from "../../assets/image/s_logo.jpg"
import MainWrapper from "../../layout/MainWrapper"
import MAvatar from "../../components/Avatar/MAvatar"
import { LoginForm, selectIsLogin } from "../../features/authentication"
import useTitle from "../../hooks/useTitle"
import LoginWrapper from "../../layout/LoginWrapper"

const FormPaperStyle = styled(Paper)({
  padding: 30,
  width: 400,
})

const Login = () => {
  useTitle("Login")

  const { t } = useTranslation()

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
