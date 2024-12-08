import React from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  List,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NotificationItem from "../components/map/NotificationItem";
import { useSelector, useDispatch } from "react-redux";
import { setNotificationDialog } from "../redux/reducer/dialog";
import {
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
} from "../redux/api/apis.js";
import Whenerror from "../components/styled/Whenerror";
import toast from "react-hot-toast";

const Notificationdialog = () => {
  const { data, isError, isLoading } = useGetNotificationsQuery();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const dispatch = useDispatch();
  const { notificationDialog } = useSelector((state) => state.dialog);

  const handleClose = () => {
    dispatch(setNotificationDialog(!notificationDialog));
  };

  const FriendRequest = async ({ _id, accept }) => {
    try {
      const res = await acceptFriendRequest({ requestId: _id, accept });
      console.log(res)
      if (res.data.success) {
        //use socket
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Somthing went wrong");
      }
    } catch (er) {
      toast.error(er?.response?.data.message || "Somthing went wrong");
    }
    dispatch(setNotificationDialog(!notificationDialog));
  };

  return (
    <>
      <Dialog
        open={notificationDialog}
        onClose={handleClose}
        sx={{ borderRadius: "10px" }}
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
            maxWidth: "320px",
            width: "90%",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "600", padding: "0 0 10px 0" }}>
          Friend Requests
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[600],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Stack spacing={"1rem"} direction={"column"} maxWidth={"30rem"}>
          <List
            sx={{
              maxHeight: "230px",
              overflowY: "auto",
              padding: "0 1rem",
            }}
          >
            {data?.modifyRequest.length !== 0 ? (
              <>
                {isError ? (
                  <Whenerror message={"Unable to find friends"} />
                ) : (
                  <>
                    {isLoading ? (
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <CircularProgress />
                      </Stack>
                    ) : (
                      <>
                        {data?.modifyRequest?.map((i) => (
                          <NotificationItem
                            key={i._id}
                            sender={i.sender}
                            _id={i._id}
                            handler={FriendRequest}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </List>
        </Stack>
      </Dialog>
    </>
  );
};

export default Notificationdialog;
