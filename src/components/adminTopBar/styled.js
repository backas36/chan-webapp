import styled from "@emotion/styled"
import { Drawer, ListItemButton, ListItemText } from "@mui/material"
const drawerWidth = 200
export const openedMixin = (theme) => {
  return {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("xs")]: {
      //width: `calc(${theme.spacing(22)} + 1px)`,
      width: `${drawerWidth / 1.4}px`,
    },
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
    overflowX: "hidden",
  }
}
export const closedMixin = (theme) => {
  return {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    //width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("xs")]: {
      width: `0`,
    },
    [theme.breakpoints.up("md")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  }
}
export const MuiDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
  return {
    [theme.breakpoints.up("xs")]: {
      width: `${drawerWidth / 1.4}px`,
    },
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }
})

export const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "isSideBarOpen",
})(({ theme, isSideBarOpen }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: isSideBarOpen ? "flex-end" : "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export const ItemStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "isSideBarOpen",
})(({ theme, isSideBarOpen }) => {
  const darkMode = theme?.mode === "dark"
  return {
    minHeight: 48,
    justifyContent: isSideBarOpen ? "initial" : "center",
    px: 2.5,
    "&.active, &:hover": {
      color: darkMode ? theme.palette.warning.main : theme.palette.success.dark,
    },
    "&.active > .MuiListItemIcon-root": {
      color: darkMode ? theme.palette.warning.main : theme.palette.success.dark,
    },
    "&.active > .MuiListItemText-root > span": {
      fontWeight: 700,
    },
  }
})
export const ItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isSideBarOpen",
})(({ theme, isSideBarOpen }) => {
  return {
    opacity: isSideBarOpen ? 1 : 0,
    "& span": {
      fontWeight: 400,
    },
  }
})
