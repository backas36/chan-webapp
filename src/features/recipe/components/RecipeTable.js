import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import BaseTable from "../../../components/Table/BaseTable"
import useTableColumns from "../hooks/useTableColumns"
import {
  useAddRecipeByPoIdMutation,
  useGetProductRecipesQuery,
  useUpdateRecipeMutation,
} from "../services/recipeApiSlice"
import {
  selectRecipesTableConfig,
  selectRowModesModel,
  setFilters,
  setPage,
  setPageSize,
  setRowModesModel,
  setRows,
  setSearch,
  setSort,
  resetTable,
} from "../services/recipeSlice"
import { formatData, initVal, validateRecipe } from "../utils"

const RecipeTable = () => {
  const { state } = useLocation()
  const productId = state?.productId
  const dispatch = useDispatch()
  const recipeTableConfig = useSelector(selectRecipesTableConfig)

  const { page, pageSize, sort, search, filters, rows } = recipeTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`
  const tableColumns = useTableColumns()
  const {
    data: recipesData,
    isLoading,
    refetch,
  } = useGetProductRecipesQuery(
    {
      productId,
      n: pageSize,
      s: startIndex,
      order,
      filters,
      q: search,
    },
    { refetchOnMountOrArgChange: true }
  )
  const [updateRecipe, { isLoading: updateLoading }] = useUpdateRecipeMutation()
  const [addRecipe, { isLoading: addLoading }] = useAddRecipeByPoIdMutation()

  useEffect(() => {
    if (recipesData) {
      dispatch(setRows({ isFirst: true, newRows: recipesData.data } || []))
    }
  }, [dispatch, recipesData])

  const handleUpdate = async (processRow) => {
    try {
      return await updateRecipe(
        formatData({ ...processRow, productId })
      ).unwrap()
    } catch (err) {
      return Promise.reject(false)
    }
  }

  const handleCreateHelper = {
    handleCreateUser: async (processRow) => {
      try {
        const isValid = await validateRecipe(
          formatData({ ...processRow, productId })
        )
        if (isValid) {
          await addRecipe(formatData({ ...processRow, productId })).unwrap()
        }
      } catch (err) {
        return Promise.reject(err.errors)
      }
    },
    initValue: initVal,
    fieldToFocus: "ingredientId",
  }

  const handleResetTable = (newRowModes) => {
    dispatch(resetTable(newRowModes))
    refetch()
  }
  const tableConfig = {
    rows,
    columns: tableColumns,
    loading: isLoading || updateLoading || addLoading,
    rowCount: recipesData?.totalLength || 0,
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
export default RecipeTable
