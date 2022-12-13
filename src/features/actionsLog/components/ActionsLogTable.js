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

  const handleResetTable = () => {
    dispatch(resetActionsTable())
    refetch()
  }

  const tableConfig = {
    rows: actionsLogData?.data,
    columns: tableColumns,
    isLoading,
    totalLength: actionsLogData?.totalLength,
    rowsPerPageOptions: [15, 30, 45],
    page,
    pageSize,
    handlePageChange: (newPage) => dispatch(setPage(newPage)),
    handlePageSizeChange: (newSize) => dispatch(setPageSize(newSize)),
    handleSortChange: (newSort) => dispatch(setSort(newSort)),
    handleFiltersChange: (newFilter) => dispatch(setFilters(newFilter)),
    handleSearch: (value) => {
      dispatch(setSearch(value))
    },
    handleResetTableConfig: handleResetTable,
  }
  return <BaseTable tableConfig={tableConfig} />
}
export default ActionsLogTable
