import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Paper, Typography } from "@mui/material";


const AdminTable = ({ rows, columns, heading }) => {
  return (
    <Container
      sx={{
        height: "80dvh",
        display: "flex",
        padding: 0,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100%",
          padding: "10px 10px",
          overflow: "hidden",
          borderRadius: "1rem",
          display: "flex",
          flexDirection: "column",
          
        }}
      >
        <Typography variant="h6" gutterBottom>
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={52}
          autoHeight
          disableExtendRowFullWidth
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[7]}
        />
      </Paper>
    </Container>
  );
};

export default AdminTable;
