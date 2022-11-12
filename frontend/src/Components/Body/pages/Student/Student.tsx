import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormDialog from "./Dialoguestudent";
import axios from "axios";
import { useFetch } from "../../../../hooks/useFetch";
import { fetchData } from "../../../../utils/fetch";
import DataTable from "../../../common/data-table/DataTable";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 610,
    "&::-webkit-scrollbar": {
      width: 10,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.primary.light,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.dark,
      borderRadius: 2,
    },
  },

  tableHeaderCells: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {},
  button: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: theme.palette.primary.dark,
    padding: "3px 15px",
    display: "inline-block",
  },
  tableCell: {
    width: 450,
  },
}));

export default function Student() {
  const [dialog, setDialog] = React.useState(false);

  return (
    <Paper
      style={{
        width: "100%",
        boxShadow: "none",
        marginTop: 20,
      }}
    >
      <FormDialog isOpen={dialog} onClose={() => setDialog(false)} />
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
            setDialog(true);
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
