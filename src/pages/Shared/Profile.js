import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Grid } from "@mui/material"
import { Container } from "@mui/system"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import PageTItle from "../../components/title/PageTItle"
import { UserAvatar, UserProfileDetail } from "../../features/me"
import useTitle from "../../hooks/useTitle"

const Profile = () => {
  const { t } = useTranslation()
  useTitle(t("Profile"))

  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" sx={{ width: "100%", pb: 10 }}>
      <Box
        sx={{
          mb: 3,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageTItle title={t("manageProfile")} />

        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack size="medium" color="primary" />}
        >
          {t("back")}
        </Button>
      </Box>
      <Grid container spacing={3}>
        <UserAvatar />
        <UserProfileDetail />
      </Grid>
    </Container>
  )
}
export default Profile
