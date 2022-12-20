import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  page: 0,
  pageSize: 15,
  sort: "",
  search: "",
  filters: "",
  rowModesModel: {},
  rows: [],
}

const poCategoriesSlice = createSlice({
  name: "poCategories",
  initialState,
  reducers: {
    resetTable: (state, action) => {
      const currentRows = current(state).rows
      return {
        ...initialState,
        rows: currentRows.filter((row) => !row?.isNew),
        rowModesModel: action.payload,
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
    setRowModesModel: (state, action) => {
      state.rowModesModel = action.payload
    },
    setRows: (state, action) => {
      if (action.payload?.isNew) {
        state.rows.push(action.payload)
      } else {
        state.rowModesModel = {}
        state.rows = action.payload
      }
    },
  },
})

export const {
  resetTable,
  setPage,
  setPageSize,
  setSort,
  setFilters,
  setSearch,
  setRowModesModel,
  setRows,
} = poCategoriesSlice.actions

export default poCategoriesSlice.reducer
export const selectPoCategoriesTableConfig = (state) => state.poCategories
export const selectRowModesModel = (state) => state.poCategories.rowModesModel
export const selectCurrentRows = (state) => state.poCategories.rows
