import {
  ChevronLeft,
  ChevronRight,
  Dashboard,
  ExitToApp,
  ListAlt,
  PeopleAlt,
} from "@mui/icons-material"
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material"
import { Box } from "@mui/system"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectIsSideBarOpen, toggleSideBar } from "../../features/ui"
import { DrawerHeader, ItemStyle, ItemText } from "./styled"

const AdminSideBar = () => {
  const { t } = useTranslation()
  const isSideBarOpen = useSelector(selectIsSideBarOpen)

  const dispatch = useDispatch()

  const list = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <Dashboard />,
        path: "/admin/main",
      },
      {
        title: "Users",
        icon: <PeopleAlt />,
        path: "users",
      },
      {
        title: "actionsLog",
        icon: <ListAlt />,
        path: "actions-log",
      },
    ],
    []
  )

  return (
    <>
      <DrawerHeader isSideBarOpen={isSideBarOpen}>
        <IconButton onClick={() => dispatch(toggleSideBar())}>
          {isSideBarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box flexGrow={1}>
        <List>
          {list.map((item) => (
            <ListItem
              key={item.title}
              disablePadding
              sx={{ display: "block", marginLeft: "5px" }}
            >
              <ItemStyle
                component={NavLink}
                to={item.path}
                isSideBarOpen={isSideBarOpen}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSideBarOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ItemText
                  primary={t(item.title)}
                  isSideBarOpen={isSideBarOpen}
                />
              </ItemStyle>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box
        sx={{
          my: 3,
        }}
      >
        <ListItem disablePadding sx={{ display: "block", marginLeft: "5px" }}>
          <ItemStyle component={NavLink} to="/" isSideBarOpen={isSideBarOpen}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSideBarOpen ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <ExitToApp />
            </ListItemIcon>
            <ItemText primary={t("frontSite")} isSideBarOpen={isSideBarOpen} />
          </ItemStyle>
        </ListItem>
      </Box>
    </>
  )
}
export default AdminSideBar