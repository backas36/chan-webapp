import { Dashboard, PeopleAlt } from "@mui/icons-material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  styled,
} from "@mui/material"
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
    ],
    []
  )

  return (
    <>
      <DrawerHeader isSideBarOpen={isSideBarOpen}>
        <IconButton onClick={() => dispatch(toggleSideBar())}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
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
              <ItemText primary={t(item.title)} isSideBarOpen={isSideBarOpen} />
            </ItemStyle>
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default AdminSideBar
