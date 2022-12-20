import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  page: 0,
  pageSize: 15,
  sort: "",
  search: "",
  filters: "",
  rowModesModel: {},
}

const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    resetTable: (state, action) => {
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
    setRowModesModel: (state, action) => {
      state.rowModesModel = action.payload
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
} = suppliersSlice.actions

export default suppliersSlice.reducer
export const selectSuppliersTableConfig = (state) => state.suppliers
export const selectRowModesModel = (state) => state.suppliers.rowModesModel
