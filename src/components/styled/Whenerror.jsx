
import { Stack, Typography } from "@mui/material";
import React from 'react'

const Whenerror = ({size="1.2rem",color="#ccc",message}) => {
  return (
    <Stack
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}
  >
    <Typography
      variant="caption"
      fontSize={size}
      color={color}
    >
      {message}
    </Typography>
  </Stack>
  )
}

export default Whenerror
