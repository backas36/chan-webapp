import { Box, Divider, Paper, styled, Typography } from "@mui/material"
import MainWrapper from "./MainWrapper"
import MAvatar from "../components/Avatar/MAvatar"
import logoImage from "../assets/image/s_logo.jpg"
const FormPaperStyle = styled(Paper)({
  padding: 30,
  width: 400,
})

const LoginWrapper = ({ children, title }) => {
  return (
    <MainWrapper>
      <FormPaperStyle elevation={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MAvatar
            source={logoImage}
            sx={{
              width: 150,
              height: 150,
              border: "2px solid",
              borderColor: (theme) => theme.palette.secondary.dark,
            }}
          />
        </Box>
        <Divider sx={{ my: 2 }}>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {title}
          </Typography>
        </Divider>
        {children}
      </FormPaperStyle>
    </MainWrapper>
  )
}
export default LoginWrapper
