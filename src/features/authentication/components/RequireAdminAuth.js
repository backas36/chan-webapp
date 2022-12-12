import { useMemo } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { getAllowRoles } from "../../../utils/constants"
import { selectVerifiedUser } from "../services/authSlice"

const RequireAdminAuth = () => {
  const verifiedUser = useSelector(selectVerifiedUser)

  const isAllowed = useMemo(
    () => getAllowRoles(true).includes(verifiedUser?.role),
    [verifiedUser?.role]
  )

  return isAllowed ? <Outlet /> : <Navigate to="/login" replace />
}
export default RequireAdminAuth
