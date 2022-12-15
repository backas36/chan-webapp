import { Box } from "@mui/material"
import contactsBanner1 from "../../assets/image/contacts-banner-1.jpg"
import { BannerImg } from "./styled"

const ContactsHero = () => {
  return (
    <Box sx={{ maxWidth: "100%" }}>
      <BannerImg imageSource={`url(${contactsBanner1})`}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: { xs: 3, sm: 2, md: 20 },
            alignSelf: "center",
          }}
        ></Box>
      </BannerImg>
    </Box>
  )
}
export default ContactsHero
