import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import BaseTable from "../../../components/Table/BaseTable"
import { profileSchema } from "../../me"
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
  setInputError,
  setPage,
  setPageSize,
  setRowModesModel,
  setSearch,
  setSort,
} from "../services/usersSlice"

const UsersTable = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const usersTableConfig = useSelector(selectUsersTableConfig)
  const { page, pageSize, sort, search, filters, inputError } = usersTableConfig

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

  const handleUpdateUser = async (processRow, oldRow) => {
    try {
      const valid = await profileSchema(false, true).validate(processRow, {
        abortEarly: false,
      })
      if (valid) {
        return await updateUser(processRow).unwrap()
      } else {
        return Promise.reject(false)
      }
    } catch (err) {
      const { errors } = err
      dispatch(setInputError(errors))
      return Promise.reject(false)
    }
  }

  const handleResetTable = () => {
    dispatch(resetUsersTable())
    refetch()
  }

  const tableConfig = {
    rows: usersData?.data,
    columns: tableColumns,
    isLoading: isLoading || !usersData?.data || updateLoading,
    totalLength: usersData?.totalLength,
    rowError: inputError,
    rowsPerPageOptions: [15, 30, 45],
    page,
    pageSize,
    handlePageChange: (newPage) => dispatch(setPage(newPage)),
    handlePageSizeChange: (newSize) => {
      console.log(newSize)
      dispatch(setPageSize(newSize))
    },
    handleSortChange: (newSort) => dispatch(setSort(newSort)),
    handleFiltersChange: (newFilter) => dispatch(setFilters(newFilter)),
    handleSearch: (value) => {
      dispatch(setSearch(value))
    },
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
