import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import useSuppliersTableColumns from "../hooks/useSuppliersTableColumns"
import {
  useGetAllSuppliersQuery,
  useUpdateSupplierMutation,
} from "../services/suppliersApiSlice"
import {
  resetTable,
  selectRowModesModel,
  selectSuppliersTableConfig,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setSearch,
  setSort,
} from "../services/suppliersSlice"

const SuppliersTable = () => {
  const dispatch = useDispatch()
  const suppliersTableConfig = useSelector(selectSuppliersTableConfig)
  const { page, pageSize, sort, search, filters } = suppliersTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useSuppliersTableColumns()

  const {
    data: suppliersData,
    isLoading,
    refetch,
  } = useGetAllSuppliersQuery({
    n: pageSize,
    s: startIndex,
    order,
    filters,
    q: search,
  })
  const [updateSupplier, { isLoading: updateLoading }] =
    useUpdateSupplierMutation()

  const handleUpdateSupplier = async (processRow) => {
    try {
      return await updateSupplier(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }
  const handleResetTable = () => {
    dispatch(resetTable())
    refetch()
  }
  const tableConfig = {
    rows: suppliersData?.data || [],
    columns: tableColumns,
    loading: isLoading || updateLoading,
    rowCount: suppliersData?.totalLength || 0,
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
    handleUpdate: handleUpdateSupplier,
    //handleCreate: () => navigate("/admin/create-user"),
  }

  return <BaseTable tableConfig={tableConfig} />
}
export default SuppliersTable
