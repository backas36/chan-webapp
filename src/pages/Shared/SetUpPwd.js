import { useTranslation } from "react-i18next"
import { Link, useSearchParams } from "react-router-dom"
import { Link as MuiLink, Typography } from "@mui/material"

import Forbidden from "../../features/authentication/components/Forbidden"
import useTitle from "../../hooks/useTitle"
import LoginWrapper from "../../layout/LoginWrapper"
import SetUpPwdForm from "../../features/authentication/components/SetUpPwdForm"
import { validTokenTime } from "../../utils/validTokenTime"

const SetUpPwd = () => {
  const { t } = useTranslation()
  useTitle("Set Up Password")
  let [params] = useSearchParams()
  const token = params.get("token")

  let tokenIsValid = false

  if (token) {
    tokenIsValid = validTokenTime(token)
  }

  return tokenIsValid ? (
    <LoginWrapper title={t("setUpPwd")}>
      {" "}
      <SetUpPwdForm subTitle={t("setUpPwdFormTitle")} isForgetPwd={true} />
    </LoginWrapper>
  ) : (
    <Forbidden>
      <Typography
        sx={{ fontSize: (theme) => theme.typography.subtitle1.fontSize }}
      >
        {t("linkExpired")}
      </Typography>
      <br />
      <MuiLink component={Link} variant="body2" to="/forget-password">
        {t("reSendResetPwdMail")}
      </MuiLink>
    </Forbidden>
  )
}
export default SetUpPwd
