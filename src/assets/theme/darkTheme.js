const darkTheme = {
  palette: {
    mode: "dark",
    type: "dark",
    primary: {
      main: "#d8a56c",
    },
    secondary: {
      main: "#1f7d63",
    },
    error: {
      main: "#E2726E",
    },
    warning: {
      main: "#e58366",
    },
    success: {
      main: "#f5894a",
    },
    info: {
      main: "#385ca6",
    },
    background: {
      default: "#303030",
      paper: "#3b3a3a",
    },
    text: {
      primary: "rgba(255,255,255,0.63)",
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.63)",
        },
      },
    },
  },
}

export default darkTheme
