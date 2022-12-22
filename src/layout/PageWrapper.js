import { Box, Container } from "@mui/system"
import PageTItle from "../components/title/PageTItle"

const PageWrapper = ({ title, children, extraComp }) => {
  return (
    <Container maxWidth="xl" sx={{ width: "100%" }}>
      <Box
        sx={{
          mb: 3,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <PageTItle title={title} />
        {extraComp && extraComp}
      </Box>
      {children}
    </Container>
  )
}
export default PageWrapper
