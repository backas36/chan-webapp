import { Help } from "@mui/icons-material"
import { Alert, AlertTitle, IconButton } from "@mui/material"
import { useTranslation } from "react-i18next"
import LinkBtn from "../../components/buttons/LinkBtn"
import MDialog from "../../components/dialog/MDialog"
import ManagePoTable from "../../features/products/components/ManagePoTable"
import useTitle from "../../hooks/useTitle"
import useToggle from "../../hooks/useToggle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const ManageProducts = () => {
  const { t } = useTranslation()
  const { visible, setToggleStatus } = useToggle(false)

  useTitle(t("ManageProducts"))
  return (
    <MainWrapper>
      <PageWrapper
        title={t("ManageProducts")}
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
              {t("categoryNameHelpDesc")}
              <LinkBtn
                linkName="Product Categories"
                linkPath="/admin/product-categories"
              />
            </Alert>
          </MDialog>
        }
      >
        <ManagePoTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default ManageProducts
