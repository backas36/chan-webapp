import { getGridStringOperators } from "@mui/x-data-grid"
import { createSlice } from "@reduxjs/toolkit"
import { formatDateTime } from "../../../utils/dateTimeManger"
import renderCellExpand from "../components/renderCellExpand"

const initialState = {
  page: 0,
  pageSize: 15,
  sort: "",
  search: "",
  filters: "",
  columns: [
    {
      field: "relatedUserName",
      headerName: "relatedUser",
      width: 150,
      editable: false,
      filterable: true,
      sortable: true,
    },
    {
      field: "type",
      headerName: "activityType",
      width: 170,
      filterable: true,
      editable: false,
      sortable: true,
    },
    {
      field: "content",
      headerName: "activityContent",
      width: 500,
      sortable: false,
      filterable: false,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "activityCreatedAt",
      width: 150,
      filterable: false,
    },
  ],
}

const actionLogSlice = createSlice({
  name: "actionLog",
  initialState,
  reducers: {
    resetActionsTable: (state, action) => {
      return initialState
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    setSearch: (state, action) => {
      state.search = action.payload
    },
  },
})

export const {
  resetActionsTable,
  setPage,
  setPageSize,
  setSort,
  setFilters,
  setSearch,
} = actionLogSlice.actions
export default actionLogSlice.reducer
export const selectLogTableConfig = (state) => state.actionLog
