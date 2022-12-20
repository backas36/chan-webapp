import { useTranslation } from "react-i18next"
import SuppliersTable from "../../features/suppliers/components/SuppliersTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Suppliers = () => {
  const { t } = useTranslation()
  useTitle(t("Suppliers"))
  return (
    <MainWrapper>
      <PageWrapper title={t("manageSuppliers")}>
        <SuppliersTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Suppliers
