import {
  Cake,
  ChevronLeft,
  ChevronRight,
  ExitToApp,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material"
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectIsSideBarOpen, toggleSideBar } from "../../features/ui"
import sidebarData from "./sidebarData"
import { DrawerHeader, ItemStyle, ItemText } from "./styled"

const AdminSideBar = () => {
  const { t } = useTranslation()
  const isSideBarOpen = useSelector(selectIsSideBarOpen)

  const dispatch = useDispatch()

  const handleSideBarClick = () => {
    dispatch(toggleSideBar())
  }
  const SingleMenuItem = ({ listItem }) => {
    return (
      <ListItem disablePadding sx={{ display: "block", marginLeft: "2px" }}>
        <ItemStyle
          component={NavLink}
          to={listItem.path}
          isSideBarOpen={isSideBarOpen}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: isSideBarOpen ? 1 : "auto",
              justifyContent: "center",
            }}
          >
            {listItem.icon}
          </ListItemIcon>
          <ItemText primary={t(listItem.title)} isSideBarOpen={isSideBarOpen} />
        </ItemStyle>
      </ListItem>
    )
  }

  const CollapseMenuItem = ({ listItems, open }) => {
    return listItems.map((listItem) => (
      <Collapse key={listItem.title} in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            disablePadding
            sx={{ display: "block", marginLeft: "12px" }}
          >
            <ItemStyle
              component={NavLink}
              to={listItem.path}
              isSideBarOpen={isSideBarOpen}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSideBarOpen ? 1 : "auto",
                  justifyContent: "center",
                }}
              >
                {listItem.icon}
              </ListItemIcon>
              <ItemText
                primary={t(listItem.title)}
                isSideBarOpen={isSideBarOpen}
              />
            </ItemStyle>
          </ListItem>
        </List>
      </Collapse>
    ))
  }
  const MultiMenuItem = ({ listItem }) => {
    const [open, setOpen] = useState(true)
    const handleSubMenuClick = () => {
      console.log(isSideBarOpen)
      if (isSideBarOpen) {
        setOpen(!open)
      }
    }
    return (
      <>
        <ListItem
          disablePadding
          sx={{ display: "block", marginLeft: "2px" }}
          onClick={handleSubMenuClick}
        >
          <ItemStyle isSideBarOpen={isSideBarOpen}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSideBarOpen ? 1 : "auto",
                justifyContent: "center",
              }}
            >
              {listItem.icon}
            </ListItemIcon>
            <ItemText
              primary={t(listItem.title)}
              isSideBarOpen={isSideBarOpen}
            />

            {isSideBarOpen && (
              <IconButton sx={{ pr: 1.5 }}>
                {open ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ItemStyle>
        </ListItem>
        <CollapseMenuItem
          open={isSideBarOpen ? open : false}
          listItems={listItem.items}
          parentTitle={listItem.title}
        />
      </>
    )
  }

  return (
    <>
      <DrawerHeader isSideBarOpen={isSideBarOpen}>
        <IconButton onClick={handleSideBarClick} sx={{ pr: 1.5 }}>
          {isSideBarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box flexGrow={1}>
        <List>
          {sidebarData.map((listItem) => {
            if (!listItem.items) {
              return <SingleMenuItem key={listItem.title} listItem={listItem} />
            }

            return <MultiMenuItem key={listItem.title} listItem={listItem} />
          })}
        </List>
      </Box>
      <Divider />
      <Box
        sx={{
          my: 1.5,
        }}
      >
        <ListItem disablePadding sx={{ display: "block", marginLeft: "5px" }}>
          <ItemStyle component={NavLink} to="/" isSideBarOpen={isSideBarOpen}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSideBarOpen ? 1 : "auto",
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
