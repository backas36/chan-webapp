import { useDispatch, useSelector } from "react-redux"
import {
  resetActionsTable,
  selectLogTableConfig,
  setFilters,
  setPage,
  setPageSize,
  setSearch,
  setSort,
} from "../services/actionLogSlice"
import { useGetActionLogListQuery } from "../services/actionLogApiSlice"
import useActionLogTableColumn from "../hook/useActionLogTableColumn"
import BaseTable from "../../../components/Table/BaseTable"
import { useEffect } from "react"
const ActionsLogTable = () => {
  const dispatch = useDispatch()
  const logsTableConfig = useSelector(selectLogTableConfig)
  const { page, pageSize, sort, search, filters } = logsTableConfig

  const startIndex = page > 0 ? pageSize * page : 0
  const order = sort && `${sort.field}:${sort.sort}`

  const tableColumns = useActionLogTableColumn()

  const {
    data: actionsLogData,
    isLoading,
    refetch,
  } = useGetActionLogListQuery({
    n: pageSize,
    s: startIndex,
    order,
    filters,
    q: search,
  })

  const handleFilterModelChange = (newFilterModel) => {
    if (newFilterModel.items.length > 0 && newFilterModel.items[0].value) {
      const { columnField, value } = newFilterModel.items[0]
      dispatch(setFilters(`${columnField}:${value}`))
    } else {
      dispatch(setFilters(""))
    }
  }

  const handleSortModelChange = (newSortModel) => {
    if (newSortModel.length > 0) {
      dispatch(setSort(...newSortModel))
    } else {
      dispatch(setSort({ field: "createdAt", sort: "desc" }))
    }
  }

  const handleResetTable = () => {
    dispatch(resetActionsTable())
    refetch()
  }

  const tableConfig = {
    rows: actionsLogData?.data || [],
    columns: tableColumns,
    isLoading: isLoading || !actionsLogData?.data,
    rowCount: actionsLogData?.totalLength || 0,
    rowsPerPageOptions: [15, 30, 45],
    page,
    pageSize,
    onPageChange: (newPage) => dispatch(setPage(newPage)),
    onPageSizeChange: (newSize) => dispatch(setPageSize(newSize)),
    onSortModelChange: handleSortModelChange,
    onFilterModelChange: handleFilterModelChange,
    handleSearch: (value) => dispatch(setSearch(value)),
    handleResetTableConfig: handleResetTable,
  }
  return <BaseTable tableConfig={tableConfig} />
}
export default ActionsLogTable
