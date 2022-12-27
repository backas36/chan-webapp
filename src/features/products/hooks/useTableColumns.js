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
import { selectCurrentUser } from "../../me"
import { useGetAllPoCategoriesQuery } from "../../productCategory/services/poCaApiSlice"
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

  const { data: poCaData } = useGetAllPoCategoriesQuery(null, {
    refetchOnMountOrArgChange: true,
  })

  const poCategories = poCaData?.data

  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )

  const tableColumns = useMemo(() => {
    let columns = poCategories
      ? [
          {
            field: "name",
            headerName: t("ingredientName"),
            width: 180,
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
            valueOptions:
              poCategories && poCategories.map((category) => category.name),
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
            field: "variant",
            headerName: t("variant"),
            width: 160,
            editable: true,
            filterable: true,
            renderCell: renderCellExpand,
            filterOperators: getGridStringOperators().filter(
              (operator) => operator.value === "equals"
            ),
            preProcessEditCellProps: (params) =>
              preProcessCell(params, "variant"),
          },
          {
            field: "fixedPrice",
            headerName: t("fixedPrice"),
            width: 120,
            type: "number",
            headerAlign: "left",
            editable: true,
            filterable: true,
            renderCell: renderCellExpand,
            filterOperators: getGridNumericOperators().filter(
              (operator) => operator.value === "="
            ),
            preProcessEditCellProps: (params) =>
              preProcessCell(params, "fixedPrice"),
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
            width: 130,
            type: "actions",
            renderCell: (params) => renderActions(params),
          },
          ...columns,
        ]
      : columns
  }, [t, isAllowedEdit, poCategories])
  return tableColumns
}
export default useTableColumns
