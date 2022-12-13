import { Box, Container } from "@mui/system"
import { useTranslation } from "react-i18next"
import PageTItle from "../../components/title/PageTItle"
import { UsersTable } from "../../features/users"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"

const Users = () => {
  useTitle("Users")
  const { t } = useTranslation()
  return (
    <MainWrapper sx={{ pt: 0, pb: (theme) => theme.spacing(8) }}>
      <Container maxWidth={false}>
        <Box>
          <PageTItle title={t("manageUsers")} />
          <UsersTable />
        </Box>
      </Container>
    </MainWrapper>
  )
}
export default Users
