/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo } from "react";
import { ListItem, Stack, Avatar, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Searchitem = ({ user, handler, handlerisLoading, isAdded = false }) => {
  const { _id, avtar, name } = user;

  return (
    <>
      <ListItem sx={{ marginY: "5px", padding: "0" }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"1rem"}
          paddingX={"10px"}
          sx={{ width: "100%" }}
        >
          <Avatar src={avtar} />

          <Typography
            color={"black"}
            sx={{
              flexGrow: 1,

              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>

          <IconButton
            onClick={() => {
              handler(_id);
            }}
            disabled={handlerisLoading}
            sx={{
              p: 0.5,
              bgcolor: isAdded ? "error.main" : "primary.main",
              color: "white",
              "&:hover": {
                bgcolor: isAdded ? "error.dark" : "primary.dark",
              },
            }}
          >
            {isAdded ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </Stack>
      </ListItem>
    </>
  );
};

export default memo(Searchitem);
