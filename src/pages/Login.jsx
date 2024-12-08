import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { server } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { setUser,unsetUser } from "../redux/reducer/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const axiosConfig = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const dispatch = useDispatch();

  const onSubmitforlogin = async (data) => {
    const toastId = toast.loading("Logging in...");

    try {
      await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: data.usernamelog,
          password: data.passwordlog,
        },
        axiosConfig
      );
      const { data: userData } = await axios.get(`${server}/api/v1/user/me`, { withCredentials: true });
      dispatch(setUser(userData.data));

      toast.dismiss(toastId);
      toast.success("Login successful!");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Could not login.");
    }
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{ display: "flex", alignItems: "center", height: "100dvh" }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "",
        }}
      >
        <>
          <Typography textAlign={"left"} variant="h5">
            <b>Welcome back!</b>
          </Typography>
          <Typography mb={2} variant="body1">
            Sign in to continue.
          </Typography>
          <form onSubmit={handleSubmit(onSubmitforlogin)}>
            <TextField
              color="success"
              fullWidth
              label="Username"
              margin="normal"
              variant="filled"
              type="text"
              autoFocus
              {...register("usernamelog", {
                required: "Username is required",
              })}
              error={!!errors.usernamelog}
              helperText={errors.usernamelog?.message}
            />

            <TextField
              color="success"
              type={showPassword ? "text" : "password"}
              fullWidth
              label="Password"
              margin="normal"
              variant="filled"
              {...register("passwordlog", {
                required: "Password is required",
              })}
              error={!!errors.passwordlog}
              helperText={errors.passwordlog?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              color="success"
              sx={{ marginTop: "1rem" }}
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Sign in
            </Button>
          </form>

          <Button
            sx={{ alignSelf: "flex-start", marginTop: "20px", padding: 0 }}
            color="success"
            type="button"
          >
            Forgot password?
          </Button>

          <Button
            onClick={() => {
              navigate("/signup");
            }}
            sx={{ alignSelf: "flex-start", padding: 0 }}
            color="success"
            type="button"
          >
            Don't have an account? Sign Up
          </Button>
        </>
      </Paper>
    </Container>
  );
};

export default Login;
