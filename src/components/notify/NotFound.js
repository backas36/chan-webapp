import { Alert, AlertTitle } from "@mui/material"
import { Container } from "@mui/system"
import { useTranslation } from "react-i18next"

import BackBtn from "../buttons/BackBtn"

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Alert
        severity="warning"
        //action={<BackBtn />}
        sx={{
          "& .MuiAlert-icon": {
            fontSize: "4.5rem",
            mr: 5,
          },
        }}
      >
        <AlertTitle
          sx={{
            fontSize: (theme) => theme.typography.h4.fontSize,
          }}
        >
          {t("pageNotFound")}
        </AlertTitle>
        <BackBtn />
      </Alert>
    </Container>
  )
}
export default NotFound
