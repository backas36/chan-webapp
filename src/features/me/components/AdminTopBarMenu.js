import { Menu } from "@mui/icons-material"
import { Toolbar, Box, IconButton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import { selectIsSideBarOpen, toggleSideBar } from "../../ui"
import AdminTopBarActions from "../../../components/adminTopBar/AdminTopBarActions"
const AdminTopBarMenu = () => {
  const dispatch = useDispatch()
  const isSideBarOpen = useSelector(selectIsSideBarOpen)
  return (
    <Toolbar sx={{ px: { sm: "16px" } }}>
      <Box sx={{ mr: 1 }}>
        <IconButton
          sx={{
            padding: "16px",
            marginRight: { sm: 1, md: 4 },
            ...(isSideBarOpen && { display: "none" }),
          }}
          size="large"
          aria-label="open drawer"
          color="inherit"
          edge="start"
          onClick={() => dispatch(toggleSideBar())}
        >
          <Menu />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
        {/* TODO */}
        {/*<Typography variant="h6" component="h1" noWrap>
          <SearchBar />
        </Typography>*/}
      </Box>
      <AdminTopBarActions />
    </Toolbar>
  )
}
export default AdminTopBarMenu
