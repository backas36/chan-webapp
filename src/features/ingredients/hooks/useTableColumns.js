import {
  getGridNumericOperators,
  getGridSingleSelectOperators,
  getGridStringOperators,
} from "@mui/x-data-grid"
import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import renderCellExpand from "../../../components/Table/renderCellExpand"
import { getAllowRoles } from "../../../utils/constants"
import { formatDateTime } from "../../../utils/dateTimeManger"
import { useGetAllInCategoriesQuery } from "../../ingredientCategory"
import { selectCurrentUser } from "../../me"
import renderActions from "../components/renderActions"
import { validateField } from "../utils"

const preProcessCell = async (params, field) => {
  const { props } = params
  try {
    await validateField(field, props.value)
  } catch (err) {
    return { ...props, error: true }
  }
  return { ...props, error: false }
}
const useTableColumns = () => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectCurrentUser)

  const { data: inCaData } = useGetAllInCategoriesQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const inCategories = inCaData?.data

  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )

  const tableColumns = useMemo(() => {
    let columns = inCategories
      ? [
          {
            field: "name",
            headerName: t("ingredientName"),
            width: 200,
            editable: true,
            filterable: true,
            renderCell: renderCellExpand,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === "equals"
            ),
            preProcessEditCellProps: (params) => preProcessCell(params, "name"),
          },
          {
            field: "category",
            headerName: t("categoryName"),
            width: 180,
            editable: true,
            type: "singleSelect",
            valueOptions: inCategories && inCategories.map((inCa) => inCa.name),
            filterOperators: getGridSingleSelectOperators().filter(
              (operator) => operator.value === "is"
            ),
            preProcessEditCellProps: (params) =>
              preProcessCell(params, "category"),
          },
          {
            field: "sku",
            headerName: t("sku"),
            width: 100,
            editable: true,
            filterable: true,
            renderCell: renderCellExpand,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === "equals"
            ),
            preProcessEditCellProps: (params) => preProcessCell(params, "sku"),
          },
          {
            field: "description",
            headerName: t("description"),
            width: 400,
            editable: true,
            filterable: false,
            renderCell: renderCellExpand,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === "equals"
            ),
          },
          {
            field: "createdAt",
            headerName: t("createdAt"),
            width: 150,
            filterable: false,
            renderCell: (params) => {
              const createdAt = params.value
              return createdAt ? formatDateTime(params?.row.createdAt) : "-"
            },
          },
        ]
      : []
    return isAllowedEdit()
      ? [
          {
            field: "actions",
            headerName: t("actions"),
            width: 100,
            type: "actions",
            renderCell: (params) => renderActions(params),
          },
          ...columns,
        ]
      : columns
  }, [t, isAllowedEdit, inCategories])
  return tableColumns
}
export default useTableColumns
