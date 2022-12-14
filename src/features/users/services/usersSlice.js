import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {
  page: 0,
  pageSize: 15,
  sort: "",
  search: "",
  filters: "",
  rowModesModel: {},
}
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsersTable: (state, action) => {
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
  resetUsersTable,
  setPage,
  setPageSize,
  setSort,
  setFilters,
  setSearch,
  setRowModesModel,
} = usersSlice.actions
export default usersSlice.reducer
export const selectUsersTableConfig = (state) => state.users
export const selectRowModesModel = (state) => state.users.rowModesModel
