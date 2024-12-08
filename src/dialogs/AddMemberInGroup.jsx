import { useEffect, useState } from "react";
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

import { setAskForAddMember } from "../redux/reducer/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyMyFriendsQuery,
  useAddMemberInGroupMutation,
} from "../redux/api/apis";
import Searchitem from "../components/map/Searchitem";
import Whenerror from "../components/styled/Whenerror";
import toast from "react-hot-toast";

const AddMemberInGroup = ({ chatId }) => {
  const dispatch = useDispatch();
  const { askForAddMember } = useSelector((state) => state.dialog);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const closeHandler = () => {
    dispatch(setAskForAddMember(!askForAddMember));
  };

  const [
    GetMyFriends,
    { data: friends, isLoading: friendsLoading, isError: friendsError },
  ] = useLazyMyFriendsQuery();
  const [AddMemberInGroup, { isLoading: groupLoading }] =
    useAddMemberInGroupMutation();

  useEffect(() => {
    GetMyFriends();
  }, [GetMyFriends]);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  console.log(selectedMembers);
  const addNewGroupHandler = async () => {
    if (selectedMembers.length === 0) return;

    const toastId = toast.loading("Adding members...");
    try {
      const res = await AddMemberInGroup({
        members: selectedMembers,
        groupId: chatId,
      });
      if (res.data) {
        toast.success("Members added successfully", { id: toastId });
      } else {
        toast.error(res.error.data.message || "Unable to add members", {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Unable to add members", { id: toastId });
    } finally {
      closeHandler();
    }
  };

  return (
    <Dialog
      open={askForAddMember}
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
        Add Members
      </DialogTitle>

      <Stack spacing={"1rem"} direction={"column"} maxWidth={"20rem"}>
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
            onClick={addNewGroupHandler}
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

export default AddMemberInGroup;
