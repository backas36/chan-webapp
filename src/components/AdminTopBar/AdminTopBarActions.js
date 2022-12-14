import { Lock } from "@mui/icons-material"
import { Box } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectIsLogin } from "../../features/authentication"
import { ToggleLang } from "../../features/lang"
import { AdminTopBarMenuItems } from "../../features/me"
import { ToggleTheme } from "../../features/ui"
import MAvatar from "../Avatar/MAvatar"

const AdminTopBarActions = ({ children }) => {
  const navigate = useNavigate()
  const isLogin = useSelector(selectIsLogin)

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <ToggleLang />
      <ToggleTheme />
      {isLogin ? (
        <AdminTopBarMenuItems>{children}</AdminTopBarMenuItems>
      ) : (
        <MAvatar
          sx={{
            width: 36,
            height: 36,
            cursor: "pointer",
          }}
          onClick={() => navigate("/login")}
        >
          <Lock />
        </MAvatar>
      )}
    </Box>
  )
}
export default AdminTopBarActions
