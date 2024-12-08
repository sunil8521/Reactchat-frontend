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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import useFilePreview from "../hooks/useFilePreview";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { server } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/reducer/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  let pwd = watch("Spassword");
  const file = watch("avatar");
  const [filePreview] = useFilePreview(file);

  const onSubmitforsignup = async (data) => {
    const { avatar: fileValue } = data;
    const [fileObject] = fileValue;
    const formData = new FormData();
    formData.append("name", data.fullname);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.Spassword);
    formData.append("avtar", fileObject);
    const toastId = toast.loading("Signing up...");
    try {
       await axios.post(`${server}/api/v1/user/signup`, formData, {
        withCredentials:true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { data: userData } = await axios.get(`${server}/api/v1/user/me`, { withCredentials: true });
      dispatch(setUser(userData.data));
      toast.dismiss(toastId);
      toast.success("SignUp successful!");
    } catch (err) {
        toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Somthing Went Wrong");
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
            <b>Welcome!</b>
          </Typography>
          <Typography mb={2} variant="body1">
            Create an account.
          </Typography>

          <form onSubmit={handleSubmit(onSubmitforsignup)}>
            <Stack position={"relative"} width={"7rem"} margin={"auto"}>
              <Avatar
                sx={{
                  width: "100%",
                  height: "7rem",
                }}
                src={filePreview}
              />

              <IconButton
                size="small"
                component="label"
                sx={{
                  position: "absolute",
                  bgcolor: "#ccc",
                  color: "rgba(0,0,0,0.5) ",
                  ":hover": {
                    bgcolor: "rgba(0,0,0,0.5) ",
                    color: "#ccc",
                  },
                  bottom: 0,
                  right: 0,
                }}
              >
                <CameraAltIcon />

                <input
                  type="file"
                  name="picture"
                  accept="image/*"
                  hidden
                  {...register("avatar", {
                    required: "Select profile picture",
                  })}
                />
              </IconButton>
            </Stack>

            {errors.avatar && (
              <Typography
                margin={"auto"}
                color="error"
                variant="caption"
                display={"block"}
                marginTop={"10px"}
                width={"fit-content"}
              >
                {errors.avatar.message}
              </Typography>
            )}
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              variant="filled"
              type="text"
              {...register("fullname", {
                required: "Full name is required",
              })}
              error={!!errors.fullname}
              helperText={errors.fullname?.message}
            />
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              variant="filled"
              type="text"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[A-Za-z0-9-_]+$/i,
                  message: "Invalid username (use A-Z, a-z , 0-9 , - , _ )",
                },
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Username cannot exceed 15 characters",
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="filled"
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              label="Password"
              margin="normal"
              variant="filled"
              {...register("Spassword", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9-_]+$/,
                  message:
                    "Password must contain only letters (A-Z, a-z), numbers (0-9), hyphens (-), and underscores (_)",
                },
              })}
              error={!!errors.Spassword}
              helperText={errors.Spassword?.message}
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

            <TextField
              type="password"
              fullWidth
              label="Repeat password"
              margin="normal"
              variant="filled"
              {...register("repetepassword", {
                required: "You must specify a password",
                validate: (value) =>
                  value === pwd || "The passwords do not match",


                
              })}
              error={!!errors.repetepassword}
              helperText={errors.repetepassword?.message}
            />

            <Button
              sx={{ marginTop: "1rem" }}
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Sign up
            </Button>
          </form>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            sx={{ alignSelf: "flex-start", marginTop: "20px", padding: 0 }}
            type="button"
          >
            Alredy have an account? Sign in
          </Button>
        </>
      </Paper>
    </Container>
  );
};

export default Signup;
