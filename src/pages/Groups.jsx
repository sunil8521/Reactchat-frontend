import { memo, useState, useEffect, lazy, Suspense } from "react";
import toast from "react-hot-toast";
import {
  Grid,
  Button,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
  Backdrop,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useSearchParams } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import MygroupList from "../components/map/MygroupList";
import Tittle from "../components/shared/Tittle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Searchitem from "../components/map/Searchitem";
import CheckIcon from "@mui/icons-material/Check";
import {
  useMyGroupQuery,
  useMyChatMembersQuery,
  useUpdateGroupNameMutation,
  useRemoveGroupMembersMutation,
  useDeleteGroupMutation
} from "../redux/api/apis";
import ChatSkeletonList from "../components/shared/ChatSkeleton";
import { useSelector, useDispatch } from "react-redux";
import {
  setMobileGroupDialog,
  setisEditing,
  setAskForDeleteGroup,
  setAskForAddMember,
} from "../redux/reducer/dialog";

const Askgroupdelete = lazy(() => import("../dialogs/Askgroupdelete"));
const AddMemberInGroup = lazy(() => import("../dialogs/AddMemberInGroup"));

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mobileGroupDialog, isEditing, askForDeleteGroup, askForAddMember } =
    useSelector((state) => state.dialog);

  const { data, isLoading, isError } = useMyGroupQuery();

  const {
    data: members,
    isLoading: membersLoading,
    isError: membersError,
  } = useMyChatMembersQuery(
    { chatId, populate: true },
    { skip: !chatId || chatId === "null" }
  );
  const [UpdateGroupNameInDatabase, { isLoading: isUpdatingGroupName }] =
    useUpdateGroupNameMutation();
  const [RemoveGroupMembers, { isLoading: isRemovingGroupMembers }] =
    useRemoveGroupMembersMutation();
  const [groupName, setGroupName] = useState("");
  const [DeleteGroup, { isLoading: groupLoading }] = useDeleteGroupMutation();

  useEffect(() => {
    if (members?.chat) {
      setGroupName(members.chat.name);
    }

    return () => {};
  }, [members]);

  const ForeditIcon = () => {
    dispatch(setisEditing(true));
  };

  const ForsaveIcon = async () => {
    if (groupName.trim() == "") return;
    try {
      const res = await UpdateGroupNameInDatabase({
        chatId: chatId,
        name: groupName.trim(),
      });
      setGroupName(groupName.trim());
      if (res.data) {
        toast.success(res.data.message);
      } else {
        toast.error(res.error.data.message || "Unable to update group name");
      }
    } catch (err) {
      toast.error("Unable to update group name");
    } finally {
      dispatch(setisEditing(false));
    }
  };

  const Home = () => {
    navigate("/");
  };
  const mobile = () => {
    dispatch(setMobileGroupDialog(!mobileGroupDialog));
  };


  
  const RemoveMember = async (_id) => {
    const toastId = toast.loading("Removing member...");
    try {
      const res = await RemoveGroupMembers({
        groupId: chatId,
        userId: _id,
      });
      if (res.data) {
        toast.success(res.data.message, {
          id: toastId,
        });
      } else {
        toast.error(res.error.data.message || "Unable to remove member", {
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to remove member", {
        id: toastId,
      });
    }
  };

  const HandleAskForDeleteGroup = () => {
    dispatch(setAskForDeleteGroup(!askForDeleteGroup));
  };
  const HandleAskForAddMember = () => {
    dispatch(setAskForAddMember(!askForAddMember));
  };

  const handleGroupDelete = async() => {

    const toastId = toast.loading("Deleting group...");
    try {
      const res = await DeleteGroup({
        chatId:chatId,
        deletechat:true,
      });
      if (res.data) {
        toast.success("Group deleted successfully", { id: toastId });
      } else {
        toast.error(res.error.data.message || "Unable to delete group", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete group", { id: toastId });
    
  }finally{
    HandleAskForDeleteGroup()
    navigate('/groups')
  }

  
}

  return (
    <>
      <Tittle title={"Groups"} />
      <Grid container height={"100dvh"}>
        {/* 1st grid */}
        <Grid
          height={"100%"}
          item
          sx={{
            display: {
              sm: "block",
              xs: "none",
            },
            backgroundColor: "",
          }}
          sm={4}
        >
          {isError ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="caption" fontSize={"1.5rem"} color="#ccc">
                Unable to fetch chat.
              </Typography>
            </Box>
          ) : isLoading ? (
            <ChatSkeletonList />
          ) : data.chats.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="caption" fontSize={"1.5rem"} color="#ccc">
                No chat available.
              </Typography>
            </Box>
          ) : (
            <Grouplist myGroups={data.chats} chatId={chatId} forWeb={true} />
          )}

          <Drawer
            anchor="right"
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
              "& .MuiDrawer-paper": {
                width: "100%",
                height: "100%",
              },
            }}
            open={mobileGroupDialog}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <Typography fontSize={"1.2rem"}>Groups</Typography>
              <IconButton onClick={mobile}>
                <CloseIcon />
              </IconButton>
            </Box>

            {isError ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="caption" fontSize={"1.5rem"} color="#ccc">
                  Unable to fetch chat.
                </Typography>
              </Box>
            ) : isLoading ? (
              <ChatSkeletonList />
            ) : data.chats.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Typography variant="caption" fontSize={"1.5rem"} color="#ccc">
                  No chat available.
                </Typography>
              </Box>
            ) : (
              <Grouplist myGroups={data.chats} chatId={chatId} />
            )}
          </Drawer>
        </Grid>

        {/* 2nd grid */}
        <Grid
          item
          sx={{
            p: 2,
          }}
          xs={12}
          sm={8}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <IconButton
              onClick={Home}
              sx={{
                color: "black",
                backgroundColor: "#C7DFF7",
                ":hover": {
                  bgcolor: "#97C3F0",
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={mobile}
              sx={{
                color: "black",
                display: {
                  xs: "block",
                  sm: "none",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* start show group details */}
          {!members ? (
            <Box
              sx={{
                height: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                color={"#ccc"}
                variant="h5"
                fontWeight={600}
                sx={{
                  fontSize: {
                    xs: "1.2rem",
                    md: "1.5rem",
                  },
                }}
              >
                No group selected
              </Typography>
            </Box>
          ) : membersLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",
                  mb: 2,
                }}
              >
                {isEditing ? (
                  <>
                    <TextField
                      fontWeight={600}
                      value={groupName}
                      onChange={(e) => {
                        setGroupName(e.target.value);
                      }}
                      variant="standard"
                      size="medium"
                    />
                    <IconButton
                      disabled={isUpdatingGroupName}
                      onClick={ForsaveIcon} // Save the name
                      sx={{
                        color: "black",
                      }}
                    >
                      <CheckIcon fontSize="medium" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      sx={{
                        fontSize: {
                          xs: "1.2rem",
                          md: "1.5rem",
                        },
                      }}
                    >
                      {groupName}
                    </Typography>
                    <IconButton
                      onClick={ForeditIcon}
                      sx={{
                        color: "black",
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>

              {/* Members List */}
              <Box
                sx={{
                  mb: 2,
                  p: 2,
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  height: "70dvh",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Members
                </Typography>
                <List
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1,
                    maxHeight: "55dvh",
                    overflowY: "auto",
                  }}
                >
                  {members.chat.members.map((member, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: {
                          xs: "100%",
                          md: "40%",
                        },
                        display: "flex",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Searchitem
                        user={member}
                        key={index}
                        isAdded={true}
                        handler={RemoveMember}
                      />
                    </Box>
                  ))}
                </List>
              </Box>

              {/* Action Buttons */}
              <Box
                display={"flex"}
                sx={{
                  justifyContent: { xs: "space-between", sm: "flex-start" },
                  gap: { sm: "20px" },
                }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={HandleAskForDeleteGroup}
                >
                  Delete Group
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  startIcon={<PersonAddIcon />}
                  onClick={HandleAskForAddMember}
                >
                  Add Member
                </Button>
              </Box>
            </>
          )}
        </Grid>

        {askForDeleteGroup && (
          <Suspense fallback={<Backdrop open />}>
            <Askgroupdelete  open={askForDeleteGroup} close={HandleAskForDeleteGroup} handleDelete={handleGroupDelete}isLoading={groupLoading}/>
          </Suspense>
        )}

        {askForAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberInGroup chatId={chatId} />
          </Suspense>
        )}
      </Grid>
    </>
  );
};

export default Groups;

const Grouplist = ({ myGroups = [], chatId, forWeb = false }) => {
  return (
    <>
      {forWeb && (
        <Typography
          sx={{ p: 2, bgcolor: "" }}
          color={"black"}
          fontSize={"1.2rem"}
        >
          Groups
        </Typography>
      )}
      <Stack height={"calc(100% - 59px)"} sx={{ overflowY: "auto" }}>
        {myGroups.length > 0 ? (
          myGroups.map((groups, key) => (
            <MygroupList key={key} group={groups} chatId={chatId} />
          ))
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            textAlign={"center"}
            sx={{
              color: "#888",
            }}
          >
            <GroupIcon sx={{ fontSize: 80 }} />
            <Typography fontWeight={200} variant="h5">
              No groups
            </Typography>
          </Box>
        )}
      </Stack>
    </>
  );
};
