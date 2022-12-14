import { Container } from "@mui/material"
import { useTranslation } from "react-i18next"
import useTitle from "../../hooks/useTitle"

const Favorite = () => {
  const { t } = useTranslation()

  useTitle(t("favorite"))

  return (
    <Container maxWidth="lg" sx={{ pt: 6 }}>
      {/* Top sell */}
      {/* Category */}
      Favorite
    </Container>
  )
}
export default Favorite
