import { Add, RestartAlt } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  useGridApiContext,
} from "@mui/x-data-grid"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import SearchBar from "../../../components/SearchBar/SearchBar"
const TableToolBar = (props) => {
  const { t } = useTranslation()
  const apiRef = useGridApiContext()

  const { searchInput, setSearchInput, setSearch, handleResetTable } = props
  const navigate = useNavigate()

  const handleSearch = () => {
    setSearch(searchInput)
  }

  const resetTable = () => {
    console.log(apiRef.current.state)
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
          {/*<Button
            color="primary"
            variant="contained"
            startIcon={<Add />}
            onClick={handleClick}
            sx={{ mr: 1 }}
          >
            Create
          </Button>*/}
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

/**
 *
 *
 *
 */
