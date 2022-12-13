import { RestartAlt } from "@mui/icons-material"
import { Alert, Box, Button } from "@mui/material"
import {
  DataGrid,
  getGridStringOperators,
  gridClasses,
  useGridApiContext,
} from "@mui/x-data-grid"
import { useEffect, useMemo, useState } from "react"
import { formatDateTime } from "../../../utils/dateTimeManger"
import { useGetActionLogListQuery } from "../services/actionLogApiSlice"
import TableToolBar from "./TableToolBar"
import renderCellExpand from "./renderCellExpand"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { selectLang } from "../../lang"

const BaseTable = (props) => () => {
  const { rows, columns, isLoading, totalLength, rowsPerPageOptions } = props
  return (
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
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel) => {
          if (newSortModel.length > 0) {
            setSort(...newSortModel)
          } else {
            setSort({ field: "createdAt", sort: "desc" })
          }
        }}
        onFilterModelChange={(newFilterModel) => {
          console.log(newFilterModel.items)
          if (
            newFilterModel.items.length > 0 &&
            newFilterModel.items[0].value
          ) {
            const { columnField, value } = newFilterModel.items[0]
            setFilters(`${columnField}:${value}`)
          } else {
            setFilters("")
          }
        }}
        components={{
          Toolbar: TableToolBar,
          //Footer: TableFooter,
        }}
        componentsProps={{
          toolbar: {
            searchInput,
            setSearchInput,
            setSearch,
            handleResetTable,
          },
          pagination: {
            labelRowsPerPage: t("pageSize"),
          },
          //footer: {
          //  handleResetTable,
          //},
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
  )
}

export default BaseTable
