import { Groups, Group } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

import PageLoading from "../../../layout/PageLoading"
import { useGetAllUsersQuery } from "../services/usersApiSlice"
import MCard from "../../../components/Card/MCard"
import InventoryChart from "./InventoryChart"
import { useTranslation } from "react-i18next"
import { useGetAllProductsQuery } from "../../products/services/productApiSlice"
import { useGetAllIngredientsQuery } from "../../ingredients/services/ingredientApiSlice"
import { useGetAllSuppliersQuery } from "../../suppliers/services/suppliersApiSlice"

const cardIconStyle = {
  height: 100,
  width: 100,
  //opacity: 0.8,
  mr: 1,
  color: "secondary.dark",
}

const MainCards = () => {
  const { t } = useTranslation()
  const { data: usersResponse } = useGetAllUsersQuery(
    { n: 1 },
    {
      pollingInterval: 1000 * 60 * 10,
      //refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  )
  const { data: productsData } = useGetAllProductsQuery(
    {
      n: 15,
      s: 0,
    },
    {
      pollingInterval: 1000 * 60 * 10,
      refetchOnMountOrArgChange: true,
    }
  )
  const { data: ingredientData } = useGetAllIngredientsQuery(
    {
      n: 15,
      s: 0,
    },
    {
      pollingInterval: 1000 * 60 * 10,
      refetchOnMountOrArgChange: true,
    }
  )
  const { data: suppliersData } = useGetAllSuppliersQuery(
    {
      n: 15,
      s: 0,
    },
    {
      pollingInterval: 1000 * 60 * 10,
      refetchOnMountOrArgChange: true,
    }
  )

  const usersTotal = usersResponse?.totalLength
  const productTotal = productsData?.totalLength
  const ingredientTotal = ingredientData?.totalLength
  const supplierTotal = suppliersData?.totalLength
  return (
    <>
      <Grid item sm={12} md={6} sx={{ width: "100%" }}>
        <MCard title={t("totalUsers")}>
          <Group sx={cardIconStyle} />
          <Typography variant="h3">{usersTotal ? usersTotal : "-"}</Typography>
        </MCard>
      </Grid>
      {/* TODO change to products */}
      <Grid item sm={12} md={6} sx={{ width: "100%" }}>
        <MCard title={t("totalProducts")}>
          <Groups sx={cardIconStyle} />
          <Typography variant="h3">
            {productTotal ? productTotal : "-"}
          </Typography>
        </MCard>
      </Grid>
      {/* TODO change to ingredient */}
      <Grid item sm={12} md={6} sx={{ width: "100%" }}>
        <MCard title={t("totalIngredients")}>
          <Groups sx={cardIconStyle} />
          <Typography variant="h3">
            {ingredientTotal ? ingredientTotal : "-"}
          </Typography>
        </MCard>
      </Grid>
      {/* TODO change to suppliers */}
      <Grid item sm={12} md={6} sx={{ width: "100%" }}>
        <MCard title={t("totalSuppliers")}>
          <Groups sx={cardIconStyle} />
          <Typography variant="h3">
            {" "}
            {supplierTotal ? supplierTotal : "-"}
          </Typography>
        </MCard>
      </Grid>
      <Grid item sm={12} md={12} sx={{ width: "100%" }}>
        <MCard title={t("inventoryChart")}>
          <InventoryChart />
        </MCard>
      </Grid>
    </>
  )
}

export default MainCards
