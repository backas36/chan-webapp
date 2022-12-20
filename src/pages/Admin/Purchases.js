import { useTranslation } from "react-i18next"
import PurchasesTable from "../../features/purchases/components/PurchasesTable"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Purchases = () => {
  const { t } = useTranslation()
  useTitle(t("Purchases"))
  return (
    <MainWrapper>
      <PageWrapper title={t("managePurchases")}>
        <PurchasesTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Purchases
