import { Toolbar, Box, AppBar } from "@mui/material"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { selectIsSideBarOpen } from "../../features/ui"
import AdminSideBar from "./AdminSideBar"
import { AdminTopBarMenu } from "../../features/me"
import { MuiDrawer } from "./styled"

const AdminTopBar = () => {
  const isSideBarOpen = useSelector(selectIsSideBarOpen)

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={isSideBarOpen}>
        <AdminTopBarMenu />
      </AppBar>

      <MuiDrawer
        PaperProps={{
          sx: {
            backgroundColor: (theme) => {
              if (theme.palette.mode === "light") {
                return theme.palette.primary.light
              }
              return theme.palette.secondary.dark
            },
          },
        }}
        variant="permanent"
        open={isSideBarOpen}
      >
        <AdminSideBar />
      </MuiDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 3,
          py: 6,
        }}
      >
        <Toolbar
        //sx={{ mb: "30px" }}
        />
        <Outlet />
      </Box>
    </Box>
  )
}
export default AdminTopBar
