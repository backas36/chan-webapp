import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { getAllowRoles } from "../../../utils/constants"
import { selectVerifiedUser } from "../services/authSlice"
import { apiSlice } from "../../../services/api/apiSlice"

const RequireAdminAuth = () => {
  const dispatch = useDispatch()
  const verifiedUser = useSelector(selectVerifiedUser)

  const isAllowed = useMemo(
    () => getAllowRoles(true).includes(verifiedUser?.role),
    [verifiedUser?.role]
  )

  //useEffect(() => {
  //  dispatch(
  //    apiSlice.util.prefetch(
  //      "getAllUsers",
  //      { n: 15, s: 0, order: "", filters: "", q: "" },
  //      { force: true }
  //    )
  //  )
  //  dispatch(
  //    apiSlice.util.prefetch("getActionLogList", { n: 10 }, { force: true })
  //  )
  //}, [dispatch])

  return isAllowed ? <Outlet /> : <Navigate to="/login" replace />
}
export default RequireAdminAuth
