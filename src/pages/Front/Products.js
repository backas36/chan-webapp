import { Container } from "@mui/material"
import { useTranslation } from "react-i18next"
import NotFound from "../../components/notify/NotFound"
import useTitle from "../../hooks/useTitle"

const Products = () => {
  const { t } = useTranslation()
  useTitle(t("Products"))

  return (
    <Container maxWidth="lg" sx={{ pt: 6 }}>
      {/* Top sell */}
      {/* Category */}
      <NotFound />
    </Container>
  )
}
export default Products
