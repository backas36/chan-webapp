import TableToolBar from "./TableToolBar"

export const baseTableConfig = {
  pagination: true,
  paginationMode: "server",
  sortingMode: "server",
  filterMode: "server",
  disableColumnMenu: true,
  headerHeight: 40,
  components: {
    Toolbar: TableToolBar,
  },
  getRowSpacing: (params) => ({
    top: params.isFirstVisible ? 0 : 5,
    bottom: params.isLastVisible ? 0 : 5,
  }),
  disableSelectionOnClick: true,
  editMode: "row",
  //checkboxSelection
}
