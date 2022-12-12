import { Box } from "@mui/system"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { Button, Stack, Typography, Link as MuiLink } from "@mui/material"
import { Link, useNavigate, useSearchParams } from "react-router-dom"

import { customToast } from "../../../components/notify/NotifyToast"
import useToggle from "../../../hooks/useToggle"
import { FLoadingBtn, FPwdTextfield } from "../../../components/form"
import { activateSchema } from "../utils/schema"
import { useActivateMutation, useSendResetPwdMutation } from ".."
import { useTranslation } from "react-i18next"
const initLoginValue = {
  password: "",
  okPassword: "",
}

const SetUpPwdForm = ({ subTitle, isForgetPwd = false }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  let [token] = useSearchParams()
  const [activateAcc, { isSuccess, isError }] = useActivateMutation()
  const [sendResetPwd, { isSuccess: resetSuccess }] = useSendResetPwdMutation()
  const {
    multiViable: showPassword,
    handleSetMultiVisibility: handleShowPasswords,
  } = useToggle({
    password: false,
    okPassword: false,
  })

  const formikConfig = {
    initialValues: initLoginValue,
    enableReinitialize: true,
    validationSchema: activateSchema(),
    onSubmit: async (value) => {
      const credentials = {
        token: token.get("token"),
        password: value.password,
      }
      if (isForgetPwd) {
        await sendResetPwd(credentials)
        return
      }
      await activateAcc(credentials)
    },
  }

  useEffect(() => {
    if (isSuccess || resetSuccess) {
      customToast.success("You can login now!")
      navigate("/login")
    }
  }, [isSuccess, navigate, resetSuccess])

  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="body2"
          sx={{ color: (theme) => theme.palette.primary.dark }}
        >
          {subTitle}
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
            <FPwdTextfield
              name="password"
              label={t("password")}
              isShowValue={showPassword.password}
              setIsShowValue={() => handleShowPasswords("password")}
            />
            <FPwdTextfield
              name="okPassword"
              label={t("confirmPwd")}
              isShowValue={showPassword.okPassword}
              setIsShowValue={() => handleShowPasswords("okPassword")}
            />
          </Box>
          <FLoadingBtn>{t("submit")}</FLoadingBtn>
        </Form>
      </Formik>
    </>
  )
}
export default SetUpPwdForm
