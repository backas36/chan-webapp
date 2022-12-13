import { RestartAlt } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  useGridApiContext,
} from "@mui/x-data-grid"
import { useTranslation } from "react-i18next"
import SearchBar from "../SearchBar/SearchBar"

const TableToolBar = (props) => {
  const { t } = useTranslation()
  const apiRef = useGridApiContext()

  const { searchInput, setSearchInput, handleResetTable, handleSearch } = props

  const resetTable = () => {
    //console.log("🐑 ~ apiRef", apiRef.current.getSortModel())
    setSearchInput("")
    apiRef.current.setSortModel([])
    apiRef.current.setFilterModel({ items: [] })

    handleResetTable()
  }
  return (
    <GridToolbarContainer>
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 4px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
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
            top: "-8%",
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
