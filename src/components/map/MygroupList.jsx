import { memo } from "react";
import { ChatitemLink } from "../styled/Allstyle";
import Av from "../shared/Av";
import Groupav from "../shared/Groupav";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import{useDispatch,useSelector} from "react-redux"
import { setMobileGroupDialog } from "../../redux/reducer/dialog";

import { Box, IconButton, Stack, Typography } from "@mui/material";
const MygroupList = ({ group, chatId }) => {
  const { name, avtar, _id } = group;
  const { mobileGroupDialog } = useSelector((state) => state.dialog);
  const dispatch = useDispatch();
  const mobile = () => {
    dispatch(setMobileGroupDialog(!mobileGroupDialog));
  };



  return (
    <>
   
          <Divider sx={{ padding: 0, margin: 0 }} />

          <ChatitemLink
            sx={{
              background: chatId === _id ? "#E3F2FD" : "unset",
              "&:hover": {
                background: chatId === _id ? "" : "#F0F4F8",
              },
            }}
            to={`?group=${_id}`}
            onClick={(e) => {
              if (chatId === _id) e.preventDefault();
              if(mobileGroupDialog){
                console.log("mobile")
                mobile()
              }
            }}
          >
            <Stack direction="column"  alignItems="flex-start">
              <Box sx={{ flex: 1 }}>
                <Typography color="#171a1c" fontWeight={600} variant="body1" fontSize={16}>
                  {name}
                </Typography>
              </Box>
              <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 30, height: 30,color:"black" ,fontWeight:600,fontSize:"1rem" }}}>
                {avtar.map((av, index) => (
                  <Avatar key={index} src={av} sx={{ width: 30, height: 20 }} />
                ))}
              </AvatarGroup>



            </Stack>
          </ChatitemLink>
        </>
 
  );
};

export default memo(MygroupList);
