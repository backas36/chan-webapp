import { useTranslation } from "react-i18next"
import ManagePoTable from "../../features/products/components/ManagePoTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const ManageProducts = () => {
  const { t } = useTranslation()
  useTitle(t("ManageProducts"))
  return (
    <MainWrapper>
      <PageWrapper title={t("ManageProducts")}>
        <ManagePoTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default ManageProducts
