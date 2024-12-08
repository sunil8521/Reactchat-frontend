import { Typography, Stack, Box } from "@mui/material";
import React, { memo } from "react";
import moment from "moment";
import Filerender from "../shared/Filerender"
import { fileFormat } from "../../lib/feature.js";



const Messages = ({ message, user }) => {
  const { content, attachment = [], sender, createdAt } = message;
  // const formattedDate = moment(createdAt).format("dddd h:mma");
  const formattedDate = moment(createdAt).format("MMMM D, h:mma");


  const sameSender = sender?._id === user?._id;

  return (
    <div
      style={{
        maxWidth: "80%",
        alignSelf: sameSender ? "flex-end" : "flex-start",
        width: "fit-content",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography variant="caption">
          {" "}
          {!sameSender ? `@${sender.username}` : "You"}
        </Typography>

        <Typography variant="caption">{formattedDate}</Typography>
      </Stack>
      {content && (
        <Typography
          sx={{
            backgroundColor: sameSender ? "#0b6bcb" : "white",
            px: 1.75,
            py: 1.25,
            borderRadius: "15px",
            borderTopRightRadius: sameSender ? 0 : "15px",
            borderTopLeftRadius: sameSender ? "lg" : 0,
            color: sameSender ? "white" : "black",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",  
            overflowWrap: "break-word",  // This ensures long words break onto the next line
            // maxWidth: "100%",
          }}
        >
          {content}
        </Typography>
      )}

      {attachment.length > 0 &&
        attachment.map((attachment, index) => {
          const url = attachment.url;
        
          const file = fileFormat(url);
          
          return (
            
              <Box key={index} >
                <a

                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={true}
                  style={{ margin:"5px 0", color: "black",display:"flex" ,justifyContent:sameSender ? "flex-end" : "flex-start", }}
                >
                  
                  <Filerender file={file} url={url} />
                  
                </a>
              </Box>
          
          );
        })}


    </div>
  );
};

export default memo(Messages);

