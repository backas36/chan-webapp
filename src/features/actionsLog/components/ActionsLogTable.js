import { useDispatch, useSelector } from "react-redux"
import {
  resetActionsTable,
  selectLogTableConfig,
  setFilters,
  setPage,
  setPageSize,
  setRows,
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
  const { page, pageSize, sort, search, filters, rows } = logsTableConfig

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

  useEffect(() => {
    if (actionsLogData) {
      dispatch(setRows(actionsLogData?.data || []))
    }
  }, [actionsLogData, dispatch])

  const handleResetTable = (newRowModes) => {
    dispatch(resetActionsTable(newRowModes))
    refetch()
  }

  const tableConfig = {
    rows,
    columns: tableColumns,
    loading: isLoading,
    rowCount: actionsLogData?.totalLength || 0,
    rowsPerPageOptions: [15, 30, 45],
    page,
    pageSize,
    onPageChange: (newPage) => dispatch(setPage(newPage)),
    onPageSizeChange: (newSize) => dispatch(setPageSize(newSize)),
    handleSortChange: (newSort) => dispatch(setSort(newSort)),
    handleFilterChange: (newFilters) => dispatch(setFilters(newFilters)),
    handleSearch: (value) => dispatch(setSearch(value)),
    handleResetTableConfig: handleResetTable,
    setRows: (rows) => dispatch(setRows(rows)),
  }
  return <BaseTable tableConfig={tableConfig} />
}
export default ActionsLogTable
