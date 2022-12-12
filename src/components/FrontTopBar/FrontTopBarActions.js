import {
  Lock,
  Favorite as Heart,
  ShoppingCart,
  Dashboard,
  ManageAccounts,
} from "@mui/icons-material"
import { Box, IconButton, Tooltip } from "@mui/material"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { selectIsLogin } from "../../features/authentication"
import MAvatar from "../Avatar/MAvatar"
import { useMemo, useState } from "react"
import { selectCurrentUser, UserMenu } from "../../features/me"
import { getAllowRoles } from "../../utils/constants"

import { ToggleLang } from "../../features/lang"
import { ToggleTheme } from "../../features/ui"
import { MBox } from "./styled"

const FrontTopBarActions = () => {
  const navigate = useNavigate()
  const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  const [openDialogName, setOpenDialogName] = useState(null)
  const isLogin = useSelector(selectIsLogin)
  const currentUser = useSelector(selectCurrentUser)

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

  let isMenuOpen = Boolean(anchorUserMenu)

  const handleMenuClick = (e) => {
    setAnchorUserMenu(e.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorUserMenu(null)
  }

  const openDialogByName = (dialogName) => {
    setOpenDialogName(dialogName)
  }
  const closeDialog = () => {
    setOpenDialogName(null)
    setAnchorUserMenu(null)
  }

  return (
    <MBox>
      <ToggleLang />
      <ToggleTheme />
      {isLogin ? (
        <>
          <Tooltip title="toggle theme mode">
            <IconButton component={Link} to="cart">
              <MAvatar sx={{ width: 36, height: 36 }}>
                <ShoppingCart />
              </MAvatar>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to Wish List">
            <IconButton component={Link} to="favorite">
              <MAvatar sx={{ width: 36, height: 36 }}>
                <Heart />
              </MAvatar>
            </IconButton>
          </Tooltip>
          <Tooltip title="Open User Setting">
            <IconButton onClick={handleMenuClick}>
              <MAvatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: (theme) => theme.palette.success.dark,
                }}
                source={currentUser?.photoUrl}
              >
                {!currentUser?.photoUrl &&
                  currentUser?.name.charAt(0).toUpperCase()}
              </MAvatar>
            </IconButton>
          </Tooltip>
          <UserMenu
            menuList={menuList}
            anchorUserMenu={anchorUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            isMenuOpen={isMenuOpen}
            openDialogByName={openDialogByName}
            closeDialog={closeDialog}
            openDialogName={openDialogName}
          />
        </>
      ) : (
        <Tooltip title="Add to Wish List">
          <IconButton onClick={() => navigate("/login")}>
            <MAvatar
              sx={{
                width: 36,
                height: 36,
                bgColor: (theme) => theme.palette.primary.dark,
                cursor: "pointer",
              }}
            >
              <Lock />
            </MAvatar>
          </IconButton>
        </Tooltip>
      )}
    </MBox>
  )
}
export default FrontTopBarActions
