import { Typography } from "@mui/material"

const PageTItle = ({ title }) => {
  return (
    <Typography
      variant="h3"
      //color={theme.palette.secondary[100]}
      fontWeight="bold"
      sx={{ mb: "5px" }}
    >
      {title}
    </Typography>
  )
}
export default PageTItle
