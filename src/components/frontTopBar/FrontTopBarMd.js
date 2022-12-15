import { Box, Button, styled } from "@mui/material"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"

const MButton = styled(Button)(({ theme }) => {
  return {
    fontSize: theme.typography.subtitle1.fontSize,
    color: "inherit",
    display: "block",
    letterSpacing: "0.7px",
    "&.active, &:hover": {
      textDecoration: "underline",
      color: theme.palette.success.dark,
    },
  }
})

const FrontTopBarMd = ({ pages, handleCloseNavMenu }) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
      }}
    >
      {pages.map((page) => (
        <MButton
          key={page.path}
          component={NavLink}
          to={page.path}
          onClick={handleCloseNavMenu}
        >
          {t(page.name)}
        </MButton>
      ))}
    </Box>
  )
}
export default FrontTopBarMd
