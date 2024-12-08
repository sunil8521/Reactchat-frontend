import React, { Suspense, lazy, useContext } from "react";
import {
  Box,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
  Tooltip,
  Badge,
  Backdrop,
  Drawer,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import LogoutIcon from "@mui/icons-material/Logout";

const Searchdialog = lazy(() => import("../dialogs/Searchdialog"));
const Notificationdialog = lazy(() => import("../dialogs/Notificationdialog"));
const Newgroupdialog = lazy(() => import("../dialogs/Newgroupdialog"));


import axios from "axios";
import { server } from "../constants";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { unsetUser } from "../redux/reducer/auth";
import { resetNotificationCount } from "../redux/reducer/realtime";
import {
  setMobileChatDialog,
  setCreateGroupDialog,
  setNotificationDialog,
  setSearchDialog,
} from "../redux/reducer/dialog";
import { socketContextProvider } from "../socketContext";



const Header = () => {
  const dispatch = useDispatch();
  const socket=useContext(socketContextProvider)

  const {
    mobileChatDialog,
    searchDialog,
    notificationDialog,
    createGroupDialog,
  } = useSelector((state) => state.dialog);
  const {notificationCount} = useSelector((state) => state.realtime);


  const navigateTo = useNavigate();

  const forMobile = () => {
    dispatch(setMobileChatDialog(!mobileChatDialog));
  };

  const navigateGroup = () => navigateTo("/groups");

  const openNotification = () => {
    dispatch(resetNotificationCount());
    dispatch(setNotificationDialog(!notificationDialog));
  };
  const openSearch = () => {
    dispatch(setSearchDialog(!searchDialog));
  };

  const newGroup = () => {
    dispatch(setCreateGroupDialog(!createGroupDialog));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar>
          <Toolbar>
            <Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
                onClick={forMobile}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: "600",
                  letterSpacing: "1px",
                  fontFamily: "serif",
                }}
              >
                ReactChat
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* sx={{ display: { xs: "none", md: "flex" } }} */}

            <Box>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={openNotification}
              >
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton size="large" color="inherit" onClick={openSearch}>
                <SearchIcon />
              </IconButton>

              <Tooltip title="Create new group" arrow>
                <IconButton size="large" color="inherit" onClick={newGroup}>
                  <GroupAddIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Manage groups" arrow>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={navigateGroup}
                >
                  <GroupsIcon />
                </IconButton>
              </Tooltip>

              <IconButton
                onClick={async () => {
                  try {
                    const { data } = await axios.get(
                      `${server}/api/v1/user/logout`,
                      {
                        withCredentials: true,
                      }
                    );
                    toast.success(data.message);
                    dispatch(unsetUser());
                    socket.disconnect(true);
                  } catch (er) {
                    toast.success(
                      er?.response?.data?.message || "Inter Server Error"
                    );
                  }
                }}
                size="large"
                edge="end"
                color="inherit"
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {searchDialog && (
        <Suspense fallback={<Backdrop open />}>
          <Searchdialog />
        </Suspense>
      )}

      
      {notificationDialog && (
        <Suspense fallback={<Backdrop open />}>
          <Notificationdialog />
        </Suspense>
      )}
      {createGroupDialog && (
        <Suspense fallback={<Backdrop open />}>
          <Newgroupdialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
