import { createSlice } from "@reduxjs/toolkit";

const realtimeSlice = createSlice({
  name: "realtime",
  initialState: {
    notificationCount: 0,
    onlineUsers: [],
    newMessageAlert: [
      // {
      //   chatId:"",
      //   count:0
      // }
    ],
    lastMessage:[],
  },
  reducers: {
    setNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    updateOnlineUsers: (state, action) => {
      state.onlineUsers = [...action.payload];
    },

    setNewMessageAlert: (state, action) => {
      const { chatId } = action.payload;
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId,
          count: 1,
        });
      }
    },
    removeMessageAlert: (state, action) => {
      const { chatId } = action.payload;
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === chatId
      );
      if (index !== -1) {
        state.newMessageAlert.splice(index, 1);
      }
    },
    setLastMessage: (state, action) => {
      const existingChatIndex = state.lastMessage.findIndex(
        (message) => message.chat === action.payload.chat
      );
    
      if (existingChatIndex !== -1) {
        // If the chat ID is found, update the content of the existing message
        state.lastMessage[existingChatIndex].content = action.payload.content;
      } else {
        // If the chat ID is not found, push a new message to the lastMessage array
        state.lastMessage.push({
          chat: action.payload.chat,
          content: action.payload.content
        });
      }
    }
    




  },
});

export const {
  setNotificationCount,
  resetNotificationCount,
  updateOnlineUsers,
  setNewMessageAlert,
  removeMessageAlert,
  setLastMessage
} = realtimeSlice.actions;
export default realtimeSlice;
