import { Logout } from "@mui/icons-material"
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PageLoading from "../../../layout/PageLoading"
import { useLogoutMutation } from "../../authentication"
import { selectCurrentUser } from "../services/meSlice"
import MenuUserInfo from "./MenuUserInfo"
import UserPassword from "./UserPassword"

const UserMenu = (props) => {
  const { t } = useTranslation()
  const {
    anchorUserMenu,
    isMenuOpen,
    handleCloseUserMenu,
    openDialogByName,
    closeDialog,
    openDialogName,
    menuList,
  } = props
  const [logout, { isLoading }] = useLogoutMutation()
  const currentUser = useSelector(selectCurrentUser)

  const getMenuList = useMemo(() => {
    return menuList.filter((item) =>
      item.allowRoles.includes(currentUser?.role)
    )
  }, [currentUser?.role, menuList])

  if (isLoading) {
    return <PageLoading />
  }

  const MenuItems = () => {
    return (
      <>
        <MenuUserInfo />
        <Divider component="li" />
        {getMenuList.map((item) => {
          return (
            <MenuItem
              key={item.pathname}
              component={Link}
              to={item.pathname}
              onClick={handleCloseUserMenu}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {t(item.title)}
            </MenuItem>
          )
        })}
        <UserPassword
          isOpen={openDialogName === "password"}
          handleClose={closeDialog}
          openDialog={() => openDialogByName("password")}
        />
        <MenuItem onClick={async () => await logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("logout")}
        </MenuItem>
      </>
    )
  }

  return (
    <Menu
      anchorEl={anchorUserMenu}
      open={isMenuOpen}
      onClose={handleCloseUserMenu}
    >
      <MenuItems />
    </Menu>
  )
}
export default UserMenu
