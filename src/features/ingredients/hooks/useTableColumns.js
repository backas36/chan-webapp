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

  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )

  const tableColumns = useMemo(() => {
    return [
      {
        field: "actions",
        headerName: t("actions"),
        width: 100,
        type: "actions",
        renderCell: (params) => renderActions(params),
      },
      {
        field: "name",
        headerName: t("ingredientName"),
        width: 180,
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        preProcessEditCellProps: async (params) =>
          preProcessCell(params, "name"),
      },
      {
        field: "category",
        headerName: t("categoryName"),
        width: 150,
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
        preProcessEditCellProps: async (params) =>
          preProcessCell(params, "category"),
        type: "singleSelect",
        valueOptions: inCaData?.data && inCaData?.data.map((inCa) => inCa.name),
      },
      {
        field: "brand",
        headerName: t("brand"),
        width: 150,
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        preProcessEditCellProps: async (params) =>
          preProcessCell(params, "brand"),
      },
      {
        field: "unit",
        headerName: t("unit"),
        width: 80,
        type: "number",
        headerAlign: "left",
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridNumericOperators().filter(
          (operator) => operator.value === "="
        ),
        preProcessEditCellProps: async (params) =>
          preProcessCell(params, "unit"),
      },
      {
        field: "size",
        headerName: t("size"),
        width: 100,
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        preProcessEditCellProps: async (params) =>
          preProcessCell(params, "size"),
      },
      {
        field: "sku",
        headerName: t("sku"),
        width: 100,
        editable: isAllowedEdit,
        filterable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
        preProcessEditCellProps: async (params) =>
          preProcessCell(params, "sku"),
      },
      {
        field: "description",
        headerName: t("description"),
        width: 200,
        editable: isAllowedEdit,
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
  }, [t, isAllowedEdit, inCaData])
  return tableColumns
}
export default useTableColumns
