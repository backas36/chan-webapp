import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import useTableColumns from "../hooks/useTableColumns"
import {
  useAddProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../services/productApiSlice"
import {
  resetTable,
  selectProductsTableConfig,
  selectRowModesModel,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setRows,
  setSearch,
  setSort,
} from "../services/productSlice"
import { formatData, initVal, validateProduct } from "../utils"

const ManagePoTable = () => {
  const dispatch = useDispatch()
  const productTableConfig = useSelector(selectProductsTableConfig)

  const { page, pageSize, sort, search, filters, rows } = productTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useTableColumns()
  const {
    data: productsData,
    isLoading,
    refetch,
  } = useGetAllProductsQuery(
    {
      n: pageSize,
      s: startIndex,
      order,
      filters,
      q: search,
    },
    { refetchOnMountOrArgChange: true }
  )
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation()
  const [addProduct, { isLoading: addLoading }] = useAddProductMutation()

  useEffect(() => {
    if (productsData) {
      dispatch(setRows({ isFirst: true, newRows: productsData.data } || []))
    }
  }, [dispatch, productsData])

  const handleUpdate = async (processRow) => {
    try {
      return await updateProduct(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }

  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      try {
        const isValid = await validateProduct(formatData(processRow))
        if (isValid) {
          await addProduct(formatData(processRow)).unwrap()
        }
      } catch (err) {
        return Promise.reject(err.errors)
      }
    },
    initValue: initVal,
    fieldToFocus: "name",
  }

  const handleResetTable = (newRowModes) => {
    dispatch(resetTable(newRowModes))
    refetch()
  }
  const tableConfig = {
    rows,
    columns: tableColumns,
    loading: isLoading || updateLoading || addLoading,
    rowCount: productsData?.totalLength || 0,
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
export default ManagePoTable
