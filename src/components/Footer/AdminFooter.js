import {
  AddBusiness,
  GroupAdd,
  HomeWork,
  ListAlt,
  PostAdd,
} from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"

const AdminFooter = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      >
        <BottomNavigation
          sx={{ background: (theme) => theme.palette.background.default }}
          showLabels
        >
          {/*<BottomNavigationAction label="Add Supplier" icon={<AddBusiness />} />*/}
          {/*<BottomNavigationAction label="Add ingredient" icon={<PostAdd />} />*/}
          <BottomNavigationAction
            label="Add User"
            icon={<ListAlt />}
            onClick={() => navigate("actions-log")}
            sx={{ color: (theme) => theme.palette.primary.main }}
          />
          <BottomNavigationAction
            label="Add User"
            icon={<GroupAdd />}
            onClick={() => navigate("users")}
            sx={{ color: (theme) => theme.palette.primary.main }}
          />
          <BottomNavigationAction
            label="Front View"
            icon={<HomeWork />}
            onClick={() => navigate("/")}
            sx={{ color: (theme) => theme.palette.primary.main }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
export default AdminFooter
