import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  page: 0,
  pageSize: 15,
  sort: "",
  search: "",
  filters: "",
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
