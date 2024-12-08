import React from "react";
import Applayout from "../components/Applayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        bgcolor="#f0f4f8"
        textAlign="center"
        p={0}
      >
        <Box
          component="img"
          src="/chat.png" // Replace this with the path to your image
          alt="Welcome"
          sx={{
            width: "200px",
            height: "200px",
          }}
        />

        <Typography
          // variant="h5"
          // component="h5"
          gutterBottom
          // fontWeight={100}
          sx={{
            fontFamily: "serif",
            fontSize: "1.6rem",

            color: "#333",
          }}
        >
          {" Let's Get Started!"}
          <br />
          Choose a friend to begin chatting.
        </Typography>
      </Box>
    </>
  );
};
const HomeWithLayout = Applayout(Home);

export default HomeWithLayout;
// export default Applayout()(Home);
