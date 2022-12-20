import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import useInCaTableColumns from "../hooks/useInCaTableColumns"
import {
  useAddInCategoryMutation,
  useGetAllInCategoriesQuery,
  useUpdateInCategoryMutation,
} from "../services/inCaApiSlice"
import {
  resetTable,
  selectInCategoriesTableConfig,
  selectRowModesModel,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setRows,
  setSearch,
  setSort,
} from "../services/inCaSlice"
import { validateCategory, initVal, formatData } from "../utils"

const InCaTable = () => {
  const dispatch = useDispatch()
  const inCaTableConfig = useSelector(selectInCategoriesTableConfig)
  const { page, pageSize, sort, search, filters, rows } = inCaTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useInCaTableColumns()

  const {
    data: inCaData,
    isLoading,
    refetch,
  } = useGetAllInCategoriesQuery({
    n: pageSize,
    s: startIndex,
    order,
    filters,
    q: search,
  })
  const [updateInCategory, { isLoading: updateLoading }] =
    useUpdateInCategoryMutation()
  const [addInCategory, { isLoading: createLoading }] =
    useAddInCategoryMutation()

  useEffect(() => {
    if (inCaData) {
      console.log("🐑 ~ inCaData", inCaData)

      dispatch(setRows(inCaData.data || []))
    }
  }, [dispatch, inCaData])

  const handleUpdate = async (processRow) => {
    try {
      return await updateInCategory(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }
  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      try {
        const isValid = await validateCategory(formatData(processRow))
        if (isValid) {
          await addInCategory(formatData(processRow)).unwrap()
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
    rowCount: inCaData?.totalLength || 0,
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
export default InCaTable
