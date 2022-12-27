import { useTranslation } from "react-i18next"
import PoCaTable from "../../features/productCategory/components/PoCaTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"
const ProductCategories = () => {
  const { t } = useTranslation()
  useTitle(t("Product Categories"))
  return (
    <MainWrapper>
      <PageWrapper title={t("managePoCategories")}>
        <PoCaTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default ProductCategories
