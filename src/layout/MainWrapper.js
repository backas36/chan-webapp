import { Box, useTheme } from "@mui/material"

const MainWrapper = ({ children, ...otherProps }) => {
  const theme = useTheme()
  const boxConfig = {
    display: "flex",
    justifyContent: "center",
    //pt: theme.spacing(0),
    //pb: theme.spacing(10),
    ...otherProps,
  }
  return <Box {...boxConfig}>{children}</Box>
}

export default MainWrapper
