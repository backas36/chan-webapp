import { Box } from "@mui/system"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import BackBtn from "../../components/buttons/BackBtn"
import NotFound from "../../components/notify/NotFound"
import RecipeTable from "../../features/recipes/components/RecipeTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Recipes = () => {
  const { t } = useTranslation()
  const { state } = useLocation()
  const productId = state?.productId
  useTitle(t("Recipe"))
  if (!productId) {
    return <NotFound />
  }
  return (
    <MainWrapper>
      <PageWrapper title={t("manageRecipe")}>
        <BackBtn />
        <RecipeTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Recipes
