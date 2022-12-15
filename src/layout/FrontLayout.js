import { useState } from "react"
import { Toolbar, AppBar as MuiAppBar, Box, Stack } from "@mui/material"
import { Outlet } from "react-router-dom"

import FrontTopBarXs from "../components/frontTopBar/FrontTopBarXs"
import FrontTopBarHome from "../components/frontTopBar/FrontTopBarHome"
import FrontTopBarMd from "../components/frontTopBar/FrontTopBarMd"
import FrontTopBarActions from "../components/frontTopBar/FrontTopBarActions"

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
