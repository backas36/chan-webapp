import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import { USER_STATUS } from "../../../utils/constants"
import { initUserVal } from "../../me/utils/initUserVal"
import { validateAccount } from "../../me/utils/schema"
import useUsersTableColumns from "../hooks/useUsersTableColumns"
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useAddUserMutation,
} from "../services/usersApiSlice"
import {
  resetUsersTable,
  selectRowModesModel,
  selectUsersTableConfig,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setSearch,
  setSort,
  setRows,
} from "../services/usersSlice"

const UsersTable = () => {
  const dispatch = useDispatch()
  const rowModesModel = useSelector(selectRowModesModel)

  const usersTableConfig = useSelector(selectUsersTableConfig)
  const { page, pageSize, sort, search, filters, rows } = usersTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useUsersTableColumns()

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useGetAllUsersQuery(
    {
      n: pageSize,
      s: startIndex,
      order,
      filters,
      q: search,
    },
    { refetchOnMountOrArgChange: true }
  )

  useEffect(() => {
    if (usersData) {
      dispatch(setRows(usersData?.data))
    }
  }, [usersData, dispatch])
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation()
  const [createUser, { isLoading: createLoading }] = useAddUserMutation()

  const handleUpdateUser = async (processRow) => {
    try {
      return await updateUser(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }

  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      const newUser = {
        name: processRow.name,
        photoUrl: processRow.photoUrl,
        email: processRow.email,
        role: processRow.role,
        status: processRow.status,
        birthDate: processRow.birthDate,
        mobile: processRow.mobile,
        lineId: processRow.lineId,
        address: processRow.address,
      }
      try {
        const isValid = await validateAccount(newUser)
        if (isValid) {
          await createUser(newUser).unwrap()
        }
      } catch (err) {
        return Promise.reject(err.errors)
      }
    },
    initValue: initUserVal,
    fieldToFocus: "name",
  }

  const handleResetTable = (newRowModes) => {
    dispatch(resetUsersTable(newRowModes))
    refetch()
  }
  const tableConfig = {
    rows,
    columns: tableColumns,
    loading: isLoading || updateLoading || createLoading,
    rowCount: usersData?.totalLength || 0,
    rowsPerPageOptions: [15, 30, 45],
    page,
    pageSize,
    onPageChange: (newPage) => dispatch(setPage(newPage)),
    onPageSizeChange: (newSize) => dispatch(setPageSize(newSize)),
    handleSortChange: (newSort) => dispatch(setSort(newSort)),
    handleFilterChange: (newFilters) => dispatch(setFilters(newFilters)),
    handleSearch: (value) => dispatch(setSearch(value)),
    handleResetTableConfig: handleResetTable,
    onRowModesModelChange: (newModeModel) =>
      dispatch(setRowModesModel(newModeModel)),
    rowModesModel,
    handleUpdate: handleUpdateUser,
    handleCreate: handleCreateHelper,
    setRows: (rows) => dispatch(setRows(rows)),
    isCellEditable: (params) => {
      const { row, field, colDef, formattedValue } = params
      if (
        (field === "email" && !row.isNew) ||
        (field === "status" && formattedValue === USER_STATUS.temporary)
      ) {
        return false
      } else {
        return colDef.editable()
      }
    },
  }

  return <BaseTable tableConfig={tableConfig} />
}
export default UsersTable
