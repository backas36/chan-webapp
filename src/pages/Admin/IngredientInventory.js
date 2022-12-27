import { useTranslation } from "react-i18next"
import InInventoryTable from "../../features/IngredientInventory/components/InInventoryTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const IngredientInventory = () => {
  const { t } = useTranslation()
  useTitle(t("Ingredient Inventory"))
  return (
    <MainWrapper>
      <PageWrapper title={t("manageInInventory")}>
        <InInventoryTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default IngredientInventory
