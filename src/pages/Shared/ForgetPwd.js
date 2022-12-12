import { useTranslation } from "react-i18next"
import useTitle from "../../hooks/useTitle"
import LoginWrapper from "../../layout/LoginWrapper"
import ForgotPwdForm from "../../features/authentication/components/ForgotPwdForm"
import BackBtn from "../../components/buttons/BackBtn"
import { Box } from "@mui/system"

const ForgetPwd = () => {
  const { t } = useTranslation()
  useTitle("Forget Password")

  return (
    <>
      <Box textAlign={"center"}>
        <BackBtn />
      </Box>
      <LoginWrapper title={t("forgotPwd")}>
        <ForgotPwdForm />
      </LoginWrapper>
    </>
  )
}
export default ForgetPwd
