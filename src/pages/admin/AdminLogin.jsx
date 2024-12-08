import {useState} from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  InputAdornment,

} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Navigate } from "react-router-dom";
import Tittle from "../../components/shared/Tittle"
const isAdmin=true

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  if(isAdmin) return <Navigate to={"dashborad"}/>
  return (
    <>
<Tittle title={"Admin Login"} dec="Secure login page for administrators to access the admin panel and manage the system."/>
    <Container
      component="main"
      maxWidth="xs"
      sx={{ display: "flex", alignItems: "center", height: "100dvh" }}
      
    >
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h6">
          Admin Sign in
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", mt: 1 }}
        >
          <TextField
            variant="standard"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            
          />
          <TextField
            variant="standard"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
    </>
  );
};

export default AdminLogin;
