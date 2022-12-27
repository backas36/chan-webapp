import { LinearProgress } from "@mui/material"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { dataGridStyles } from "./styled"
import TableToolBar from "./TableToolBar"

const useBaseTableConfig = () => {
  const { t } = useTranslation()

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
      filterOperatorEquals: t("filterOperatorEquals"),
    }),
    [t]
  )
  const baseConfig = {
    experimentalFeatures: { newEditingApi: true },
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
    localeText: localizedTextMap,
    sx: dataGridStyles,
  }
  return baseConfig
}
export default useBaseTableConfig
