import React from "react";
import { Stack, Avatar, Typography, Box } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ScheduleIcon from "@mui/icons-material/Schedule";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const {user} = useSelector((state) => state.auth);
  return (
    <Stack marginTop={"4rem"} spacing={3} alignItems={"center"} width="100%">
      <Avatar
        sx={{
          height: 140,
          width: 140,
          objectFit: "cover",
          // border: "2px solid white",
        }}
        src={user?.avtar?.url}
      />

      <Box textAlign="center">
        <Typography
          sx={{
            color: "#ccc",
          }}
          variant="h5"
          component="div"
        >
          {user?.name}
        </Typography>

        <Box display="flex" alignItems={"center"} justifyContent="flex-start">
          <AlternateEmailIcon color="primary" sx={{ fontSize: "17px" }} />
          <Typography
            sx={{
              color: "Highlight",
            }}
            variant="subtitle1"
            color="textSecondary"
          >
            {user?.username}
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          color: "white",
        }}
        variant="body1"
        textAlign="justify"
        px={2}
      >
        This is the user bio. It can be a brief description or any other
        information the user wants to share.
      </Typography>

      <Box display="flex" alignItems="center">
        <ScheduleIcon fontSize="small" sx={{ color: "white", mr: 0.5 }} />
        <Typography
          sx={{
            fontSize: "13px",
            color: "white",
          }}
          variant="caption"
        >
          Joined {moment(user?.createdAt).fromNow()}
        </Typography>
      </Box>
    </Stack>
  );
};

export default Profile;
