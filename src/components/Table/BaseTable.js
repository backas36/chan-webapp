import { useTranslation } from "react-i18next"

import { DataGrid } from "@mui/x-data-grid"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { dataGridStyles, TableBox } from "./styled"
import { useEffect, useMemo, useState } from "react"
import { USER_STATUS } from "../../utils/constants"
import TableToolBar from "./TableToolBar"
import { LinearProgress } from "@mui/material"
import { Box } from "@mui/system"

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
    //tableSource,
    rows,
    setRows,
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
      noRowsLabel: t("noRowsLabel"),
      errorOverlayDefaultLabel: t("errorOverlayDefaultLabel"),
      noResultsOverlayLabel: t("noResultsOverlayLabel"),
    }),
    [t]
  )

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
    const updatedRow = { ...processRow, isNew: false }
    try {
      if (isCreate) {
        await handleCreate.handleCreateUser(processRow)
      } else {
        await handleUpdate(processRow)
      }

      return updatedRow
    } catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
  }
  const handleProcessRowUpdateError = (errors) => console.log(errors)

  const handleResetTable = (handleResetTable) => {
    setSearchInput("")
    setRows(rows)
    handleResetTableConfig(handleResetTable)
  }

  const baseTableConfig = {
    pagination: true,
    paginationMode: "server",
    sortingMode: "server",
    filterMode: "server",
    disableColumnMenu: true,
    headerHeight: 40,
    components: {
      Toolbar: TableToolBar,
      LoadingOverlay: LinearProgress,
    },
    getRowSpacing: (params) => ({
      top: params.isFirstVisible ? 10 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    }),
    disableSelectionOnClick: true,
    editMode: "row",
    //checkboxSelection
  }

  return (
    <>
      <TableBox>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            {...otherTableConfig}
            {...baseTableConfig}
            rows={rows}
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModeModel) =>
              onRowModesModelChange(newModeModel)
            } //
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
            }} //
            //loading={true}
            sx={dataGridStyles} //
            //checkboxSelection
            localeText={localizedTextMap} //
            processRowUpdate={processRowUpdate}
            onRowEditStart={handleRowEditStart} //
            onRowEditStop={handleRowEditStop} //
            onProcessRowUpdateError={handleProcessRowUpdateError}
            onFilterModelChange={handleFilterModelChange} //
            onSortModelChange={handleSortModelChange} //
            isCellEditable={(params) => {
              const { row, field, colDef, formattedValue } = params
              if (
                (field === "email" && !row.isNew) ||
                (field === "status" && formattedValue === USER_STATUS.temporary)
              ) {
                return false
              } else {
                return colDef.editable()
              }
            }}
          />
        </LocalizationProvider>
      </TableBox>
    </>
  )
}

export default BaseTable
