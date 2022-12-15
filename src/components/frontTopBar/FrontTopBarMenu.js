import { Favorite as Heart, ShoppingCart } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { Link } from "react-router-dom"

import MAvatar from "../Avatar/MAvatar"

const FrontTopBarMenu = ({ children }) => {
  return (
    <>
      <Tooltip title="toggle theme mode">
        <IconButton component={Link} to="cart">
          <MAvatar sx={{ width: 36, height: 36 }}>
            <ShoppingCart />
          </MAvatar>
        </IconButton>
      </Tooltip>
      <Tooltip title="Add to Wish List">
        <IconButton component={Link} to="favorite">
          <MAvatar sx={{ width: 36, height: 36 }}>
            <Heart />
          </MAvatar>
        </IconButton>
      </Tooltip>
      {children}
    </>
  )
}
export default FrontTopBarMenu
