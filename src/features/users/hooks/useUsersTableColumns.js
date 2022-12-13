import {
  getGridSingleSelectOperators,
  getGridStringOperators,
} from "@mui/x-data-grid"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import MAvatar from "../../../components/Avatar/MAvatar"
import renderCellExpand from "../../../components/Table/renderCellExpand"
import renderDateCell from "../../../components/Table/renderDateCell"
import {
  AUTH_OPTIONS,
  getAllowRoles,
  USER_ROLES,
  USER_STATUS,
} from "../../../utils/constants"
import { formatDate, formatDateTime } from "../../../utils/dateTimeManger"
import { selectCurrentUser } from "../../me"
import renderUsersActions from "../components/renderUsersActions"

const useUsersTableColumns = () => {
  const { t } = useTranslation()
  const currentUser = useSelector(selectCurrentUser)

  const isAllowedEdit = useMemo(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )
  const tableColumns = useMemo(() => {
    return [
      {
        field: "actions",
        headerName: t("actions"),
        width: 130,
        type: "actions",
        renderCell: (params) => renderUsersActions(params),
      },
      {
        field: "photoUrl",
        headerName: t("avatar"),
        width: 100,
        renderCell: (params) => {
          return (
            <MAvatar src={params?.row?.photoUrl || ""}>
              {!params?.row?.photoUrl &&
                params?.row?.name.charAt(0).toUpperCase()}
            </MAvatar>
          )
        },
        sortable: false,
        filterable: false,
      },
      {
        field: "name",
        headerName: t("name"),
        width: 150,
        editable: isAllowedEdit,
        filterable: false,
        renderCell: renderCellExpand,
      },
      {
        field: "email",
        headerName: t("email"),
        width: 250,
        filterable: false,
        renderCell: renderCellExpand,
      },
      {
        field: "role",
        headerName: t("role"),
        valueOptions: Object.values(USER_ROLES).map((value) => {
          return {
            label: value.toUpperCase(),
            value,
          }
        }),
        width: 120,
        type: "singleSelect",
        editable: isAllowedEdit,
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
      },
      {
        field: "status",
        headerName: t("status"),
        width: 80,
        type: "singleSelect",
        valueOptions: Object.values(USER_STATUS).map((value) => {
          return {
            label: value.toUpperCase(),
            value,
          }
        }),
        editable: isAllowedEdit,
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
      },
      {
        field: "birthDate",
        headerName: t("dob"),
        width: 170,
        editable: isAllowedEdit,
        resizable: false,
        type: "date",
        renderEditCell: renderDateCell,
        valueFormatter: (params) => {
          const birthDate = params.value
          return birthDate ? formatDate(birthDate) : "-"
        },
        filterable: false,
      },
      {
        field: "mobile",
        headerName: t("mobile"),
        width: 170,
        editable: isAllowedEdit,
        filterable: false,
        renderCell: renderCellExpand,
      },
      {
        field: "lineId",
        headerName: t("lineId"),
        width: 170,
        editable: isAllowedEdit,
        filterable: false,
        renderCell: renderCellExpand,
      },
      {
        field: "address",
        headerName: t("address"),
        width: 170,
        editable: isAllowedEdit,
        filterable: false,
        renderCell: renderCellExpand,
      },
      {
        field: "identityType",
        headerName: t("identityType"),
        width: 120,
        type: "singleSelect",
        valueOptions: Object.values(AUTH_OPTIONS).map((value) => {
          return {
            label: value.toUpperCase(),
            value,
          }
        }),
        filterOperators: getGridSingleSelectOperators().filter(
          (operator) => operator.value === "is"
        ),
      },
      {
        field: "lastLoginAt",
        headerName: t("lastLoginAt"),
        width: 150,
        type: "dateTime",
        valueFormatter: (params) => {
          const lastLoginAt = params.value
          return lastLoginAt ? formatDateTime(lastLoginAt) : "-"
        },
        filterable: false,
      },
      {
        field: "createdAt",
        headerName: t("userCreatedAt"),
        width: 150,
        filterable: false,
        renderCell: (params) => formatDateTime(params?.row.createdAt),
      },
    ]
  }, [t, isAllowedEdit])
  return tableColumns
}
export default useUsersTableColumns
