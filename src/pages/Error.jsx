import React from "react";
import { Container, Typography, Box, Button,styled } from "@mui/material";
import {ErrorpageLink} from "../components/styled/Allstyle"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


const ErrorPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100dvh",
          textAlign: "center",
        }}
      >
        <img src="/error.png" alt="Logo" style={{ width: "400px" }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Page not found
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Apologies, but the page you were looking for wasn't found. Try
          reaching for the search button on the nav bar above to look for
          another one.
        </Typography>
        
        <ErrorpageLink
          to="/"
        >
          Back to home
          <ArrowRightAltIcon  />
        </ErrorpageLink>
      </Box>
    </Container>
  );
};

export default ErrorPage;
