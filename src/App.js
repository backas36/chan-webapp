import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { Routes, Route } from "react-router-dom"

import FrontRoutes from "./routes/FrontRoutes"
import { VerifyLogin } from "./features/authentication"
import NotifyToast from "./components/notify/NotifyToast"
import useCustomTheme from "./hooks/useCustomTheme"
import "./assets/styles/global.css"

const App = () => {
  const theme = useCustomTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<VerifyLogin />}>
          <Route path="/*" element={<FrontRoutes />} />

          {/*<Route path="/admin/*" element={<AdminRoutes />} />*/}
        </Route>
      </Routes>
      <NotifyToast />
    </ThemeProvider>
  )
}

export default App
