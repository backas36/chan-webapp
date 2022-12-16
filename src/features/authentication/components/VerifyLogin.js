import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { selectCurrentUser, useGetMeQuery } from "../../me"
import { useVerifyQuery } from "../services/authApiSlice"
import { selectIsLogin } from "../services/authSlice"
import PageLoading from "../../../layout/PageLoading"

const VerifyLogin = () => {
  const isLogin = useSelector(selectIsLogin)
  const currentUser = useSelector(selectCurrentUser)

  const { data: verifiedUser } = useVerifyQuery(null, {
    skip: !isLogin,
  })

  useGetMeQuery(null, {
    skip: !verifiedUser || !isLogin,
  })

  let content

  if (isLogin && (!verifiedUser || !currentUser)) {
    content = <PageLoading />
  } else {
    content = <Outlet />
  }

  return content
}

export default VerifyLogin
