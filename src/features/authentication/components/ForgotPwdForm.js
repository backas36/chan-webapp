import { Box } from "@mui/system"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { useForgetPwdMutation } from "../services/authApiSlice"
import { forgotPwdSchema } from "../utils/schema"
import { customToast } from "../../../components/notify/NotifyToast"
import { FLoadingBtn, FTextfield } from "../../../components/form"

const initLoginValue = {
  email: "",
}

const ForgotPwdForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [forgetPwd, { isSuccess }] = useForgetPwdMutation()

  const formikConfig = {
    initialValues: initLoginValue,
    enableReinitialize: true,
    validationSchema: forgotPwdSchema(),
    onSubmit: async (value) => {
      await forgetPwd(value)
    },
  }
  useEffect(() => {
    if (isSuccess) {
      customToast.success("checkMailBox")
      navigate("/")
    }
  }, [isSuccess, navigate])
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{ color: (theme) => theme.palette.primary.dark }}
        >
          {t("forgotPwdDesc")}
        </Typography>
      </Box>
      <Formik {...formikConfig}>
        <Form autoComplete="off">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <FTextfield name="email" label="Email" />
            <FLoadingBtn>{t("submit")}</FLoadingBtn>
          </Box>
        </Form>
      </Formik>
    </>
  )
}
export default ForgotPwdForm
