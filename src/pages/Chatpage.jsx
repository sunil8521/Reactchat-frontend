import { Button, IconButton, Stack, TextareaAutosize } from "@mui/material";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  Fragment,
} from "react";
import { useForm } from "react-hook-form";
import Applayout from "../components/Applayout";
import { useNavigate } from "react-router-dom";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Messages from "../components/map/Messages";

import Inputmenu from "../dialogs/Inputmenu";

import { useInfiniteScrollTop } from "6pp";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import MessageSkeleton from "../components/shared/MessageSkeleton";
import { NEW_MESSAGE_CAME, LAST_MESSAGE } from "../constants.js";
import SocketListener from "../hooks/useSocketlistener";
import {
  useGetOldMessageQuery,
  useMyChatMembersQuery,
} from "../redux/api/apis.js";
import { setFileMenu } from "../redux/reducer/dialog";
import { removeMessageAlert } from "../redux/reducer/realtime";
import { socketContextProvider } from "../socketContext";
import toast from "react-hot-toast";

const Chat = ({ chatId }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const socket = useContext(socketContextProvider);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeMessageAlert({ chatId }));
  }, [chatId, dispatch]);

  const containerRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  const [page, setPage] = useState(1);
  const [socketMessage, setSocketMessage] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

  const { isFilemenu } = useSelector((state) => state.dialog);

  const HandleOpenFileMenu = (event) => {
    dispatch(setFileMenu(!isFilemenu));
    setAnchorEl(event.currentTarget);
  };

  const { user } = useSelector((state) => state.auth);

  const myChatMembers = useMyChatMembersQuery({ chatId, skip: !chatId });

  const databaseMessage = useGetOldMessageQuery({
    chatId,
    page,
  });
  useEffect(() => {
    if (databaseMessage.isError) {
      toast.error(databaseMessage.error.data.message);
      navigate("/");
    }
  }, [databaseMessage.isError, navigate, databaseMessage.error]);
  const { data: databaseMessages, setData: setDatabaseMessages } =
    useInfiniteScrollTop(
      containerRef,
      databaseMessage.data?.totalPage,
      page,
      setPage,
      databaseMessage.data?.allMessages
    );

  const onSubmit = ({ message }) => {
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE_CAME, {
      chatId,
      members: myChatMembers?.data?.chat?.members,
      message: message.trim(),
    });
    // socket.emit(LAST_MESSAGE,{chatId,   members: myChatMembers?.data?.chat?.members,message: message.trim()})
    reset();
  };
  const newMessageCame = useCallback(
    (data) => {
      if (data.chat.toString() !== chatId.toString()) return;
      setSocketMessage((prev) => [...prev, data]);
    },
    [chatId]
  );
  const refetchMessage = useCallback(() => {
    setPage(1);
    setDatabaseMessages([]);
    setSocketMessage([]);
    // databaseMessage.refetch();
  }, [
    // databaseMessage,
    setDatabaseMessages,
    setPage,
  ]);
  // const events = {
  //   [NEW_MESSAGE_CAME]: newMessageCame,
  // };
  // SocketListener(socket, events);
  useEffect(() => {
    socket.on(NEW_MESSAGE_CAME, newMessageCame);
    socket.on("REFETCH_MESSAGE", refetchMessage);

    return () => {
      socket.off(NEW_MESSAGE_CAME, newMessageCame);
      socket.off("REFETCH_MESSAGE", refetchMessage);
    };
  }, [socket, newMessageCame, refetchMessage]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [socketMessage]);

  const allMessages = [...databaseMessages, ...socketMessage];

  return myChatMembers.isLoading ? (
    <MessageSkeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        backgroundColor={"#f0f4f8"}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        height={"77%"}
        sx={{ overflowY: "auto", overflowX: "hidden" }}
      >
        {databaseMessage.isFetching && <LoadingSpinner thick={2.1} />}
        {allMessages.map((i, key) => (
          <Messages key={key} message={i} user={user} />
        ))}

        <div ref={endOfMessagesRef} />
      </Stack>

      {/* to send message */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "white",
          margin: "0 10px 10px 10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <TextareaAutosize
          placeholder="Type something here…"
          aria-label="Message"
          minRows={6}
          maxRows={10}
          style={{
            borderRadius: "5px",
            fontFamily: "sans-serif",
            fontSize: "16px",
            letterSpacing: "0.5px",
            width: "100%",
            padding: "10px",
            outline: "none",
            border: "none",
            maxHeight: "4.5rem",
            overflow: "auto",
            resize: "none",
          }}
          {...register("message")}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexGrow={1}
          sx={{
            py: 1,
            pr: 1,
            borderTop: "1px solid",
            borderColor: "divider",
            mt: 1,
          }}
        >
          <div>
            <IconButton
              size="small"
              color="default"
              onClick={HandleOpenFileMenu}
            >
              <FormatListBulletedRoundedIcon />
            </IconButton>
          </div>
          <Button
            type="submit"
            size="small"
            color="primary"
            variant="contained"
            sx={{ fontWeight: 600, borderRadius: "4px" }}
            endIcon={<SendRoundedIcon />}
          >
            Send
          </Button>
        </Stack>
      </form>

      <Inputmenu anchorEl={anchorEl} chatId={chatId} />
    </Fragment>
  );
};
const ChatWithLayout = Applayout(Chat);

export default ChatWithLayout;
// export default  Applayout()(Chat);
