import { Launch } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const LinkBtn = ({ linkName, linkPath }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate(linkPath)}
      size="small"
      startIcon={<Launch color="primary" />}
    >
      {t(linkName)}
    </Button>
  )
}
export default LinkBtn
