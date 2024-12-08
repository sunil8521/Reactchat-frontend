/* eslint-disable react/prop-types */
import React from "react";
import { Stack } from "@mui/material";
import Chatitem from "../map/Chatitem";

const Chatlist = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessage = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDelete,
  lastMessageSocket = [
    {
      chat: "",
      content: "",
    },
  ],
}) => {
  return (
    <Stack
      width={w}
      sx={{
        overflowY: "auto",
        height: `calc(100dvh - 4rem)`,
      }}
    >
      {chats?.map((data, index) => {
        const { name, avtar, _id, groupChat, members, username, lastMessage } =
          data;


          const lastMessages = lastMessageSocket.find(
            (socketMessage) => socketMessage.chat === _id
          );
          // console.log(lastMessages)
          
          const messageToDisplay = lastMessages ? lastMessages : lastMessage;
          // console.log(messageToDisplay)

        const newMessageAlert = newMessage.find(({ chatId }) => chatId === _id);
        const isOnline = members?.some((member) =>
          onlineUsers.includes(member)
        );

        return (
          <Chatitem
            lastMessage={messageToDisplay}
            key={_id}
            username={username}
            index={index}
            newMessage={newMessageAlert}
            isOnline={isOnline}
            av={avtar}
            groupChat={groupChat}
            name={name}
            _id={_id}
            sameSender={chatId === _id}
            handleDelete={handleDelete}
          />
        );
      })}
    </Stack>
  );
};

export default Chatlist;
