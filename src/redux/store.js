import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import dialogSlice from "./reducer/dialog";
import realtimeSlice from "./reducer/realtime";
import { chatApi } from "./api/apis";
// import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [dialogSlice.name]: dialogSlice.reducer,
    [realtimeSlice.name]: realtimeSlice.reducer,

    [chatApi.reducerPath]: chatApi.reducer,//this is toolkit
  },

  middleware: (mid) =>[...mid(),chatApi.middleware],
});

export default store;
// setupListeners(store.dispatch);
