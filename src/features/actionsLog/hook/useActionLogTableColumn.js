import { getGridStringOperators } from "@mui/x-data-grid"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { formatDateTime } from "../../../utils/dateTimeManger"
import renderCellExpand from "../../../components/Table/renderCellExpand"

const useActionLogTableColumn = () => {
  const { t } = useTranslation()

  const tableColumns = useMemo(() => {
    return [
      {
        field: "relatedUserName",
        headerName: t("relatedUser"),
        width: 150,
        editable: false,
        filterable: true,
        sortable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "contains"
        ),
      },
      {
        field: "type",
        headerName: t("activityType"),
        width: 170,
        filterable: true,
        editable: false,
        sortable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "contains"
        ),
      },
      {
        field: "subject",
        headerName: t("activitySubject"),
        width: 250,
        filterable: true,
        editable: false,
        sortable: true,
        renderCell: renderCellExpand,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "contains"
        ),
      },
      {
        field: "content",
        headerName: t("activityContent"),
        width: 500,
        sortable: false,
        filterable: false,
        editable: false,
        renderCell: renderCellExpand,
        valueFormatter: (params) => {
          const content = params?.value
          return JSON.stringify(content)
        },
      },
      {
        field: "createdAt",
        headerName: t("activityCreatedAt"),
        width: 150,
        filterable: false,
        renderCell: (params) => formatDateTime(params?.row.createdAt),
      },
    ]
  }, [t])
  return tableColumns
}
export default useActionLogTableColumn
