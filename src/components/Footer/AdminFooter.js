import { AddBusiness, HomeWork, PostAdd } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material"
import { Box } from "@mui/system"
import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"

const AdminFooter = () => {
  const navigate = useNavigate()
  const ref = useRef()

  return (
    <Box ref={ref}>
      {/*{
        {
          0: <div>Add supplier</div>,
          1: <div>Add ingredient</div>,
          2: <div>Go to Front Site</div>,
        }[0]
      }*/}
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
          value={0}
          onChange={(e, newValue) => {}}
        >
          <BottomNavigationAction label="Add Supplier" icon={<AddBusiness />} />
          <BottomNavigationAction label="Add ingredient" icon={<PostAdd />} />
          <BottomNavigationAction
            label="Front View"
            icon={<HomeWork />}
            onClick={() => navigate("/")}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
export default AdminFooter
