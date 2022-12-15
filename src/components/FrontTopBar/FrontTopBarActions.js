import { Lock } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { selectIsLogin } from "../../features/authentication"
import MAvatar from "../avatar/MAvatar"
import { useState } from "react"
import { selectCurrentUser, UserMenu } from "../../features/me"

import { ToggleLang } from "../../features/lang"
import { ToggleTheme } from "../../features/ui"
import { MBox } from "./styled"
import useMenuList from "../../hooks/useMenuList"
import FrontTopBarMenu from "./FrontTopBarMenu"

const FrontTopBarActions = () => {
  const navigate = useNavigate()
  const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  const [openDialogName, setOpenDialogName] = useState(null)
  const isLogin = useSelector(selectIsLogin)
  const currentUser = useSelector(selectCurrentUser)

  const menuList = useMenuList()

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
          <FrontTopBarMenu>
            <Tooltip title="Open User Setting">
              <IconButton onClick={handleMenuClick}>
                <MAvatar
                  source={currentUser?.photoUrl}
                  sx={{
                    bgcolor: (theme) => theme.palette.success.dark,
                  }}
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
          </FrontTopBarMenu>
        </>
      ) : (
        <Tooltip title="Click to Login">
          <IconButton onClick={() => navigate("/login")}>
            <MAvatar
              sx={{
                bgcolor: (theme) => theme.palette.success.dark,
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
