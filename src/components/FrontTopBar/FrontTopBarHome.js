import { Cookie } from "@mui/icons-material"
import { IconButton, Stack, styled, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const MIconButton = styled(IconButton)(({ theme }) => {
  return {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    color: "inherit",
  }
})

const MText = styled(Typography)(({ theme }) => {
  return {
    mr: 2,
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    color: "inherit",
    textDecoration: "none",
    alignItems: "center",
    marginRight: theme.spacing(3),
  }
})
const FrontTopBarHome = () => {
  return (
    <Stack>
      <MIconButton component={Link} to="/">
        <Cookie fontSize="large" />
      </MIconButton>
      <MText component={Link} variant="h6" noWrap to="/">
        <Cookie
          fontSize="large"
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
          }}
        />
        ChanChan
      </MText>
    </Stack>
  )
}
export default FrontTopBarHome
