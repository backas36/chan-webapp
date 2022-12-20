import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  page: 0,
  pageSize: 15,
  sort: "",
  search: "",
  filters: "",
  rows: [],
}

const actionLogSlice = createSlice({
  name: "actionLog",
  initialState,
  reducers: {
    resetActionsTable: (state, action) => {
      const currentRows = current(state).rows
      return {
        ...initialState,
        rows: currentRows.filter((row) => !row?.isNew),
      }
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
    setRows: (state, action) => {
      const { isNew, isCancelNew } = action.payload
      if (!isNew && !isCancelNew) {
        state.rowModesModel = {}
        state.rows = action.payload
        return
      }
      if (isNew) {
        state.rows.push(action.payload)
        return
      }

      if (isCancelNew) {
        state.rows = action.payload.newRows
      }
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
  setRows,
} = actionLogSlice.actions
export default actionLogSlice.reducer
export const selectLogTableConfig = (state) => state.actionLog
