import { useInputValidation } from "6pp";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  Stack,
  TextField
} from "@mui/material";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Searchitem from "../components/map/Searchitem";
import Whenerror from "../components/styled/Whenerror";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../redux/api/apis.js";
import { setSearchDialog } from "../redux/reducer/dialog";

const Searchdialog = () => {
  const dispatch = useDispatch();
  const { searchDialog } = useSelector((state) => state.dialog);

  const [searchUser, { data, isLoading, error, isError }] =
    useLazySearchUserQuery();

  const [
    sendFriendRequest,
    {isLoading: friendLoading },
  
  ] = useSendFriendRequestMutation();


  const handleClose = () => {
    dispatch(setSearchDialog(!searchDialog));
  };

  const search = useInputValidation("");

  const addFriend = async(id) => {
    try{
     const res= await sendFriendRequest({ recever: id });
     if(res.data){
      toast.success("Friend request sent")
     }else{
      toast.error(res.error.data.message||"Something went wrong")
     }
    }catch(er){
      toast.error("Something went wrong")

    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUser(search.value);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [search.value]);

  return (
    <>
      <Dialog
        open={searchDialog}
        onClose={handleClose}
        sx={{ borderRadius: "10px" }}
        PaperProps={{
          sx: {
            paddingBottom: "20px",
            backgroundColor: "#f5f5f5",
            paddingX: "30px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "600", paddingX: "0" }}>
          Search People
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[600],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Stack spacing={"1rem"} direction={"column"} maxWidth={"20rem"}>
          <TextField
            sx={{
              padding: "2px",
              marginBottom: "1rem",
            }}
            value={search.value}
            onChange={search.changeHandler}
            fullWidth
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <List
            sx={{
              height: "190px",
              overflowY: "auto",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              padding: "10px",
            }}
          >
            {isError ? (
              <Whenerror message={"Unable to find friends"} />
            ) : (
              <>
                {isLoading ? (
                  <Stack
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CircularProgress />
                  </Stack>
                ) : (
                  <>
                    {data?.length === 0 && <Whenerror message={"No friends"} />}
                    {data?.map((user) => {
                      return (
                        <Searchitem
                          key={user._id}
                          user={user}
                          handler={addFriend}
                          handlerisLoading={friendLoading}
                        />
                      );
                    })}
                  </>
                )}
              </>
            )}
          </List>
        </Stack>
      </Dialog>
    </>
  );
};

export default Searchdialog;
