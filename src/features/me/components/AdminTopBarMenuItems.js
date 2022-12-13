import { IconButton, Tooltip } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"

import MAvatar from "../../../components/Avatar/MAvatar"
import useMenuList from "../../../hooks/useMenuList"
import { selectCurrentUser } from "../services/meSlice"
import UserMenu from "./UserMenu"

const AdminTopBarMenuItems = () => {
  const currentUser = useSelector(selectCurrentUser)

  const [anchorUserMenu, setAnchorUserMenu] = useState(null)
  const [openDialogName, setOpenDialogName] = useState(null)

  let isMenuOpen = Boolean(anchorUserMenu)

  const menuList = useMenuList()

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
    <>
      {/* TODO: feature */}
      {/*<IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={5}>
          <Mail />
        </Badge>
      </IconButton>
      <IconButton size="large" color="inherit">
        <Badge color="error" badgeContent={20}>
          <Notifications />
        </Badge>
      </IconButton>*/}
      <Tooltip title="Open User Setting">
        <IconButton onClick={handleMenuClick}>
          <MAvatar
            sx={{ width: 36, height: 36 }}
            source={currentUser?.photoUrl}
          >
            {!currentUser?.photoUrl &&
              currentUser?.name.charAt(0).toUpperCase()}
          </MAvatar>
        </IconButton>
      </Tooltip>
      <UserMenu
        anchorUserMenu={anchorUserMenu}
        isMenuOpen={isMenuOpen}
        handleCloseUserMenu={handleCloseUserMenu}
        openDialogByName={openDialogByName}
        closeDialog={closeDialog}
        openDialogName={openDialogName}
        menuList={menuList}
      />
    </>
  )
}
export default AdminTopBarMenuItems
