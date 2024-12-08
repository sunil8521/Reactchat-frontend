import React from "react";
import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const MainAvatar = styled(Avatar)({
  width: 60,
  height: 60,
  border: "2px solid white",
  marginRight: "10px"
});



const Groupav = ({ groupAvatars = [], mainAvatar }) => {
  return (
    <Box
           
    sx={{
      position: "relative",
      width: 50,
      height: 50,
    }}
  >
    <Avatar
      src={groupAvatars[0]}
      alt="Avatar 1"
      sx={{
        width: 40,
        height: 40,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
    <Avatar
      src={groupAvatars[1]}
      alt="Avatar 2"
      sx={{
        width: 40,
        height: 40,
        position: "absolute",
        bottom: -5,
        right: -5,
        border: "2px solid white"
      }}
    />
  </Box>
  );
};

export default Groupav;
