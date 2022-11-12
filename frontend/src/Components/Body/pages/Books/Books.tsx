import * as React from "react";
import styles from "./Books.module.css";
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
import TablePagination from "@mui/material/TablePagination";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FormDialog from "./Dialogue";
import { useFetch } from "../../../../hooks/useFetch";
import { useEffect } from "react";
import { fetchData } from "../../../../utils/fetch";
import axios from "axios";
import DeleteAlert from "../../mini-component/DeleteAlert";
import { toast } from "react-toastify";
import DataTable from "../../../common/data-table/DataTable";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 610,
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

export default function Books() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalBooks, setTotalBooks] = React.useState<number>(0);

  const { data, loading, error } = useFetch(
    `books?limit=${rowsPerPage}&skip=${page}`
  );

  useEffect(() => {
    setRows((prev) => {
      if (Array.isArray(prev) && prev.length === 0 && data?.data) {
        return data?.data;
      }
      return prev;
    });
    setTotalBooks(data?.total ?? 0);
  }, [data]);

  const classes = useStyles();

  const handleChangePage = (event: unknown, newPage: number) => {
    fetchData(`books?limit=${rowsPerPage}&skip=${newPage * rowsPerPage}`).then(
      (data) => {
        setRows(data.data);
        setPage(newPage);
      }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };
  const [dialog, setDialog] = React.useState(false);
  const [deleteState, setDeleteState] = React.useState(false);
  const [deleteisbn, setDeleteIsbn] = React.useState("");

  const deleteBook = (state: boolean) => {
    if (state) {
      axios({
        method: "delete",
        url: `http://localhost:3500/books/${deleteisbn}`,
      })
        .then((res) => {
          setDeleteState(false);
          console.log(res.data.message);
          toast.success(res.data.message);
        })
        .catch((err) => {
          setDeleteState(false);
          toast.error(
            "This Book Cannot be delete, Some Student Borrowed this book"
          );
          console.log(err);
        });
    } else {
      setDeleteState(false);
    }
  };

  return (
    <Paper
      style={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        maxHeight: 700,
        marginTop: 20,
      }}
    >
      {deleteState && <DeleteAlert onPremission={deleteBook} />}

      <FormDialog
        isOpen={dialog}
        onClose={() => setDialog(false)}
        onSuccess={(data: any) => {
          setRows([...rows, data]);
          setDialog(false);
        }}
      />
      <div
        style={{
          display: "flex",
          marginBottom: 15,
          marginTop: 5,
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => {
            setDialog(true);
          }}
          variant="outlined"
          className={classes.button}
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          {" "}
          ADD Book
        </Button>
        <div>
          <TextField
            spellCheck
            id="outlined-basic"
            sx={{ width: 500 }}
            label="Search Book By ISBN Or Name"
            variant="outlined"
          />
        </div>
      </div>
      <DataTable
        resource="books"
        headers={["image", "isbn number", "book name", "Authors"]}
				actionId="isbn"
      >
        {(row: any) => {
          return (
            <>
              <TableCell>
                <img
                  src={row.image}
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  alt={row.title}
                />
              </TableCell>
              <TableCell>{row.isbn}</TableCell>
              <TableCell>{row.title.substr(0, 60) + "..."}</TableCell>
              <TableCell>{row.authors}</TableCell>
            </>
          );
        }}
      </DataTable>
    </Paper>
  );
}
