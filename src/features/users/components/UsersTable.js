import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BaseTable from "../../../components/table/BaseTable"
import useUsersTableColumns from "../hooks/useUsersTableColumns"
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
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
} from "../services/usersSlice"

const UsersTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usersTableConfig = useSelector(selectUsersTableConfig)
  const { page, pageSize, sort, search, filters } = usersTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useUsersTableColumns()

  const {
    data: usersData,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({
    n: pageSize,
    s: startIndex,
    order,
    filters,
    q: search,
  })
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation()

  const handleUpdateUser = async (processRow) => {
    try {
      return await updateUser(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }

  const handleResetTable = () => {
    dispatch(resetUsersTable())
    refetch()
  }

  const tableConfig = {
    rows: usersData?.data || [],
    columns: tableColumns,
    loading: isLoading || updateLoading,
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
    rowModesModel: useSelector(selectRowModesModel),
    handleUpdate: handleUpdateUser,
    handleCreate: () => navigate("/admin/create-user"),
  }

  return <BaseTable tableConfig={tableConfig} />
}
export default UsersTable
