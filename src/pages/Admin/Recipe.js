import { useTranslation } from "react-i18next"
import RecipeTable from "../../features/recipe/components/RecipeTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Recipe = () => {
  const { t } = useTranslation()
  useTitle(t("Recipe"))
  return (
    <MainWrapper>
      <PageWrapper title={t("manageRecipe")}>
        <RecipeTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Recipe
