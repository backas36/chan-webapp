import { Lock } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectIsLogin } from "../../features/authentication"
import { ToggleLang } from "../../features/lang"
import { ToggleTheme } from "../../features/ui"
import MAvatar from "../avatar/MAvatar"
import { MBox } from "../frontTopBar/styled"

const TopBarActionsWrapper = ({ children }) => {
  const navigate = useNavigate()
  const isLogin = useSelector(selectIsLogin)

  return (
    <MBox>
      <ToggleLang />
      <ToggleTheme />
      {isLogin ? (
        { children }
      ) : (
        <MAvatar
          sx={{
            bgcolor: (theme) => theme.palette.success.dark,
          }}
          onClick={() => navigate("/login")}
        >
          <Lock />
        </MAvatar>
      )}
    </MBox>
  )
}
export default TopBarActionsWrapper
