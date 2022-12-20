import { useTranslation } from "react-i18next"
import IngredientsTable from "../../features/ingredients/components/IngredientsTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Ingredients = () => {
  const { t } = useTranslation()
  useTitle(t("Ingredients"))
  return (
    <MainWrapper>
      <PageWrapper title={t("manageIngredient")}>
        <IngredientsTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Ingredients
