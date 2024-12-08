import { memo } from "react";
import { ListItem, Stack, Avatar, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const NotificationItem = ({ sender, _id, handler }) => {
  


  return (
    <ListItem sx={{ marginY: "5px", padding: "0" }}>
      <Stack
     direction={"row" }
     alignItems={ "center" }
     spacing={ "1rem" }
        sx={{ width: "100%" }}
      >
        <Avatar src={sender.avtar} />
        <Typography
          color={"black"}
          sx={{
            maxWidth:"120px",
            flexGrow: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {sender.name}
        </Typography>
        {/* <Typography
          color={"#5296d9"}
          variant="subtitle2"
          
          sx={{
            
            display:'flex',
            justifyContent: { xs: "start", sm: "end" },
            width: { xs: "100%", sm: "auto" }
            
          }}
        >
          sent you friend request
        </Typography> */}
        <IconButton
         onClick={()=>{handler({_id,accept:true})}}
          sx={{
            backgroundColor: "#4caf50",
            color: "white",
            "&:hover": {
              backgroundColor: "#388e3c",
            },
            p: 0.5 
          }}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
           onClick={()=>{handler({_id,accept:false})}}
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
            p: 0.5 
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(NotificationItem);
