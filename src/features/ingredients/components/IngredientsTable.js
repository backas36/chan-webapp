import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import BaseTable from "../../../components/Table/BaseTable"
import useTableColumns from "../hooks/useTableColumns"
import {
  useAddIngredientMutation,
  useGetAllIngredientsQuery,
  useUpdateIngredientMutation,
} from "../services/ingredientApiSlice"
import {
  resetTable,
  selectIngredientsTableConfig,
  selectRowModesModel,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setRows,
  setSearch,
  setSort,
} from "../services/ingredientSlice"
import { formatData, initVal, validateIngredient } from "../utils"

const IngredientsTable = () => {
  const dispatch = useDispatch()
  const ingredientTableConfig = useSelector(selectIngredientsTableConfig)

  const { page, pageSize, sort, search, filters, rows } = ingredientTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useTableColumns()
  const {
    data: ingredientData,
    isLoading,
    refetch,
  } = useGetAllIngredientsQuery(
    {
      n: pageSize,
      s: startIndex,
      order,
      filters,
      q: search,
    },
    { refetchOnMountOrArgChange: true }
  )

  const [updateIngredient, { isLoading: updateLoading }] =
    useUpdateIngredientMutation()
  const [addIngredient, { isLoading: addLoading }] = useAddIngredientMutation()

  useEffect(() => {
    if (ingredientData) {
      dispatch(setRows({ isFirst: true, newRows: ingredientData.data } || []))
    }
  }, [dispatch, ingredientData])

  const handleUpdate = async (processRow) => {
    try {
      return await updateIngredient(processRow).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }

  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      try {
        const isValid = await validateIngredient(formatData(processRow))
        if (isValid) {
          await addIngredient(formatData(processRow)).unwrap()
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
    rowCount: ingredientData?.totalLength || 0,
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
export default IngredientsTable
