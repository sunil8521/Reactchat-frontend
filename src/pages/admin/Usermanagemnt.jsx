import React, { useEffect, useState } from "react";
import Adminlayout from "./Adminlayout";
import AdminTable from "../../components/shared/AdminTable";
import Av from "../../components/shared/Av";
import { usertabledata } from "../../fake.js";
const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "avtar",
    headerName: "Avtar",
    width: 150,
    renderCell: (params) => {
      return <Av av={[params.row.avtar]} />;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    width: 150,
  },
  {
    field: "CreatedAt",
    headerName: "Created at",
    width: 300,
  },
  {
    field: "UpdateAt",
    headerName: "Updated at",
    width: 300,
  },
];
const Usermanagemnt = () => {
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

export default Usermanagemnt;
