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

const purchasesSlice = createSlice({
  name: "purchases",
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
  resetTable,
  setPage,
  setPageSize,
  setSort,
  setFilters,
  setSearch,
  setRowModesModel,
  setRows,
} = purchasesSlice.actions

export default purchasesSlice.reducer
export const selectPurchasesTableConfig = (state) => state.purchases
export const selectRowModesModel = (state) => state.purchases.rowModesModel
export const selectCurrentRows = (state) => state.purchases.rows
