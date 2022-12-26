import { useTranslation } from "react-i18next"

import { DataGrid } from "@mui/x-data-grid"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { TableBox } from "./styled"
import { useState } from "react"
import useBaseTableConfig from "./useBaseTableConfig"

const BaseTable = (props) => {
  const { tableConfig } = props
  const {
    handleSearch,
    handleResetTableConfig,
    handleUpdate,
    handleCreate,
    handleFilterChange,
    handleSortChange,
    onRowModesModelChange,
    rowModesModel,
    rows,
    setRows,
    rowUpdateHelper,

    ...otherTableConfig
  } = tableConfig

  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState("")
  const baseTableConfig = useBaseTableConfig()

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleFilterModelChange = (newFilterModel) => {
    if (newFilterModel.items.length > 0 && newFilterModel.items[0].value) {
      const { columnField, value } = newFilterModel.items[0]
      handleFilterChange(`${columnField}:${value}`)
    } else {
      handleFilterChange("")
    }
  }

  const handleSortModelChange = (newSortModel) => {
    if (newSortModel.length > 0) {
      handleSortChange(...newSortModel)
    } else {
      handleSortChange({ field: "createdAt", sort: "desc" })
    }
  }

  const processRowUpdate = async (processRow, oldRow) => {
    const isCreate = !!processRow.isNew
    let updatedRow = { ...processRow, isNew: false }

    try {
      if (isCreate) {
        await handleCreate.handleCreateUser(processRow)
      } else {
        await handleUpdate(processRow)
      }
      if (rowUpdateHelper) {
        updatedRow = rowUpdateHelper(updatedRow)
      }
      setRows(rows.map((row) => (row.id === processRow.id ? updatedRow : row)))
      return updatedRow
    } catch (err) {
      return Promise.reject(err)
    }
  }
  const handleProcessRowUpdateError = (errors) => console.log(errors)

  const handleResetTable = (newRowModes) => {
    setSearchInput("")
    setRows(rows)
    handleResetTableConfig(newRowModes)
  }

  return (
    <>
      <TableBox>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DataGrid
            {...otherTableConfig}
            {...baseTableConfig}
            rows={rows}
            rowModesModel={rowModesModel}
            onRowModesModelChange={onRowModesModelChange}
            componentsProps={{
              toolbar: {
                searchInput,
                setSearchInput,
                handleSearch,
                handleResetTable,
                onRowModesModelChange,
                rowModesModel,
                handleCreate,
                setRows,
                rows,
              },
              pagination: {
                labelRowsPerPage: t("pageSize"),
              },
            }}
            processRowUpdate={processRowUpdate}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            onFilterModelChange={handleFilterModelChange}
            onSortModelChange={handleSortModelChange}
            onStateChange={(state) => {
              //console.log(rows)
              //const total = rows.reduce(
              //  (sum, next) => sum + next.latestCost * next.quantity,
              //  0
              //)
              //console.log(total)
              //const visibleRows = state.filter.filterModel.items
              //let visibleItems = []
              //for (const [id, value] of Object.entries(visibleRows)) {
              //  if (value === true) {
              //    visibleItems.push(id)
              //  }
              //}
              //console.log(visibleItems)
              //const res = rows.filter((item) => visibleItems.includes(item.id))
              //const total = res
              //  .map((item) => item.totalAmount)
              //  .reduce((a, b) => a + b, 0)
              //console.log(total)
              //const total = rows.reduce((a, b) => a + b, 0)
              //console.log(total)
            }}
          />
        </LocalizationProvider>
      </TableBox>
    </>
  )
}

export default BaseTable
