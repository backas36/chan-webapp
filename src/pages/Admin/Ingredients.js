import { Help } from "@mui/icons-material"
import { Alert, AlertTitle, IconButton } from "@mui/material"
import { useTranslation } from "react-i18next"
import LinkBtn from "../../components/buttons/LinkBtn"
import MDialog from "../../components/dialog/MDialog"
import IngredientsTable from "../../features/ingredients/components/IngredientsTable"
import useTitle from "../../hooks/useTitle"
import useToggle from "../../hooks/useToggle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Ingredients = () => {
  const { t } = useTranslation()
  const { visible, setToggleStatus } = useToggle(false)
  useTitle(t("Ingredients"))
  return (
    <MainWrapper>
      <PageWrapper
        title={t("manageIngredient")}
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
                linkName="Ingredient Categories"
                linkPath="/admin/ingredient-categories"
              />
            </Alert>
          </MDialog>
        }
      >
        <IngredientsTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Ingredients
