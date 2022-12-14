import { Grid } from "@mui/material"

import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import MainCards from "../../features/users/components/MainCards"
import { RecentlyActionsCard } from "../../features/actionsLog"
import PageWrapper from "../../layout/PageWrapper"
import { useTranslation } from "react-i18next"

const AdminMain = () => {
  const { t } = useTranslation()
  useTitle(t("Dashboard"))
  return (
    <MainWrapper>
      <PageWrapper title={t("Dashboard")}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item sm={12} spacing={2} md={8} container>
            <MainCards />
          </Grid>
          <Grid item sm={12} md={4} sx={{ width: "100%" }}>
            <RecentlyActionsCard />
          </Grid>
        </Grid>
      </PageWrapper>
    </MainWrapper>
  )
}
export default AdminMain
