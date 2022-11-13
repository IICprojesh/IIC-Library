import * as React from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DataTable from "../../../common/data-table/DataTable";

export default function Student() {
  return (
    <Paper
      style={{
        width: "100%",
        boxShadow: "none",
        marginTop: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          marginTop: 5,
          marginBottom: 15,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {}}
          variant="outlined"
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          {" "}
          ADD Student
        </Button>
        <div>
          <TextField
            spellCheck
            id="outlined-basic"
            sx={{ width: 500 }}
            label="Search by Student ID or Student Name"
            variant="outlined"
          />
        </div>
      </div>
      <DataTable
        resource="students"
        headers={["Student Id", "Student Name", "contact Number", "email"]}
        actionId="id"
      >
        {(row: any) => {
          return (
            <>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.contactNumber}</TableCell>
              <TableCell>{row.email}</TableCell>
            </>
          );
        }}
      </DataTable>
    </Paper>
  );
}
