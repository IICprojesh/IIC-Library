import * as React from "react";
import { Paper, TableCell } from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DataTable from "../../../common/data-table/DataTable";
import FormDialog from "./Dialoguestudent";

export default function Student() {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  return (
    <Paper
      style={{
        width: "100%",
        boxShadow: "none",
        marginTop: 20,
      }}
    >
      <FormDialog
        isOpen={showModal}
        onSuccess={() => {
          setShowModal(false);
        }}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <div
        style={{
          display: "flex",
          marginTop: 5,
          marginBottom: 15,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            setShowModal(true);
          }}
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
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>
      <DataTable
        searchText={search}
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
