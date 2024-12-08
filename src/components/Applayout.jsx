import Tittle from "./shared/Tittle";
import Header from "./Header";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Drawer,
  Backdrop,
} from "@mui/material";
import Chatlist from "./specific/Chatlist";
import { useParams, useNavigate } from "react-router-dom";
import Profile from "./specific/Profile";
import { useMyAllchatQuery } from "../redux/api/apis";
import ChatSkeletonList from "./shared/ChatSkeleton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  setMobileChatDialog,
  setDeleteMenu,
  setSelectDeleteChat,
} from "../redux/reducer/dialog";
import ChatContextMenu from "../dialogs/ChatContextMenu";
import { socketContextProvider } from "../socketContext";
import {
  useContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
  lazy,
  Suspense,
} from "react";
import SocketListener from "../hooks/useSocketlistener";
import {
  NEW_REQUEST,
  NEW_MESSAGE,
  ONLINE_USERS,
  NEW_MESSAGE_CAME,
  REFETCH_CHAT,
  ALERT,
} from "../constants";
import {
  setNotificationCount,
  updateOnlineUsers,
  setNewMessageAlert,
  setLastMessage,
} from "../redux/reducer/realtime";

const AskforClear = lazy(() => import("../dialogs/AskforClear"));
const Askfordelete = lazy(() => import("../dialogs/Askfordelete"));
import toast from "react-hot-toast";

const Applayout = (WrappedComponent) => {
  const ComponentWithLayout = (props) => {
    const navigate = useNavigate();
    const socket = useContext(socketContextProvider);
    const dispatch = useDispatch();
    const { chatId } = useParams();

    const {
      mobileChatDialog,
      isDeletemenu,
      askForClearChat,
      askForDeleteChat,
    } = useSelector((state) => state.dialog);

    const { user } = useSelector((state) => state.auth);

    const { onlineUsers, newMessageAlert, lastMessage } = useSelector(
      (state) => state.realtime
    );

    const { data, isError, isLoading, error, refetch } = useMyAllchatQuery("");

    const [anchorEl, setAnchorEl] = useState(null);

    const handleDelete = (e, _id, groupChat) => {
      e.preventDefault();
      dispatch(setSelectDeleteChat({ chatId: _id, groupChat }));
      setAnchorEl(e.currentTarget);
      dispatch(setDeleteMenu(!isDeletemenu));
    };

    const forMobile = () => {
      dispatch(setMobileChatDialog(!mobileChatDialog));
    };
    const newMessages = useCallback(
      (data) => {
        if (data.chatId == chatId) return;
        dispatch(setNewMessageAlert(data));
      },
      [chatId, dispatch]
    );

    const newRequest = useCallback(() => {
      dispatch(setNotificationCount());
    }, [dispatch]);

    const onlineUser = useCallback(
      (data) => {
        dispatch(updateOnlineUsers([...data]));
      },
      [dispatch]
    );
    const newMessageCame = useCallback(
      ({ chat, content }) => {
        dispatch(setLastMessage({ chat, content }));
      },
      [dispatch]
    );

    const refectChat = useCallback(
      (data) => {
        if (data && data?.chatId == chatId) {
          console.log("refetching");
          navigate("/");
        }
        refetch();
        console.log("refetched");
        
      },
      [refetch, chatId, navigate]
    );

    const alertUser = useCallback((data) => {
      // toast.success(data.message);
    }, []);

    const events = {
      [NEW_MESSAGE]: newMessages,
      [NEW_REQUEST]: newRequest,
      [ONLINE_USERS]: onlineUser,
      [NEW_MESSAGE_CAME]: newMessageCame,
      [REFETCH_CHAT]: refectChat,
      [ALERT]: alertUser,
    };
    SocketListener(socket, events);

    return (
      <>
        <Tittle />
        <Header />

        <Grid container height={"calc(100dvh - 4rem)"}>
          {/* 1st grid */}

          <Grid
            item
            sm={4}
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", sm: "block" },
              background: "white",
              height: `calc(100dvh - 4rem)`,
            }}
          >
            {isError ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="caption" fontSize={"1.5rem"} color="#ccc">
                  Unable to fetch chat.
                </Typography>
              </Box>
            ) : isLoading ? (
              <ChatSkeletonList />
            ) : data.chats.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="caption" fontSize={"1.5rem"} color="#ccc">
                  No chat available.
                </Typography>
              </Box>
            ) : (
              <Chatlist
                chats={data.chats}
                chatId={chatId}
                handleDelete={handleDelete}
                onlineUsers={onlineUsers}
                newMessage={newMessageAlert}
                lastMessageSocket={lastMessage}
              />
            )}

            <Drawer
              sx={{
                display: {
                  xs: "block",
                  sm: "none",
                },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: "75%",
                  height: "100%",
                },
              }}
              open={mobileChatDialog}
              onClose={forMobile}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Typography fontSize={"1.2rem"}>Chats</Typography>
                <IconButton onClick={forMobile}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {isError ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="caption"
                    fontSize={"1.5rem"}
                    color="#ccc"
                  >
                    Unable to fetch chat.
                  </Typography>
                </Box>
              ) : (
                <>
                  {isLoading ? (
                    <ChatSkeletonList />
                  ) : (
                    <Chatlist
                      chats={data.chats}
                      chatId={chatId}
                      handleDelete={handleDelete}
                      onlineUsers={onlineUsers}
                      newMessage={newMessageAlert}
                      lastMessageSocket={lastMessage}
                    />
                  )}
                </>
              )}
            </Drawer>
          </Grid>
          {/* 2nd grid */}
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            lg={6}
            sx={{ background: "white" }}
            height={"100%"}
          >
            <WrappedComponent {...props} key={chatId} chatId={chatId} />
          </Grid>
          {/* 3rd grid */}
          <Grid
            item
            lg={3}
            sx={{
              display: { xs: "none", lg: "block" },
              background: "#171A1C",
              padding: "1.3rem",
            }}
          >
            <Profile />
          </Grid>

          <ChatContextMenu anchorEl={anchorEl} />

          <Suspense fallback={<Backdrop open={true} />}>
            <AskforClear />
          </Suspense>

          <Suspense fallback={<Backdrop open={true} />}>
            <Askfordelete />
          </Suspense>
        </Grid>
      </>
    );
  };

  ComponentWithLayout.displayName = `Applayout(${getDisplayName(
    WrappedComponent
  )})`;

  return ComponentWithLayout;
};
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default Applayout;
