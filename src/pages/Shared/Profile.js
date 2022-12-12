import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { UserAvatar, UserProfileDetail } from "../../features/me"
import useTitle from "../../hooks/useTitle"

const Profile = ({ isCreate = false }) => {
  useTitle("Profile")

  const { t } = useTranslation()
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
        <Typography variant="h4" fontWeight={500}>
          {isCreate ? t("createNewAccount") : t("manageProfile")}
        </Typography>
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack size="medium" color="primary" />}
        >
          {t("back")}
        </Button>
      </Box>
      <Grid container spacing={3}>
        {!isCreate && <UserAvatar />}
        <UserProfileDetail isCreate={isCreate} />
      </Grid>
    </Container>
  )
}
export default Profile
