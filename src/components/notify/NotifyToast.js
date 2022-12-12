import { Slide, ToastContainer } from "react-toastify"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import useCustomTheme from "../../hooks/useCustomTheme"

export const customToast = {
  success: (message) => toast.success(message),
  error: (message) => {
    return message && toast.error(message)
  },
}

const NotifyToast = () => {
  const theme = useCustomTheme()
  return (
    <ToastContainer
      position="top-center"
      limit={5}
      autoClose={3000}
      //autoClose={600000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      theme={theme.mode}
      transition={Slide}
    />
  )
}

export default NotifyToast
