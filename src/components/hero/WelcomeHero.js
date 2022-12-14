import { Box, Button } from "@mui/material"
import { useTranslation } from "react-i18next"
import welcomeImage from "../../assets/image/welcomeImage.jpg"
import {
  BannerContentWrapper,
  BannerDesc,
  BannerImg,
  BannerTitle,
} from "./styled"

const WelcomeHero = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <BannerImg imageSource={`url(${welcomeImage})`}>
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
