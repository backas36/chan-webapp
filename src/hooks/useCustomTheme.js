import { createTheme, responsiveFontSizes } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

import { selectIsDarkMode } from "../features/ui"
import { getCustomTheme } from "../assets"

const useCustomTheme = () => {
  const [mode, setMode] = useState("light")

  const isDarkMode = useSelector(selectIsDarkMode)

  useEffect(() => {
    isDarkMode ? setMode("dark") : setMode("light")
  }, [isDarkMode])

  const theme = useMemo(() => createTheme(getCustomTheme(mode)), [mode])

  return responsiveFontSizes(theme)
}
export default useCustomTheme
