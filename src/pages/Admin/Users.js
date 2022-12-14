import { useTranslation } from "react-i18next"
import { UsersTable } from "../../features/users"
import useTitle from "../../hooks/useTitle"
import MainWrapper from "../../layout/MainWrapper"
import PageWrapper from "../../layout/PageWrapper"

const Users = () => {
  const { t } = useTranslation()
  useTitle(t("Users"))
  return (
    <MainWrapper>
      <PageWrapper title={t("manageUsers")}>
        <UsersTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default Users
