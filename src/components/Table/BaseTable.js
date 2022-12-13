import { Alert, Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import { DataGrid, gridClasses } from "@mui/x-data-grid"
import { useEffect, useMemo, useState } from "react"
import TableToolBar from "./TableToolBar"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { nanoid } from "@reduxjs/toolkit"

const BaseTable = (props) => {
  const { tableConfig } = props
  const {
    rows,
    columns,
    isLoading,
    totalLength,
    rowsPerPageOptions,
    page,
    pageSize,
    handlePageSizeChange,
    handlePageChange,
    handleSortChange,
    handleFiltersChange,
    handleSearch,
    handleResetTableConfig,
    onRowModesModelChange,
    rowModesModel,
    handleUpdate,
    rowError,
    handleCreate,
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

  const handleProcessRowUpdateError = (errors) => console.log(errors)

  const handleResetTable = () => {
    setSearchInput("")
    handleResetTableConfig()
  }

  return (
    <>
      <Box
        mt={2}
        mb={1}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Alert
          severity="warning"
          sx={{
            //flexGrow: 1,
            width: "70%",
            visibility: rowError ? "visible" : "hidden",
          }}
        >
          {rowError &&
            rowError.map((err) => {
              return <div key={err}>{err}</div>
            })}
        </Alert>
      </Box>
      <Box
        height="60vh"
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-cell[data-field~=actions]": {
            justifyContent: "flex-start",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DataGrid
            experimentalFeatures={{ newEditingApi: true }}
            rows={rows || []}
            columns={columns}
            loading={isLoading || !rows}
            rowCount={totalLength || 0}
            rowsPerPageOptions={rowsPerPageOptions}
            pagination
            page={page}
            pageSize={pageSize}
            paginationMode="server"
            sortingMode="server"
            filterMode="server"
            disableColumnMenu={true}
            headerHeight={40}
            onPageChange={(newPage) => {
              handlePageChange(newPage)
            }}
            onPageSizeChange={(newPageSize) =>
              handlePageSizeChange(newPageSize)
            }
            onSortModelChange={(newSortModel) => {
              if (newSortModel.length > 0) {
                handleSortChange(...newSortModel)
              } else {
                handleSortChange({ field: "createdAt", sort: "desc" })
              }
            }}
            onFilterModelChange={(newFilterModel) => {
              if (
                newFilterModel.items.length > 0 &&
                newFilterModel.items[0].value
              ) {
                const { columnField, value } = newFilterModel.items[0]
                handleFiltersChange(`${columnField}:${value}`)
              } else {
                handleFiltersChange("")
              }
            }}
            components={{
              Toolbar: TableToolBar,
            }}
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
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            sx={{
              borderRadius: "10px",
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) => theme.palette.grey["A100"],
              },
            }}
            //checkboxSelection
            disableSelectionOnClick
            localeText={localizedTextMap}
            editMode="row"
            onRowModesModelChange={onRowModesModelChange}
            rowModesModel={rowModesModel}
            processRowUpdate={processRowUpdate}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
            onProcessRowUpdateError={handleProcessRowUpdateError}
          />
        </LocalizationProvider>
      </Box>
    </>
  )
}

export default BaseTable
