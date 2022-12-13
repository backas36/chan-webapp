import { Box, Container } from "@mui/material"

import MainWrapper from "../../layout/MainWrapper"
import useTitle from "../../hooks/useTitle"
import PageTitle from "../../components/title/PageTItle"
import { useTranslation } from "react-i18next"
import { ActionsLogTable } from "../../features/actionsLog"

const ActionsLog = () => {
  const { t } = useTranslation()
  useTitle("Actions Log")
  return (
    <MainWrapper sx={{ pt: 0, pb: (theme) => theme.spacing(8) }}>
      <Container maxWidth={false}>
        <Box>
          <PageTitle title={t("actionsLog")} />
          <ActionsLogTable />
        </Box>
      </Container>
    </MainWrapper>
  )
}
export default ActionsLog
