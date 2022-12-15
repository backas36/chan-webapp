import { AppBar, Toolbar } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import AdminSideBar from "../components/adminTopBar/AdminSideBar"
import { MuiDrawer } from "../components/adminTopBar/styled"
import { AdminTopBarMenu } from "../features/me"
import { selectIsSideBarOpen } from "../features/ui"

const AdminLayout = () => {
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
          pt: 6,
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
export default AdminLayout
