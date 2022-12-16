import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import { selectCurrentUser, useGetMeQuery } from "../../me"
import { useVerifyQuery } from "../services/authApiSlice"
import { postLogout, selectIsLogin } from "../services/authSlice"
import PageLoading from "../../../layout/PageLoading"
import { useEffect } from "react"

const VerifyLogin = () => {
  const dispatch = useDispatch()
  const isLogin = useSelector(selectIsLogin)
  const currentUser = useSelector(selectCurrentUser)

  const {
    data: verifiedUser,
    isSuccess,
    isLoading,
  } = useVerifyQuery(null, {
    skip: !isLogin,
  })

  useGetMeQuery(null, {
    skip: !verifiedUser || !isLogin,
  })

  useEffect(() => {
    // postLogout to clean localStorage when isLogin is true, but cannot get verified user from server
    if (isLogin && isSuccess && !verifiedUser) {
      dispatch(postLogout())
    }
  }, [isLogin, isSuccess, verifiedUser, dispatch])
  let content

  if (isLoading || !currentUser) {
    content = <PageLoading />
  } else {
    content = <Outlet />
  }

  return content
}

export default VerifyLogin
