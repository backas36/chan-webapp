import { useSearchParams } from "react-router-dom"

import { Typography } from "@mui/material"

import useTitle from "../../hooks/useTitle"
import { useTranslation } from "react-i18next"
import { validTokenTime } from "../../utils/validTokenTime"
import LoginWrapper from "../../layout/LoginWrapper"
import Forbidden from "../../features/authentication/components/Forbidden"
import SetUpPwdForm from "../../features/authentication/components/SetUpPwdForm"

const ActivateAccount = () => {
  const { t } = useTranslation()
  useTitle("Activate Account")
  let [token] = useSearchParams()
  let tokenIsValid = false
  if (token.get("token")) {
    tokenIsValid = validTokenTime(token.get("token"))
  }

  return (
    <>
      {tokenIsValid ? (
        <LoginWrapper title={t("activateAcc")}>
          <SetUpPwdForm subTitle={t("setPwdToAcc")} />
        </LoginWrapper>
      ) : (
        <Forbidden>
          <Typography
            sx={{ fontSize: (theme) => theme.typography.subtitle1.fontSize }}
          >
            {t("linkExpired")}
          </Typography>
        </Forbidden>
      )}
    </>
  )
}
export default ActivateAccount
