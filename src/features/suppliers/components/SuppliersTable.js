import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import useSuppliersTableColumns from "../hooks/useSuppliersTableColumns"
import {
  useAddSupplierMutation,
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
  setRows,
  setSearch,
  setSort,
} from "../services/suppliersSlice"
import { initSupplierVal } from "../utils/initSupplierVal"
import { validateSupplier } from "../utils/schema"

const SuppliersTable = () => {
  const dispatch = useDispatch()
  const suppliersTableConfig = useSelector(selectSuppliersTableConfig)
  const { page, pageSize, sort, search, filters, rows } = suppliersTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useSuppliersTableColumns()

  const {
    data: suppliersData,
    isLoading,
    refetch,
  } = useGetAllSuppliersQuery(
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
    if (suppliersData) {
      dispatch(setRows(suppliersData.data || []))
    }
  }, [suppliersData, dispatch])

  const [updateSupplier, { isLoading: updateLoading }] =
    useUpdateSupplierMutation()
  const [createSupplier, { isLoading: createLoading }] =
    useAddSupplierMutation()

  const handleUpdateSupplier = async (processRow) => {
    try {
      return await updateSupplier(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }
  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      const newSupplier = {
        name: processRow.name,
        type: processRow.type,
        contact: processRow.contact,
        location: processRow.location,
      }
      try {
        const isValid = await validateSupplier(newSupplier)
        if (isValid) {
          await createSupplier(newSupplier).unwrap()
        }
      } catch (err) {
        return Promise.reject(err.errors)
      }
    },
    initValue: initSupplierVal,
    fieldToFocus: "name",
  }
  const handleResetTable = (newRowModes) => {
    dispatch(resetTable(newRowModes))
    refetch()
  }
  const tableConfig = {
    rows,
    columns: tableColumns,
    loading: isLoading || updateLoading || createLoading,
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
    setRows: (rows) => dispatch(setRows(rows)),
    handleCreate: handleCreateHelper,
  }

  return <BaseTable tableConfig={tableConfig} />
}
export default SuppliersTable
