import { Box } from "@mui/material"

const MainWrapper = ({ children, ...otherProps }) => {
  const boxConfig = {
    display: "flex",
    justifyContent: "center",
    mb: (theme) => theme.spacing(6),
    ...otherProps,
  }
  return <Box {...boxConfig}>{children}</Box>
}

export default MainWrapper
