import { Box, styled } from "@mui/material"
import { gridClasses } from "@mui/x-data-grid"

export const TableBox = styled(Box)(({ theme }) => {
  return {
    height: "100vh",
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-cell[data-field~=actions]": {
      justifyContent: "flex-start",
    },
    "& .MuiDataGrid-cell:focus-within": {
      outline: "none !important",
    },
    "& .must-input--header": {
      background: "rgb(211, 202, 187,0.5)",
    },
  }
})

export const dataGridStyles = () => {
  return {
    borderRadius: "10px",
    [`& .${gridClasses.row}`]: {
      bgcolor: (theme) =>
        theme.palette.mode === "dark"
          ? theme.palette.background.paper
          : theme.palette.grey["A100"],
    },
    "& .MuiDataGrid-cell--editing": {
      "& .MuiInputBase-root": {
        height: "100%",
      },
    },
    "& .Mui-error": {
      backgroundColor: (theme) =>
        `rgb(126,10,15, ${theme.palette.mode === "dark" ? 0.1 : 0.2})`,
      border: (theme) => `1px solid ${theme.palette.error.main}`,
    },
  }
}
