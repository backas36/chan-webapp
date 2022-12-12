import { Menu as MenuIcon } from "@mui/icons-material"
import { Box, IconButton, MenuItem, Menu, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const FrontTopBarXs = (props) => {
  const { t } = useTranslation()
  const { handleOpenNavMenu, handleCloseNavMenu, anchorElNav, pages } = props

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
          <MenuIcon fontSize="large" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => {
            return (
              <MenuItem
                key={page.path}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{t(page.name)}</Typography>
              </MenuItem>
            )
          })}
        </Menu>
      </Box>
    </>
  )
}
export default FrontTopBarXs
