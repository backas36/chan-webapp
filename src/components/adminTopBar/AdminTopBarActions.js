import { Lock } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectIsLogin } from "../../features/authentication"
import { ToggleLang } from "../../features/lang"
import { AdminTopBarMenuItems } from "../../features/me"
import { ToggleTheme } from "../../features/ui"
import MAvatar from "../Avatar/MAvatar"
import { MBox } from "../FrontTopBar/styled"

const AdminTopBarActions = ({ children }) => {
  const navigate = useNavigate()
  const isLogin = useSelector(selectIsLogin)

  return (
    <MBox>
      <ToggleLang />
      <ToggleTheme />
      {isLogin ? (
        <AdminTopBarMenuItems>{children}</AdminTopBarMenuItems>
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
export default AdminTopBarActions
