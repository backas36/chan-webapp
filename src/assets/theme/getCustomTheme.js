import darkTheme from "./darkTheme"
import lightTheme from "./lightTheme"

const getCustomTheme = (mode) => {
  return {
    ...(mode === "dark" ? { mode, ...darkTheme } : { mode, ...lightTheme }),
    typography: {
      fontSize: 12,
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  }
}

export default getCustomTheme
