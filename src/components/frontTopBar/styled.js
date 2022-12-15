import { Box, styled } from "@mui/material"

export const MBox = styled(Box)(({ theme }) => {
  return {
    flexGrow: {
      xs: 1,
      md: 0,
    },
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-end",
  }
})
