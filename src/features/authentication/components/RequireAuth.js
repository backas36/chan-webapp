import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { selectIsLogin } from "../services/authSlice"
import { selectCurrentUser } from "../../me"
import Forbidden from "./Forbidden"
import { USER_STATUS } from "../../../utils/constants"

const RequireAuth = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogin = useSelector(selectIsLogin)
  const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (!isLogin) {
      navigate("/login", { replace: true })
    }
  }, [isLogin, navigate, dispatch, currentUser])

  let content
  if (isLogin && !currentUser) {
    content = <Navigate to="/login" replace={true} />
  } else if (currentUser?.status !== USER_STATUS.active) {
    content = (
      <Forbidden>
        {t("notAllowedAccess")} -<strong> {t("contactManager")}</strong>
      </Forbidden>
    )
  } else {
    content = <Outlet />
  }

  return content
}

export default RequireAuth
