import { Lock } from "@mui/icons-material"
import { Alert, AlertTitle, Container } from "@mui/material"
import { useTranslation } from "react-i18next"
const Forbidden = ({ children }) => {
  const { t } = useTranslation()
  return (
    <Container sx={{ py: 10 }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle
          sx={{
            fontSize: (theme) => theme.typography.h4.fontSize,
          }}
        >
          {t("forbiddenAccess")}
        </AlertTitle>
        {children}
        {/*<Button
          variant="outlined"
          sx={{ ml: 2 }}
          startIcon={<Lock />}
          //onClick={() => dispatch({ type: "OPEN_LOGIN" })}
        >
          login
        </Button>*/}
      </Alert>
    </Container>
  )
}

export default Forbidden
