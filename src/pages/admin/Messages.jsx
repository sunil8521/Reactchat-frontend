import React, { useEffect, useState } from "react";
import Adminlayout from "./Adminlayout";
import AdminTable from "../../components/shared/AdminTable";
import Av from "../../components/shared/Av";
import { usertabledata } from "../../fake.js";
import { Stack } from "@mui/material";
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "attachment",
    headerName: "Attchment",
    width: 200,
    renderCell: (params) => <Av av={[params.row.avtar]} />,
  },
  {
    field: "content",
    headerName: "Content",
    width: 200,
  },
  {
    field: "sender",
    headerName: "sent By",
    width: 200,
    renderCell: (params) => {
      console.log(params)
      return (
        <Stack>
          <Av alt={params.row.name} av={[params.row.avtar]} />
          <span>{"params.row.sender.name"}</span>
        </Stack>
      );
    },
  },
  {
    field: "chat",
    headerName: "Chat",
    width: 150,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    width: 150,
  },
  {
    field: "CreatedAt",
    headerName: "Created at",
    width: 300,
  },
];
const Messages = () => {
  const [Rows, setRows] = useState([]);
  useEffect(() => {
    setRows(usertabledata.map((i) => ({ ...i, id: i._id })));
  }, []);
  return (
    <Adminlayout>
      <AdminTable columns={columns} rows={Rows} heading={"All users"} />
    </Adminlayout>
  );
};

export default Messages;
