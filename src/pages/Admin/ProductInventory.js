import { useTranslation } from "react-i18next"
import PoInventoryTable from "../../features/productInventory/components/PoInventoryTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const ProductInventory = () => {
  const { t } = useTranslation()
  useTitle(t("Product Inventory"))
  return (
    <MainWrapper>
      <PageWrapper title={t("managePoInventory")}>
        <PoInventoryTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default ProductInventory
