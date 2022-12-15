import { Translate } from "@mui/icons-material"
import { IconButton, Tooltip } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"

import MAvatar from "../../../components/avatar/MAvatar"
import { selectLang, setLang } from "../services/langSlice"

const ToggleLang = () => {
  const dispatch = useDispatch()
  const lang = useSelector(selectLang)

  return (
    <Tooltip title="Change Language">
      <IconButton
        onClick={() => {
          dispatch(setLang(lang === "en" ? "zh-TW" : "en"))
        }}
      >
        <MAvatar sx={{ width: 36, height: 36 }}>
          <Translate />
        </MAvatar>
      </IconButton>
    </Tooltip>
  )
}
export default ToggleLang
