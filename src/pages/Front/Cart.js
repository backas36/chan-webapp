import { Container } from "@mui/material"
import { useTranslation } from "react-i18next"
import useTitle from "../../hooks/useTitle"

const Cart = () => {
  const { t } = useTranslation()

  useTitle(t("Cart"))

  return (
    <Container maxWidth="lg" sx={{ pt: 6 }}>
      {/* Top sell */}
      {/* Category */}
      Carts
    </Container>
  )
}
export default Cart
