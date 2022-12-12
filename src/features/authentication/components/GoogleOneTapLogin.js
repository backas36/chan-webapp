import { useState } from "react"
import { Google } from "@mui/icons-material"
import { Button } from "@mui/material"
import { customToast } from "../../../components/notify/NotifyToast"
import { useTranslation } from "react-i18next"
import { useLoginWithGoogleMutation } from "../services/authApiSlice"
import PageLoading from "../../../layout/PageLoading"

const GoogleOneTapLogin = () => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(false)

  const [loginWithGoogle, { isLoading }] = useLoginWithGoogleMutation()

  const handleResponse = async (response) => {
    const token = response.credential
    await loginWithGoogle(token)
  }

  const handleGoogleLogin = () => {
    setDisabled(true)
    try {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleResponse,
      })
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          throw new Error("Try to clear the cookies or try again later!")
        }
        if (
          notification.isSkippedMoment() ||
          notification.isDismissedMoment()
        ) {
          setDisabled(false)
        }
      })
    } catch (error) {
      customToast.error(error.message)
      setDisabled(false)
    }
  }

  return isLoading ? (
    <PageLoading />
  ) : (
    <Button
      variant="outlined"
      disabled={disabled}
      startIcon={<Google />}
      onClick={handleGoogleLogin}
      color="primary"
    >
      {t("loginWithGoogle")}
    </Button>
  )
}
export default GoogleOneTapLogin
