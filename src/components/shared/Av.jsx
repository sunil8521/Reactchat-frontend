import React from "react";
import { Badge, Avatar, AvatarGroup, Box } from "@mui/material";

const Av = ({ av = [], max = 4, onlineStatuses }) => {
  return (
    <>
      <Box>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Box
              sx={{
                width: 13,
                height:13,
                borderRadius: "50%",
                bgcolor: onlineStatuses ? "#06D001" : "#ccc",
                border: "2px solid white",
              }}
            />
          }
        >
          <Avatar
            sizes=""
            src={av[0]}
            alt={"user avtar"}
            sx={{
              width: 50,
              height: 50,
            }}
          />
        </Badge>
      </Box>
    </>
  );
};

export default Av;
// sx={{ "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 12 } }}
