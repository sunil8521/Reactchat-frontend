import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import Protect from "./auth/Protect";
import axios from "axios";
import { server } from "./constants.js";

import SocketProvider from "./socket";
import { useSelector, useDispatch } from "react-redux";
import { setUser, unsetUser } from "./redux/reducer/auth";
const Home = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Groups = lazy(() => import("./pages/Groups"));
const Chat = lazy(() => import("./pages/Chatpage"));
const ErrorPage = lazy(() => import("./pages/Error"));
// admin
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Chatmanagment = lazy(() => import("./pages/admin/Chatmanagment"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const Usermanagemnt = lazy(() => import("./pages/admin/Usermanagemnt"));

import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";

function App() {
  const { user, isAdmin,loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
      axios
        .get(`${server}/api/v1/user/me`, { withCredentials: true })
        .then(({ data }) => {
          dispatch(setUser(data.data));
        })
        .catch((er) => {
          dispatch(unsetUser());
        });
  }, [dispatch]);

  return loader?(<LoadingSpinner/>): (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>

          <Route
            element={
              <SocketProvider>
                <Protect user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />

            
          </Route>

          <Route
            path="/login"
            element={
              <Protect user={!user} redirect="/">
                <Login />
              </Protect>
            }
          />
          <Route
            path="/signup"
            element={
              <Protect user={!user} redirect="/">
                <Signup />
              </Protect>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashborad" element={<Dashboard />} />
          <Route path="/admin/user-managment" element={<Usermanagemnt />} />
          <Route path="/admin/chat-managment" element={<Chatmanagment />} />
          <Route path="/admin/messages" element={<Messages />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
