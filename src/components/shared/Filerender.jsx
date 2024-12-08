import React from "react";
import { transformImage } from "../../lib/feature.js";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import { Box,IconButton,Typography } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const Filerender = ({ file, url }) => {
  const commonStyles = {
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };
  const getFileNameFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };
  switch (file) {
    case "video":
      return (
        <video
          src={url}
          preload="none"
          controls
          style={{ ...commonStyles, width: "80%", height: "auto", outline:"none" }}
        />
      );

    case "image":
      return (
        <img
          
          style={{
            ...commonStyles,
            objectFit: "contain",
            width: "100%",
            
          }}
          src={transformImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
        />
      );

    case "audio":
      return (
        <audio
          style={{ ...commonStyles }}
          src={url}
          preload="none"
          controls
        />
      );

    default:
      return (
        <Box paddingX={1} paddingY={0.5} gap={1} alignItems={"center"} display={"flex"} borderRadius={"10px"} sx={{backgroundColor:"white"}} border={"1px solid #ccc"}>
        <IconButton sx={{backgroundColor:"#e3effb",padding:"0.8rem"}} >
        <InsertDriveFileIcon
        fontSize="medium"
        sx={{  color:"#12467b",  }}
        />
        </IconButton >
           <Typography sx={{wordBreak: "break-word",}}  variant="caption" display="block">{getFileNameFromUrl(url)}</Typography>
          </Box>
      );
  }
};

export default Filerender;
