import { useTranslation } from "react-i18next"
import InCaTable from "../../features/ingredientCategory/components/InCaTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const IngredientCategories = () => {
  const { t } = useTranslation()
  useTitle(t("Ingredient Categories"))
  return (
    <MainWrapper>
      <PageWrapper title={t("manageInCategories")}>
        <InCaTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default IngredientCategories
