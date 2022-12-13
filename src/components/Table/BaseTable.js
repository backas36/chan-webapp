import { Alert, Box } from "@mui/material"
import { useTranslation } from "react-i18next"

import { DataGrid, gridClasses } from "@mui/x-data-grid"
import { useMemo, useState } from "react"
import TableToolBar from "./TableToolBar"

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
    handlePageChange,
    handlePageSize,
    handleSortChange,
    handleFiltersChange,
    handleSearch,
    handleResetTableConfig,
  } = tableConfig
  const [searchInput, setSearchInput] = useState("")
  const [rowError, setRowError] = useState(null)

  const { t } = useTranslation()

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
    }),
    [t]
  )

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
          {rowError?.map((err) => {
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
        <DataGrid
          experimentalFeatures={{ newEditingApi: true }}
          rows={rows || []}
          columns={columns}
          headerHeight={40}
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
          onPageChange={(newPage) => handlePageSize(newPage)}
          onPageSizeChange={(newPageSize) => handlePageChange(newPageSize)}
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
            },
            pagination: {
              labelRowsPerPage: t("pageSize"),
            },
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          editMode="row"
          sx={{
            borderRadius: "10px",
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) => theme.palette.grey["A100"],
            },
          }}
          //checkboxSelection
          disableSelectionOnClick
          localeText={localizedTextMap}
        />
      </Box>
    </>
  )
}

export default BaseTable
