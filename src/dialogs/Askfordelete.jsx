import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useDeleteGroupMutation } from "../redux/api/apis";
import { useSelector, useDispatch } from "react-redux";
import { setAskForDeleteChat } from "../redux/reducer/dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Askfordelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { askForDeleteChat, selectDeleteChat } = useSelector(
    (state) => state.dialog
  );
  const [deleteGroup] = useDeleteGroupMutation();

  const handleClose = () => {
    dispatch(setAskForDeleteChat(!askForDeleteChat));
  };
  const handleDelete = async () => {
    const toastId = toast.loading("Deleting chat...");
    try {
      const res = await deleteGroup({
        chatId: selectDeleteChat.chatId,
        deletechat: true,
      });

      if (res.data) {
        toast.success("Chat deleted", {
          id: toastId,
        });
        navigate("/");
      } else {
        toast.error(res.error.data.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (e) {
      toast.error("Failed to delete chat", {
        id: toastId,
      });
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog
      open={askForDeleteChat}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: "white",
          padding: "20px",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Delete this chat?</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#000" }}>
          Are you sure you want to delete this chat? This action cannot be
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
          onClick={handleDelete}
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
        >
          Delete chat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Askfordelete;
