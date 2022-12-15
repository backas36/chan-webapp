import { useTranslation } from "react-i18next"

import { DataGrid } from "@mui/x-data-grid"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { dataGridStyles, TableBox } from "./styled"
import useTable, { baseTableConfig } from "./useTable"

const BaseTable = (props) => {
  const { tableConfig } = props
  const {
    handleSearch,
    handleResetTableConfig,
    handleUpdate,
    handleCreate,
    handleFilterChange,
    handleSortChange,
    ...otherTableConfig
  } = tableConfig

  const { t } = useTranslation()

  const { searchInput, setSearchInput, localizedTextMap } = useTable()

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true
  }

  const processRowUpdate = async (processRow, oldRow) => {
    const updatedRow = { ...processRow, isNew: false }

    try {
      await handleUpdate(processRow)
      return updatedRow
    } catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
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

  const handleProcessRowUpdateError = (errors) => console.log(errors)

  const handleResetTable = () => {
    setSearchInput("")
    handleResetTableConfig()
  }

  return (
    <>
      <TableBox>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            {...otherTableConfig}
            {...baseTableConfig}
            componentsProps={{
              toolbar: {
                searchInput,
                setSearchInput,
                handleSearch,
                handleResetTable,
                handleCreate,
              },
              pagination: {
                labelRowsPerPage: t("pageSize"),
              },
            }}
            sx={dataGridStyles}
            //checkboxSelection
            localeText={localizedTextMap}
            processRowUpdate={processRowUpdate}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            onFilterModelChange={handleFilterModelChange}
            onSortModelChange={handleSortModelChange}
          />
        </LocalizationProvider>
      </TableBox>
    </>
  )
}

export default BaseTable
