import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import useTableColumns from "../hooks/useTableColumns"
import {
  useAddPurchaseMutation,
  useGetAllPurchasesQuery,
  useUpdatePurchaseMutation,
} from "../services/purchasesApiSlice"
import {
  resetTable,
  selectPurchasesTableConfig,
  selectRowModesModel,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setRows,
  setSearch,
  setSort,
} from "../services/purchasesSlice"
import { formatData, initVal, validatePurchase } from "../utils"

const PurchasesTable = () => {
  const dispatch = useDispatch()
  const purchaseTableConfig = useSelector(selectPurchasesTableConfig)

  const { page, pageSize, sort, search, filters, rows } = purchaseTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`
  const tableColumns = useTableColumns()
  const {
    data: purchasesData,
    isLoading,
    refetch,
  } = useGetAllPurchasesQuery(
    {
      n: pageSize,
      s: startIndex,
      order,
      filters,
      q: search,
    },
    { refetchOnMountOrArgChange: true }
  )

  const [updatePurchase, { isLoading: updateLoading }] =
    useUpdatePurchaseMutation()
  const [addPurchase, { isLoading: addLoading }] = useAddPurchaseMutation()

  useEffect(() => {
    if (purchasesData) {
      dispatch(setRows({ isFirst: true, newRows: purchasesData.data } || []))
    }
  }, [dispatch, purchasesData])

  const handleUpdate = async (processRow) => {
    try {
      return await updatePurchase(formatData(processRow)).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }

  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      try {
        const isValid = await validatePurchase(formatData(processRow))
        if (isValid) {
          await addPurchase(formatData(processRow)).unwrap()
        }
      } catch (err) {
        return Promise.reject(err.errors)
      }
    },
    initValue: initVal,
    fieldToFocus: "supplierId",
  }

  const handleResetTable = (newRowModes) => {
    dispatch(resetTable(newRowModes))
    refetch()
  }
  const tableConfig = {
    rows,
    columns: tableColumns,
    loading: isLoading || updateLoading || addLoading,
    rowCount: purchasesData?.totalLength || 0,
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
    handleUpdate,
    setRows: (rows) => dispatch(setRows(rows)),
    handleCreate: handleCreateHelper,
  }
  return <BaseTable tableConfig={tableConfig} />
}
export default PurchasesTable
