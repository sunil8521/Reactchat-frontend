import { styled } from "@mui/material";
import { Link } from "react-router-dom";
export const VisuallyHiddenInput = styled("input")({
  boder: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const ErrorpageLink = styled(Link)(({ inert }) => ({
  color: "blue",
  textDecoration: "none",
  marginTop: "20px",
  display: "flex",
  alignItems: "center",
  fontSize: "17px",
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
  },
  ...(inert && { pointerEvents: "none", userSelect: "none" }),
}));

export const ChatitemLink = styled(Link)(({ inert }) => ({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  ...(inert && { pointerEvents: "none", userSelect: "none" }),
}));

export const AdminbarLink = styled(Link)({
  color: "white",
  padding: "1rem 1.5rem",
  display: "flex",
  gap: "1rem",
  borderRadius: "10px",
  textDecoration: "none",
});
