import React from "react";
import { Helmet } from "react-helmet-async";
const Tittle = ({
  title = "Chat app",
  dec = "This is a chat app made with react.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={dec} />
    </Helmet>
  );
};

export default Tittle;
