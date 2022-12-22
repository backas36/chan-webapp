import { Add, RestartAlt } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  useGridApiContext,
  GridRowModes,
} from "@mui/x-data-grid"
import SearchBar from "../SearchBar/SearchBar"

import { v4 as uuidv4 } from "uuid"
import { useCallback } from "react"
import { getAllowRoles } from "../../utils/constants"
import { selectCurrentUser } from "../../features/me"

const TableToolBar = (props) => {
  const { t } = useTranslation()
  const apiRef = useGridApiContext()
  const currentUser = useSelector(selectCurrentUser)

  const isAllowedEdit = useCallback(
    () => getAllowRoles(true, true).includes(currentUser?.role),
    [currentUser?.role]
  )

  const {
    searchInput,
    setSearchInput,
    handleResetTable,
    handleSearch,
    handleCreate,
    onRowModesModelChange,
    rowModesModel,
    setRows,
  } = props

  const handleAddClick = () => {
    const id = uuidv4()
    setRows({ id, ...handleCreate.initValue, isNew: true })
    onRowModesModelChange({
      ...rowModesModel,
      [id]: {
        mode: GridRowModes.Edit,
        fieldToFocus: handleCreate.fieldToFocus,
        isNew: true,
      },
    })
  }
  const resetTable = () => {
    setSearchInput("")
    const current = apiRef.current.exportState()
    current.filter.filterModel.items = []
    current.sorting.sortModel = []
    current.editRows = {}
    apiRef.current.restoreState(current)
    const newRowModes = {}
    rowModesModel &&
      Object.keys(rowModesModel).forEach((id) => {
        if (rowModesModel[id].isNew) {
          return
        }
        newRowModes[id] = {
          mode: GridRowModes.View,
          ignoreModifications: true,
        }
      })
    handleResetTable(newRowModes)
  }

  return (
    <GridToolbarContainer>
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 4px",
          mb: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {!!handleCreate && isAllowedEdit() && (
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddClick}
              sx={{ mr: 2, px: 1 }}
            >
              {t("create")}
            </Button>
          )}

          <GridToolbarFilterButton sx={{ mr: 1 }} />
          <GridToolbarColumnsButton sx={{}} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SearchBar
            searchInput={searchInput}
            handleSearch={handleSearch}
            setSearchInput={setSearchInput}
          />
        </Box>
        <Button
          onClick={resetTable}
          sx={{
            position: "absolute",
            top: "-36px",
            right: "0",
          }}
          variant="text"
          startIcon={
            <RestartAlt
              fontSize="small"
              sx={{
                color: "primary",
              }}
            />
          }
        >
          {t("resetTable")}
        </Button>
      </Box>
    </GridToolbarContainer>
  )
}
export default TableToolBar
