import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import useTableColumns from "../hooks/useTableColumns"
import {
  useAddPoCategoryMutation,
  useGetAllPoCategoriesQuery,
  useUpdatePoCategoryMutation,
} from "../services/poCaApiSlice"
import {
  resetTable,
  selectPoCategoriesTableConfig,
  selectRowModesModel,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setRows,
  setSearch,
  setSort,
} from "../services/poCaSlice"
import { formatData, initVal, validatePoCategory } from "../utils"

const PoCaTable = () => {
  const dispatch = useDispatch()
  const poCategoryTableConfig = useSelector(selectPoCategoriesTableConfig)
  const { page, pageSize, sort, search, filters, rows } = poCategoryTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useTableColumns()

  const {
    data: poCateData,
    isLoading,
    refetch,
  } = useGetAllPoCategoriesQuery(
    {
      n: pageSize,
      s: startIndex,
      order,
      filters,
      q: search,
    },
    { refetchOnMountOrArgChange: true }
  )
  const [updatePoCategory, { isLoading: updateLoading }] =
    useUpdatePoCategoryMutation()
  const [addPoCategory, { isLoading: createLoading }] =
    useAddPoCategoryMutation()

  useEffect(() => {
    if (poCateData) {
      dispatch(setRows({ isFirst: true, newRows: poCateData.data } || []))
    }
  }, [dispatch, poCateData])

  const handleUpdate = async (processRow) => {
    try {
      return await updatePoCategory(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }
  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      try {
        const isValid = await validatePoCategory(formatData(processRow))
        if (isValid) {
          await addPoCategory(formatData(processRow)).unwrap()
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
    loading: isLoading || updateLoading || createLoading,
    rowCount: poCateData?.totalLength || 0,
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
export default PoCaTable
