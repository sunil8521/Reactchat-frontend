import { Menu, MenuItem, Stack } from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteMenu,
  setAskForDeleteChat,
  setAskForClearChat,
} from "../redux/reducer/dialog";

const ChatContextMenu = ({ anchorEl }) => {
  const dispatch = useDispatch();
  const { isDeletemenu, askForDeleteChat, askForClearChat, selectDeleteChat } =
    useSelector((state) => state.dialog);

  const HandleClose = () => {
    dispatch(setDeleteMenu(!isDeletemenu));
  };
  const onDelete = () => {
    dispatch(setDeleteMenu(false));
    dispatch(setAskForDeleteChat(!askForDeleteChat));
  };

  const onRemove = () => {
    dispatch(setDeleteMenu(false));
    dispatch(setAskForClearChat(!askForClearChat));
  };
  const onleave = () => {


    
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={isDeletemenu}
      onClose={HandleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {selectDeleteChat.groupChat ? (
        <MenuItem onClick={onleave}>Leave Group</MenuItem>
      ) : (
        [
          <MenuItem key="delete" onClick={onDelete}>
            Delete Chat
          </MenuItem>,

          <MenuItem key="remove" onClick={onRemove}>
            Clear Chat
          </MenuItem>,
        ]
      )}
      <MenuItem onClick={HandleClose}>Close</MenuItem>
    </Menu>
  );
};

export default ChatContextMenu;
