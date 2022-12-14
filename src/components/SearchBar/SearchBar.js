import { Search as SearchIcon } from "@mui/icons-material"
import { alpha, Box, InputBase, styled } from "@mui/material"

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.55),
  },
  marginLeft: 0,
  //marginRight: 10,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "60%",
    marginLeft: theme.spacing(1),
  },
  transition: theme.transitions.create("width"),
  flex: "auto",
}))
const SearchIconWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  //pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}))
const SearchBar = ({ setSearchInput, handleSearch, searchInput }) => {
  return (
    <SearchWrapper>
      <SearchIconWrapper
        onClick={() => {
          const inputValue = searchInput.trim()
          handleSearch(inputValue)
        }}
      >
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            const inputValue = e.target.value.trim()
            handleSearch(inputValue)
          }
        }}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </SearchWrapper>
  )
}

export default SearchBar
