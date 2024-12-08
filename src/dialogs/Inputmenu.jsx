import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFileMenu, setUploadingUploader } from "../redux/reducer/dialog";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import toast from "react-hot-toast";
import {useSendAttachmentMutation} from "../redux/api/apis"

const Inputmenu = ({ anchorEl ,chatId}) => {

  const { isFilemenu, uploadingUploader } = useSelector(
    (state) => state.dialog
  );
  const dispatch = useDispatch();

  const documentInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const[SendToServer]=useSendAttachmentMutation()


  const HandleClose = () => {
    dispatch(setFileMenu(!isFilemenu));
  };

  const triggerFileInput = (inputRef) => {
    inputRef.current.click(); 
  };

  const FileChange =async (e, key) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    if (fileArray.length == 0) return;
    if (fileArray.length > 5) {
      return toast.error(`You can't upload more than 5 ${key} at a time`);
    }

    // Set the uploadingUploader to true
    dispatch(setUploadingUploader(true));
    const toastId = toast.loading(`Sending ${key}`);

    try {
      const form=new FormData()
      fileArray.forEach((file)=>form.append("files",file))
      form.append("chatId",chatId)

      HandleClose()
      const res=await SendToServer(form)

      if(res.data){
        toast.success(`${key} sent`,{
          id: toastId,
        })
      }else{
        toast.error(res.error?.data?.message||`Failed to send ${key}`,{
          id: toastId,
        })
      }

      

    } catch (er) {
      toast.error(er.message, {
        id: toastId,
      });
    } finally {
      dispatch(setUploadingUploader(false));
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={isFilemenu}
      onClose={HandleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <MenuItem
        onClick={() => {
          triggerFileInput(documentInputRef);
        }}
      >
        <IconButton>
          <TextSnippetIcon />
        </IconButton>
        <Typography>Documents</Typography>
        <input
          ref={documentInputRef}
          type="file"
          accept=".txt, .pdf"
          style={{ display: "none" }}
          multiple
          onChange={(e) => {FileChange(e, "document")}}
        />
      </MenuItem>

      <MenuItem
        onClick={() => {
          triggerFileInput(photoInputRef);
        }}
      >
        <IconButton>
          <PhotoLibraryIcon />
        </IconButton>
        <Typography>Photos</Typography>
        <input
          ref={photoInputRef}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          style={{ display: "none" }}
          multiple
          onChange={(e) => FileChange(e, "image")}
        />
      </MenuItem>

      <MenuItem
        onClick={() => {
          triggerFileInput(videoInputRef);
        }}
      >
        <IconButton>
          <VideoLibraryIcon />
        </IconButton>
        <Typography>Videos</Typography>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/mp4, video/ogg, video/webm, video/mkv"
          style={{ display: "none" }}
          multiple
          onChange={(e) => FileChange(e, "video")}
        />
      </MenuItem>

      <MenuItem
        onClick={() => {
          triggerFileInput(audioInputRef);
        }}
      >
        <IconButton>
          <AudioFileIcon />
        </IconButton>
        <Typography>Audio</Typography>
        <input
          ref={audioInputRef}
          type="file"
          accept="audio/mpeg, audio/wav"
          style={{ display: "none" }}
          multiple
          onChange={(e) => FileChange(e, "audio")}
        />
      </MenuItem>
    </Menu>
  );
};

export default Inputmenu;
