import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"

import { useDispatch, useSelector } from "react-redux"
import { selectIsDarkMode, toggleThemeMode } from ".."
import MAvatar from "../../../components/avatar/MAvatar"

const ToggleTheme = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(selectIsDarkMode)
  return (
    <Tooltip title="toggle theme mode">
      <IconButton onClick={() => dispatch(toggleThemeMode())}>
        <MAvatar sx={{ width: 36, height: 36 }}>
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </MAvatar>
      </IconButton>
    </Tooltip>
  )
}
export default ToggleTheme
