import { ArrowBack } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const BackBtn = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate(-1)}
      startIcon={<ArrowBack size="medium" color="primary" />}
    >
      {t("back")}
    </Button>
  )
}
export default BackBtn
