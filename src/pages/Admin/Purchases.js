import { Help } from "@mui/icons-material"
import { Alert, AlertTitle, IconButton } from "@mui/material"
import { useTranslation } from "react-i18next"
import LinkBtn from "../../components/buttons/LinkBtn"
import MDialog from "../../components/dialog/MDialog"
import PurchasesTable from "../../features/purchases/components/PurchasesTable"
import useTitle from "../../hooks/useTitle"
import useToggle from "../../hooks/useToggle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Purchases = () => {
  const { t } = useTranslation()
  const { visible, setToggleStatus } = useToggle(false)

  useTitle(t("Purchases"))
  return (
    <MainWrapper>
      <PageWrapper
        title={t("managePurchases")}
        extraComp={
          <MDialog
            open={visible}
            handleClose={() => setToggleStatus(false)}
            title={t("help")}
            dialogBtn={
              <IconButton onClick={() => setToggleStatus(true)} color="success">
                <Help />
              </IconButton>
            }
          >
            <Alert severity="info">
              <AlertTitle>{t("info")}</AlertTitle>
              {t("ingredientNameHelpDesc")}
              <br />
              <LinkBtn linkName="Suppliers" linkPath="/admin/suppliers" />
              <LinkBtn linkName="Ingredients" linkPath="/admin/ingredients" />
            </Alert>
          </MDialog>
        }
      >
        <PurchasesTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Purchases
