import { Container, Grid } from "@mui/material"

import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import MainCards from "../../features/users/components/MainCards"
import { RecentlyActionsCard } from "../../features/actionsLog"

const AdminMain = () => {
  useTitle("Dashboard")
  return (
    <MainWrapper>
      <Container maxWidth={false} sx={{ pb: (theme) => theme.spacing(8) }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item sm={12} spacing={2} md={8} container>
            <MainCards />
          </Grid>
          <Grid item sm={12} md={4} sx={{ width: "100%" }}>
            <RecentlyActionsCard />
          </Grid>
        </Grid>
      </Container>
    </MainWrapper>
  )
}
export default AdminMain
