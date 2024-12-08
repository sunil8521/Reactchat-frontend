import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    mobileChatDialog: false, //used
    searchDialog: false, //used
    notificationDialog: false, //used
    createGroupDialog: false, //used
    mobileGroupDialog: false, //used
    isEditing: false,//used


    isAddfriend: false,
    isFilemenu: false, //used
    isDeletemenu: false, //used
    uploadingUploader: false,
    askForDeleteChat: false, //ueed
    askForClearChat: false,//used
    askForDeleteGroup: false,//used
    askForAddMember: false, //used
    selectDeleteChat: {
      chatId: "",
      groupChat: false,
    },
  },
  reducers: {
    setMobileChatDialog: (state, action) => {
      state.mobileChatDialog = action.payload;
    },
    setNotificationDialog: (state, action) => {
      state.notificationDialog = action.payload;
    },
    setCreateGroupDialog: (state, action) => {
      state.createGroupDialog = action.payload;
    },
    setSearchDialog: (state, action) => {
      state.searchDialog = action.payload;
    },

    setMobileGroupDialog: (state, action) => {
      state.mobileGroupDialog = action.payload;
    },
    setisEditing: (state, action) => {
      state.isEditing = action.payload;
    },

    setAddFriend: (state, action) => {
      state.isAddfriend = action.payload;
    },
    setFileMenu: (state, action) => {
      state.isFilemenu = action.payload;
    },
    setDeleteMenu: (state, action) => {
      state.isDeletemenu = action.payload;
    },
    setUploadingUploader: (state, action) => {
      state.uploadingUploader = action.payload;
    },
    setSelectDeleteChat: (state, action) => {
      state.selectDeleteChat = action.payload;
    },
    setAskForDeleteChat: (state, action) => {
      state.askForDeleteChat = action.payload;
    },
    setAskForClearChat: (state, action) => {
      state.askForClearChat = action.payload;
    },
    setAskForDeleteGroup: (state, action) => {
      state.askForDeleteGroup = action.payload;
    },
    setAskForAddMember: (state, action) => {
      state.askForAddMember = action.payload;
    }



  },
});

export const {
  setMobileChatDialog,
  setSearchDialog,
  setNotificationDialog,
  setCreateGroupDialog,
  setMobileGroupDialog,
  setAddFriend,
  setFileMenu,
  setDeleteMenu,
  setUploadingUploader,
  setSelectDeleteChat,
  setAskForDeleteChat,
  setAskForClearChat,
  setisEditing,
  setAskForDeleteGroup,
  setAskForAddMember

} = dialogSlice.actions;
export default dialogSlice;
