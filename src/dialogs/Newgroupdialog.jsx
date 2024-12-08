import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import Searchitem from "../components/map/Searchitem";
import { useInputValidation } from "6pp";
import { useSelector, useDispatch } from "react-redux";
import { setCreateGroupDialog } from "../redux/reducer/dialog";
import {
  useLazyMyFriendsQuery,
  useCreateNewGroupMutation,
} from "../redux/api/apis";
import Whenerror from "../components/styled/Whenerror";
import toast from "react-hot-toast";

const Newgroupdialog = () => {
  const dispatch = useDispatch();
  const { createGroupDialog } = useSelector((state) => state.dialog);
  const closeHandler = () => {
    dispatch(setCreateGroupDialog(!createGroupDialog));
  };
  const groupName = useInputValidation("");
  const [CreateGroup, { isLoading: groupLoading }] =
    useCreateNewGroupMutation();
  const [
    GetMyFriends,
    { data: friends, isLoading: friendsLoading, isError: friendsError },
  ] = useLazyMyFriendsQuery();

  useEffect(() => {
    GetMyFriends();
  }, [GetMyFriends]);

  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const createNewGroupHandler = async () => {
    if (groupName.value.trim().length === 0) {
      return;
    }
    const toastId = toast.loading("Creating group...");
    try {
      const res = await CreateGroup({
        name: groupName.value.trim(),
        members: selectedMembers,
      });
      if (res.data) {
        toast.success("Group created", {
          id: toastId,
        });
      } else {
        toast.error(res.error.data.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (er) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      closeHandler();
    }
  };
  return (
    <Dialog
      open={createGroupDialog}
      onClose={closeHandler}
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
        Create Group
      </DialogTitle>

      <Stack spacing={"1rem"} direction={"column"} maxWidth={"20rem"}>
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          sx={{
            padding: "2px",
            marginBottom: "1rem",
          }}
          fullWidth
          variant="outlined"
          placeholder="Enter group name..."
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
          {friendsLoading && (
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
          )}
          {friendsError && <Whenerror message={"Unable to fetch friends"} />}
          {!friendsLoading && friends && friends.length === 0 && (
            <p>No friends found.</p>
          )}

          {friends?.friends.map((i) => (
            <Searchitem
              key={i._id}
              user={i}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </List>
        <Stack direction={"row"} justifyContent="space-around">
          <Button
            onClick={closeHandler}
            disabled={groupLoading}
            variant="outlined"
            sx={{ fontWeight: "600" }}
            color="error"
          >
            cancel
          </Button>
          <Button
            disabled={groupLoading}
            onClick={createNewGroupHandler}
            variant="contained"
            sx={{ fontWeight: "600" }}
            color="success"
          >
            create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default Newgroupdialog;
