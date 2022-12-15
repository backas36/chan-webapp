import { Box, Container } from "@mui/system"
import PageTItle from "../components/title/PageTItle"

const PageWrapper = ({ title, children }) => {
  return (
    <Container maxWidth="lg" sx={{ width: "100%" }}>
      <Box
        sx={{
          mb: 3,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <PageTItle title={title} />
      </Box>
      {children}
    </Container>
  )
}
export default PageWrapper
