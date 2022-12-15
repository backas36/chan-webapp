import { useTranslation } from "react-i18next"

import { DataGrid } from "@mui/x-data-grid"
import { useMemo, useState } from "react"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { dataGridStyles, TableBox } from "./styled"
import { baseTableConfig } from "./baseTableConfig"

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
  const [searchInput, setSearchInput] = useState("")

  const localizedTextMap = useMemo(
    () => ({
      toolbarFilters: t("toolbarFilters"),
      filterPanelColumns: t("filterPanelColumns"),
      filterPanelOperators: t("filterPanelOperators"),
      filterPanelInputLabel: t("filterPanelInputLabel"),
      filterOperatorContains: t("filterOperatorContains"),
      toolbarColumns: t("toolbarColumns"),
      columnsPanelHideAllButton: t("columnsPanelHideAllButton"),
      columnsPanelShowAllButton: t("columnsPanelShowAllButton"),
      columnsPanelTextFieldLabel: t("columnsPanelTextFieldLabel"),
      columnsPanelTextFieldPlaceholder: t("columnsPanelTextFieldPlaceholder"),
      filterOperatorIs: t("filterOperatorIs"),
    }),
    [t]
  )

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
