/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { Box, Stack, Typography, Badge, IconButton } from "@mui/material";
import { memo, useState } from "react";
import Av from "../shared/Av";
import Groupav from "../shared/Groupav";
import { ChatitemLink } from "../styled/Allstyle";
import moment from "moment";

import Divider from "@mui/material/Divider";
import Lastmessage from "../shared/Lastmessage";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const Chatitem = ({
  av = [],
  name,
  _id,
  username,
  groupChat = false,
  sameSender,
  isOnline,
  newMessage,
  index = 0,
  handleDelete,
  lastMessage,
  inert
}) => {




  return (
    <>
      <ChatitemLink
        to={`/chat/${_id}`}
        sx={{
          flexDirection: "column",
          alignItems: "initial",
          gap: 1,
          background: sameSender ? "#E3F2FD" : "unset",
          transition: "background 0.5s ease",
          "&:hover": {
            background: sameSender ? "":"#F0F4F8",
          },
        }}
        onContextMenu={
          // HandleClose
          (e) => {
            handleDelete(e, _id, groupChat);
          }
        }
        inert={inert}
      >
        <Stack direction="row" spacing={1.5}>
          {av.length === 1 ? (
            <Av av={av} onlineStatuses={isOnline} />
          ) : (
            <Groupav groupAvatars={av} />
          )}

          <Box sx={{ flex: 1 }}>
            <Typography color={"#171a1c"} fontWeight={600} variant="body1">
              {name}
            </Typography>
            {username && (
              <Typography fontSize={"12px"} variant="body2">
                @{username}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              lineHeight: 1.5,
              textAlign: "right",
            }}
          >
            {newMessage && (
              <Badge
                badgeContent={newMessage.count}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    width: 17,
                    height: 17,
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.75rem",
                  },
                }}
              ></Badge>
            )}
            <Typography
              variant="body2"
              display={{ xs: "none", md: "block" }}
              noWrap
            >
              {lastMessage ? moment(lastMessage.createdAt).fromNow() : ""}
            </Typography>

            <IconButton
            onClick={ (e) => {
              handleDelete(e, _id, groupChat);
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              cursor: "pointer",
            }}
            >
            <MoreVertIcon/>
            </IconButton>

            
          </Box>
        </Stack>

        <Typography
          variant="body2"
          fontSize={"13px"}
          sx={{
            fontStyle: !lastMessage ? "italic" : "normal",
            marginTop: "10px",
            fontWeight: 100,
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {lastMessage?.content ? (
            lastMessage.content
          ) : lastMessage ? (
            <Lastmessage />
          ) : (
            "No Messages"
          )}
        </Typography>
      </ChatitemLink>
      <Divider sx={{ padding: 0, margin: 0 }} />

      
    </>
  );
};

export default memo(Chatitem);
