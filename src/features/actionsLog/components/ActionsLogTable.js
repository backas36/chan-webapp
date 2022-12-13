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
import { selectLogTableConfig } from "../services/actionLogSlice"
const ActionsLogTable = () => {
  const { t } = useTranslation()
  const tableConfig = useSelector(selectLogTableConfig)

  console.log("🐑 ~ tableConfig", tableConfig)

  const [rowError, setRowError] = useState(null)

  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(15) //n
  const [sort, setSort] = useState("") //order
  const [search, setSearch] = useState("") //q
  const [filters, setFilters] = useState("") //filter
  const [searchInput, setSearchInput] = useState("")
  const startIndex = page > 0 ? pageSize * page : 0 //s
  const order = sort && `${sort.field}:${sort.sort}`

  const columns = useMemo(() => {
    return [
      {
        field: "relatedUserName",
        headerName: t("relatedUser"),
        width: 150,
        editable: false,
        filterable: true,
        sortable: true,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "contains"
        ),
      },
      {
        field: "type",
        headerName: t("activityType"),
        width: 170,
        filterable: true,
        editable: false,
        sortable: true,
        filterOperators: getGridStringOperators().filter(
          (operator) => operator.value === "contains"
        ),
      },
      {
        field: "content",
        headerName: t("activityContent"),
        width: 500,
        sortable: false,
        filterable: false,
        editable: false,
        renderCell: renderCellExpand,
        valueFormatter: (params) => {
          const content = params?.value
          return JSON.stringify(content)
        },
      },
      {
        field: "createdAt",
        headerName: t("activityCreatedAt"),
        width: 150,
        filterable: false,
        renderCell: (params) => formatDateTime(params?.row.createdAt),
      },
    ]
  }, [t])

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
    setPage(0)
    setPageSize(15)
    setSort("")
    setSearch("")
    setFilters("")
    setSearchInput("")
    refetch()
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
          rows={actionsLogData?.data ?? []}
          columns={columns}
          headerHeight={40}
          loading={isLoading || !actionsLogData?.data}
          rowCount={actionsLogData?.totalLength || 0}
          rowsPerPageOptions={[15, 30, 50]}
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
            console.log(newSortModel)
            if (newSortModel.length > 0) {
              setSort(...newSortModel)
            } else {
              setSort("")
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
    </>
  )
}
export default ActionsLogTable
