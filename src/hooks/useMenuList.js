import { Dashboard, ManageAccounts } from "@mui/icons-material"
import { useMemo } from "react"
import { getAllowRoles } from "../utils/constants"

const useMenuList = () => {
  const menuList = useMemo(
    () => [
      {
        title: "Dashboard",
        pathname: "/admin/main",
        icon: <Dashboard fontSize="small" />,
        allowRoles: getAllowRoles(true),
      },
      {
        title: "Profile",
        pathname: "user-profile",
        icon: <ManageAccounts fontSize="small" />,
        allowRoles: getAllowRoles(false),
      },
    ],
    []
  )
  return menuList
}
export default useMenuList
