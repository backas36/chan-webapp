import { Box, Button, styled, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import welcomeImage from "../../assets/image/welcomeImage.jpg"

const BannerContentWrapper = styled(Box)(({ theme }) => {
  return {
    background: "white",
    opacity: "0.85",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: 2,
    letterSpacing: "1px",
  }
})
const BannerTitle = styled(Typography)(({ theme }) => {
  return {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h4.fontSize,
    paddingTop: theme.spacing(2),
    color: theme.palette.grey[800],

    "& > span": {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h3.fontSize,
      color: theme.palette.primary.main,
    },
  }
})
const BannerDesc = styled(Typography)(({ theme }) => {
  return {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.grey[800],
  }
})

const BannerImg = styled(Box)(({ theme }) => {
  return {
    backgroundImage: `url(${welcomeImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "black",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    opacity: "0.9",
    [theme.breakpoints.up("xs")]: {
      height: 400,
    },
    [theme.breakpoints.up("md")]: {
      height: "100%",
    },
  }
})
const WelcomeHero = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <BannerImg>
        <Box
          sx={{
            width: "100%",
            padding: { xs: 3, sm: 2, md: 20 },
            alignSelf: "center",
          }}
        >
          <BannerContentWrapper>
            <BannerTitle>
              {t("welcome")}&nbsp;
              <span>{t("chanchan")}</span>
            </BannerTitle>
            <BannerDesc>{t("bannerDesc")}</BannerDesc>
            <Button variant="contained" color="primary" sx={{ my: 2 }}>
              {t("buyNow")}
            </Button>
          </BannerContentWrapper>
        </Box>
      </BannerImg>
    </Box>
  )
}
export default WelcomeHero
