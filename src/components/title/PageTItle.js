import { Typography } from "@mui/material"

const PageTItle = ({ title }) => {
  return (
    <Typography
      variant="h4"
      //color={theme.palette.secondary[100]}
      fontWeight={500}
      sx={{ mb: "5px" }}
    >
      {title}
    </Typography>
  )
}
export default PageTItle
