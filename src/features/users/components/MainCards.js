import { Groups, Group } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

import PageLoading from "../../../layout/PageLoading"
import { useGetAllUsersQuery } from "../services/usersApiSlice"
import MCard from "../../../components/Card/MCard"
import StockChart from "./StockChart"
import { useTranslation } from "react-i18next"

const cardIconStyle = {
  height: 100,
  width: 100,
  //opacity: 0.8,
  mr: 1,
  color: "secondary.dark",
}

const MainCards = () => {
  const { t } = useTranslation()
  const {
    data: usersResponse,
    isLoading,
    isSuccess,
  } = useGetAllUsersQuery(null, {
    //pollingInterval: 15000,
    //refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) {
    content = <PageLoading />
  }

  if (isSuccess) {
    const usersTotal = usersResponse?.totalLength
    content = (
      <>
        <Grid item sm={12} md={6} sx={{ width: "100%" }}>
          <MCard title={t("totalUsers")}>
            <Group sx={cardIconStyle} />
            <Typography variant="h3">{usersTotal}</Typography>
          </MCard>
        </Grid>
        {/* TODO change to products */}
        <Grid item sm={12} md={6} sx={{ width: "100%" }}>
          <MCard title={t("totalProducts")}>
            <Groups sx={cardIconStyle} />
            <Typography variant="h3">10</Typography>
          </MCard>
        </Grid>
        {/* TODO change to ingredient */}
        <Grid item sm={12} md={6} sx={{ width: "100%" }}>
          <MCard title={t("totalIngredients")}>
            <Groups sx={cardIconStyle} />
            <Typography variant="h3">15</Typography>
          </MCard>
        </Grid>
        {/* TODO change to suppliers */}
        <Grid item sm={12} md={6} sx={{ width: "100%" }}>
          <MCard title={t("totalSuppliers")}>
            <Groups sx={cardIconStyle} />
            <Typography variant="h3">20</Typography>
          </MCard>
        </Grid>
        <Grid item sm={12} md={12} sx={{ width: "100%" }}>
          <MCard title={t("stocksChart")}>
            <StockChart />
          </MCard>
        </Grid>
      </>
    )
  }

  return content
}

export default MainCards
