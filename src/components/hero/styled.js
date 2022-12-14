import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

export const BannerContentWrapper = styled(Box)(({ theme }) => {
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
export const BannerTitle = styled(Typography)(({ theme }) => {
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
export const BannerDesc = styled(Typography)(({ theme }) => {
  return {
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.grey[800],
  }
})

export const BannerImg = styled(Box, {
  shouldForwardProp: (prop) => prop !== "imageSource",
})(({ theme, imageSource }) => {
  return {
    backgroundImage: imageSource,
    backgroundRepeat: "no-repeat",
    backgroundColor: theme.palette.background.default,
    backgroundAttachment: "fixed",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    width: "100%",
    height: "550px",

    display: "flex",
    justifyContent: "center",
    opacity: "0.85",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "auto",
      backgroundPosition: "-456px -140px",
      minHeight: "400px",
    },
  }
})
