import { useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import renderCellExpand from "../../../components/Table/renderCellExpand"
import { getAllowRoles } from "../../../utils/constants"
import { formatDateTime } from "../../../utils/dateTimeManger"
import { selectCurrentUser } from "../../me"
import renderSuppliersActions from "../components/renderSuppliersActions"

/**
 * 
 * @returns           if (filed === "name") {
                    }
                    if (filed === "type") {
                    }
                    if (filed === "location") {
                    }
                    if (filed === "contact") {
                    }
 */
const useSuppliersTableColumns = () => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectCurrentUser)

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
        renderCell: (params) => renderSuppliersActions(params),
      },
      {
        field: "name",
        headerName: t("supplierName"),
        width: 180,
        editable: isAllowedEdit,
        filterable: false,
        renderCell: renderCellExpand,
        //preProcessEditCellProps: async (params) =>
        //  preProcessCell(params, "name"),
      },
      {
        field: "type",
        headerName: t("supplierType"),
        valueOptions: ["online", "on site", "shopee", "others"],
        width: 150,
        type: "singleSelect",
        editable: isAllowedEdit,
        //filterOperators: getGridSingleSelectOperators().filter(
        //  (operator) => operator.value === "is"
        //),
        //preProcessEditCellProps: async (params) =>
        //  preProcessCell(params, "role"),
      },
      {
        field: "contact",
        headerName: t("contact"),
        width: 200,
        editable: isAllowedEdit,
        filterable: false,
        renderCell: renderCellExpand,
        //preProcessEditCellProps: async (params) =>
        //  preProcessCell(params, "name"),
      },
      {
        field: "location",
        headerName: t("location"),
        width: 300,
        filterable: false,
        renderCell: renderCellExpand,
        editable: isAllowedEdit,
      },
      {
        field: "createdAt",
        headerName: t("createdAt"),
        width: 150,
        filterable: false,
        renderCell: (params) => formatDateTime(params?.row.createdAt),
      },
    ]
  }, [t, isAllowedEdit])

  return tableColumns
}
export default useSuppliersTableColumns
