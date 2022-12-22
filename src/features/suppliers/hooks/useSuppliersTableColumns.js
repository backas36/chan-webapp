import {
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
import renderSuppliersActions from "../components/renderSuppliersActions"
import { validateOneInSupplier } from "../utils"

const preProcessCell = async (params, validateField) => {
  const { props } = params
  try {
    await validateOneInSupplier(validateField, props.value)
  } catch (err) {
    return { ...props, error: true }
  }
  return { ...props, error: false }
}
const useSuppliersTableColumns = () => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectCurrentUser)

  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )
  const tableColumns = useMemo(() => {
    let columns = [
      {
        field: "name",
        headerName: t("supplierName"),
        width: 180,
        editable: true,
        filterable: true,
        renderCell: renderCellExpand,
        preProcessEditCellProps: (params) => preProcessCell(params, "name"),
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
      },
      {
        field: "type",
        headerName: t("supplierType"),
        valueOptions: ["online", "on site", "shopee", "FB", "others"],
        width: 150,
        type: "singleSelect",
        editable: true,
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
        preProcessEditCellProps: (params) => preProcessCell(params, "type"),
      },
      {
        field: "contact",
        headerName: t("contact"),
        width: 200,
        editable: true,
        filterable: true,
        renderCell: renderCellExpand,
        preProcessEditCellProps: (params) => preProcessCell(params, "contact"),
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "equals"
        ),
      },
      {
        field: "location",
        headerName: t("location"),
        width: 300,
        filterable: true,
        renderCell: renderCellExpand,
        editable: true,
        preProcessEditCellProps: (params) => preProcessCell(params, "location"),
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
    return isAllowedEdit()
      ? [
          {
            field: "actions",
            headerName: t("actions"),
            width: 100,
            type: "actions",
            renderCell: (params) => renderSuppliersActions(params),
          },
          ...columns,
        ]
      : columns
  }, [t, isAllowedEdit])

  return tableColumns
}
export default useSuppliersTableColumns
