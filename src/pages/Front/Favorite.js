import { Container } from "@mui/material"
import { useTranslation } from "react-i18next"
import NotFound from "../../components/notify/NotFound"
import useTitle from "../../hooks/useTitle"

const Favorite = () => {
  const { t } = useTranslation()

  useTitle(t("favorite"))

  return (
    <Container maxWidth="lg" sx={{ pt: 6 }}>
      {/* Top sell */}
      {/* Category */}
      Favorite
      <NotFound />
    </Container>
  )
}
export default Favorite
