import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chat",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://reactchat-backend-yznc.onrender.com/api/v1" }),

  tagTypes: ["Chat", "User"],

  endpoints: (builder) => ({
    //get all chat
    myAllchat: builder.query({
      query: () => ({ url: "/chat/getmychat", credentials: "include" }),
      providesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),

    //search user
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?Name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    //get my friends
    myFriends: builder.query({
      query: () => ({ url: "/user/myfriends", credentials: "include" }),
      providesTags: ["User"],
    }),

    //send friend request
    sendFriendRequest: builder.mutation({
      query: (recever) => ({
        url: "/user/frindrequest",
        method: "POST",
        body: recever,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    //get all notifications
    getNotifications: builder.query({
      query: () => ({ url: "/user/notifications", credentials: "include" }),
      // providesTags:["User"],
      keepUnusedDataFor: 0,
    }),

    //accept friend request
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    //get my chat members
    myChatMembers: builder.query({
      query: ({ chatId, populate = false }) => ({
        url: `/chat/${chatId}?populate=${populate}`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
      keepUnusedDataFor: 0,

    }),

    //get old message
    getOldMessage: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/conversation/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    //send attachment
    sendAttachment: builder.mutation({
      query: (data) => ({
        url: "/chat/sendattachment",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    //create a new group
    createNewGroup: builder.mutation({
      query: (data) => ({
        url: "/chat/newgroup",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    //delete a group/chat
    deleteGroup: builder.mutation({
      query: ({ chatId, deletechat = false }) => ({
        url: `/chat/${chatId}?deletechat=${deletechat}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    //get mygroup
    myGroup: builder.query({
      query: () => ({ url: "/chat/getmygroup", credentials: "include" }),
      providesTags: ["Chat"],
    }),


    //update group name
    updateGroupName: builder.mutation({
      query: (data) => ({
        url: `/chat/${data.chatId}`,
        method: "PUT",
        body: {name:data.name},
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),


    //remove group members
    removeGroupMembers: builder.mutation({
      query: (data) => ({
        url: "/chat/removemember",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    //add member in group
    addMemberInGroup: builder.mutation({
      query: (data) => ({
        url: "/chat/addmember",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),



  }),
});

export const {
  useMyAllchatQuery,
  useLazySearchUserQuery,
  useGetNotificationsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useMyChatMembersQuery,
  useGetOldMessageQuery,
  useSendAttachmentMutation,
  useLazyMyFriendsQuery,
  useCreateNewGroupMutation,
  useDeleteGroupMutation,
  useMyGroupQuery,
  useUpdateGroupNameMutation,
  useRemoveGroupMembersMutation,
  useAddMemberInGroupMutation,
} = chatApi;
