import MainWrapper from "../../layout/MainWrapper"
import useTitle from "../../hooks/useTitle"
import { useTranslation } from "react-i18next"
import { ActionsLogTable } from "../../features/actionsLog"
import PageWrapper from "../../layout/PageWrapper"

const ActionsLog = () => {
  const { t } = useTranslation()
  useTitle(t("actionsLog"))
  return (
    <MainWrapper sx={{ pt: 0, pb: (theme) => theme.spacing(8) }}>
      <PageWrapper title={t("actionsLog")}>
        <ActionsLogTable />
      </PageWrapper>
    </MainWrapper>
  )
}
export default ActionsLog
