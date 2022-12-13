import { CardContent, Card, styled, Typography, Box } from "@mui/material"

const CardStyle = styled(Card)(({ theme }) => {
  return {
    height: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})
const MBox = styled(Box)(({ theme }) => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})
const MCard = ({ children, title }) => {
  return (
    <CardStyle>
      <CardContent>
        <Typography variant="h4" fontWeight={600}>
          {title}
        </Typography>
        <MBox>{children}</MBox>
      </CardContent>
    </CardStyle>
  )
}
export default MCard
