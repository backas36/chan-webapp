import { Work } from "@mui/icons-material"
import {
  ListItemIcon,
  MenuItem,
  Typography,
  ListItemText as MListItemText,
} from "@mui/material"
import { styled } from "@mui/system"
import { useSelector } from "react-redux"

import { selectCurrentUser } from "../services/meSlice"

const ListItemText = styled(MListItemText)(({ theme }) => {
  return {
    "& span": {
      color:
        theme.mode === "light"
          ? theme.palette.primary.dark
          : theme.palette.primary.light,
    },
    "& > span": {
      fontWeight: 700,
    },
  }
})

const WorkIcon = styled(Work)(({ theme }) => {
  return {
    color:
      theme.mode === "light"
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  }
})

const MenuUserInfo = () => {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <MenuItem sx={{ cursor: "none" }}>
      <ListItemIcon>
        <WorkIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={`Hi, ${currentUser?.name}`}
        secondary={
          <>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
            >
              {currentUser?.email}
            </Typography>
          </>
        }
      />
    </MenuItem>
  )
}
export default MenuUserInfo
