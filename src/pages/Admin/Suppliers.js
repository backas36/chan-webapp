import { useTranslation } from "react-i18next"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Suppliers = () => {
  const { t } = useTranslation()
  useTitle(t("Suppliers"))
  return (
    <MainWrapper>
      <PageWrapper title={t("manageSuppliers")}>
        {/*<UsersTable />*/}
        suppliers
      </PageWrapper>
    </MainWrapper>
  )
}
export default Suppliers
