import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setAskForClearChat } from "../redux/reducer/dialog";
import { useDeleteGroupMutation } from "../redux/api/apis";
import toast from "react-hot-toast";

const AskforClear = ({ id }) => {
  const dispatch = useDispatch();
  const { askForClearChat, selectDeleteChat } = useSelector(
    (state) => state.dialog
  );
  const [deleteGroup] = useDeleteGroupMutation();
  const handleClose = () => {
    dispatch(setAskForClearChat(!askForClearChat));
  };

  const handleClear = async () => {
    const toastId = toast.loading("Clearing chat history...");
    try {
      const res = await deleteGroup({
        chatId: selectDeleteChat.chatId,
        deletechat: false,
      });
      if (res.data) {
        toast.success("Chat history cleared", {
          id: toastId,
        });
      } else {
        toast.error(res.error.data.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to clear chat history", {
        id: toastId,
      });
    } finally {
      handleClose();
    }
  };
  return (
    <Dialog
      open={askForClearChat}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: "white",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Clear chat history?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#000" }}>
          Are you sure you want to clear the chat history? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="error"
          sx={{ fontWeight: "bold" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleClear}
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
        >
          Clear chat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AskforClear;
