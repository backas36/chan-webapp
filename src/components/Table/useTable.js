import { LinearProgress } from "@mui/material"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
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
    LoadingOverlay: LinearProgress,
  },
  getRowSpacing: (params) => ({
    top: params.isFirstVisible ? 10 : 5,
    bottom: params.isLastVisible ? 0 : 5,
  }),
  disableSelectionOnClick: true,
  editMode: "row",
  //checkboxSelection
}

const useTable = () => {
  const { t } = useTranslation()
  const [searchInput, setSearchInput] = useState("")

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
      filterOperatorIs: t("filterOperatorIs"),
      noRowsLabel: t("noRowsLabel"),
      errorOverlayDefaultLabel: t("errorOverlayDefaultLabel"),
      noResultsOverlayLabel: t("noResultsOverlayLabel"),
    }),
    [t]
  )
  return { searchInput, setSearchInput, localizedTextMap }
}
export default useTable
