import { Box } from "@mui/material"

const MainWrapper = ({ children, ...otherProps }) => {
  const boxConfig = {
    display: "flex",
    justifyContent: "center",
    ...otherProps,
  }
  return <Box {...boxConfig}>{children}</Box>
}

export default MainWrapper
