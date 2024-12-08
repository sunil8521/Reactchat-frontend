import  { useState } from "react";
import {
  Grid,
  Drawer,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { RiAdminFill } from "react-icons/ri";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Tittle from "../../components/shared/Tittle";
import { AdminbarLink } from "../../components/styled/Allstyle";
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import MessageIcon from '@mui/icons-material/Message';
import {useLocation} from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';
const Adminlayout = ({ children }) => {
  const [Ismobile, SetIsmobile] = useState(false);
  const toggleMobile = () => {
    SetIsmobile(!Ismobile);
  };

  return (
    <>
      <Tittle
        title={"Admin Dashboard"}
        dsc={
          "Manage user accounts, monitor activities, and oversee system settings on the admin dashboard."
        }
      />
      <Grid container height={"100dvh"}>
        <Grid
          item
          lg={2.5}
          sx={{ display: { xs: "none", lg: "block" }, paddingY: 2 }}
        >
          <AdminSidebar />
        </Grid>

        <Grid item xs={12} lg={9.5} sx={{ bgcolor: "white", paddingY: 4 ,paddingX:{xs:2,lg:0}}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              paddingX: 2,
            }}
          >
            <Typography
              fontWeight={"600"}
              color={"#344767"}
              display={"flex"}
              gap={1}
              alignItems={"center"}
            >
              <HomeRoundedIcon sx={{ color: "#344767" }} /> / Dashboard
            </Typography>

            <IconButton
              onClick={toggleMobile}
              sx={{
                color: "black",
                display: {
                  xs: "block",
                  lg: "none",
                },
              }}
            >
              {Ismobile ? <MenuIcon /> : <MenuOpenRoundedIcon />}
            </IconButton>
          </Box>

          {children}
        </Grid>

        <Drawer
          variant="persistent"
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
            "& .MuiDrawer-paper": {
              // width: "25%",
              height: "100%",
              paddingY: 2,
              border: "none",
            },
          }}
          open={Ismobile}
        >
          <AdminSidebar />
        </Drawer>
      </Grid>
    </>
  );
};

export default Adminlayout;

const AdminSidebar = () => {
  const logout=()=>{
    // localStorage.removeItem("token")
    console.log("logout")
  }
  const location=useLocation()
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />,path:"/admin/dashborad" },
    { text: "Users", icon: <PeopleIcon /> ,path:"/admin/user-managment"},

    { text: "Chats", icon: <ForumIcon />,path:"/admin/chat-managment" },
    { text: "Messages", icon: <MessageIcon />,path:"/admin/messages" },
 
  ];

  return (
    <>
      <Box
        sx={{
          width: {
            xs: "35dvh",
            lg: "100%",
          },
          height: "100%",
          paddingX: 2,
         
        }}
      >

        <Box
          sx={{
            borderRadius: 5,
            height: "100%",
            paddingX: 2,
            paddingY: 3,
            bgcolor: "rgba(0,0,0,0.87)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            color={"white"}
            display={"flex"}
            justifyContent={"center"}
            gap={0.5}
            fontFamily={"monospace"}
            fontSize="1.4rem"
            letterSpacing={1}
          >

            <RiAdminFill style={{ fontSize: "1.8rem" }} /> ADMIN
          </Typography>

          <Divider sx={{ bgcolor: "white", marginY: 2 }} />

          <List sx={{flexGrow:1}}>
            {menuItems.map((item, index) => (
              <AdminbarLink to={item.path} key={index} sx={{
                ":hover": {
                  background:location.pathname!==item.path? "rgba(204, 204, 204, 0.1)":"",
                },
                bgcolor:location.pathname===item.path?"info.main":"unset",
              }}>
                {item.icon}
                <Typography letterSpacing={0}>{item.text} </Typography>
              </AdminbarLink>
            ))}
          </List>
          <IconButton onClick={logout} sx={{color:"white", alignSelf: "flex-end"  }}><LogoutIcon/></IconButton>
        </Box>

       
      </Box>
    </>
  );
};
