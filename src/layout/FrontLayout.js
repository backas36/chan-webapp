import { useState } from "react"
import { Favorite as Heart, ShoppingCart } from "@mui/icons-material"
import {
  Toolbar,
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material"
import { Link, Outlet } from "react-router-dom"

import FrontTopBarXs from "../components/FrontTopBar/FrontTopBarXs"
import FrontTopBarHome from "../components/FrontTopBar/FrontTopBarHome"
import FrontTopBarMd from "../components/FrontTopBar/FrontTopBarMd"
import FrontTopBarActions from "../components/FrontTopBar/FrontTopBarActions"
import MAvatar from "../components/Avatar/MAvatar"

const pages = [
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Contacts",
    path: "/contacts",
  },
]
const FrontLayout = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MuiAppBar position="fixed">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Stack sx={{ flexFlow: "row", alignItems: "center" }}>
              <FrontTopBarXs
                pages={pages}
                handleOpenNavMenu={handleOpenNavMenu}
                handleCloseNavMenu={handleCloseNavMenu}
                anchorElNav={anchorElNav}
              />
              <FrontTopBarHome />
            </Stack>
            <FrontTopBarMd
              pages={pages}
              handleCloseNavMenu={handleCloseNavMenu}
            />

            <FrontTopBarActions />
          </Toolbar>
        </MuiAppBar>
      </Box>
      <Toolbar sx={{ mb: "30px" }} />
      <Outlet />
    </>
  )
}

export default FrontLayout
