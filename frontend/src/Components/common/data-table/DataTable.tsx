import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { useFetch } from "../../../hooks/useFetch";
import { fetchData } from "../../../utils/fetch";
import DeleteAlert from "../../Body/mini-component/DeleteAlert";

interface DataTableInterface {
  resource: string;
  page?: number;
  dataPerPage?: number;
  onAction?: (
    action: "edit" | "delete" | "add",
    status: boolean,
    data: any
  ) => void;
  children: (row: any) => React.ReactNode;
  actionId: string;
  headers: string[];
}
export default function DataTable(props: DataTableInterface) {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(props?.page ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState(props?.dataPerPage ?? 10);
  const [total, setTotal] = useState<number>(0);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [deleteData, setDeleteData] = useState<any>(null);

  const { data } = useFetch(
    `${props.resource}?limit=${rowsPerPage}&skip=${page}`
  );

  useEffect(() => {
    setRows((prev) => {
      if (Array.isArray(prev) && prev.length === 0 && data?.data) {
        return data?.data;
      }
      return prev;
    });
    setTotal(data?.total ?? 0);
  }, [data]);

  function handleAction(action: "edit" | "delete", data: any) {
    if (action === "delete") {
      setOpenDeleteDialog(true);
      setDeleteData(data);
    }
  }

  function handleActionRequest(action: "edit" | "delete") {
    if (action === "delete") {
      setOpenDeleteDialog(false);
      console.log(deleteData);
      fetchData(`${props.resource}/${deleteData[props.actionId]}`, {
        method: "delete",
      })
        .then((data: any) => {
          setRows(
            rows.filter(
              (each: any) => each[props.actionId] !== deleteData[props.actionId]
            )
          );
          props?.onAction?.("delete", true, data);
        })
        .catch((err: any) => {
          props?.onAction?.("delete", false, err);
        });
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    fetchData(
      `${props.resource}?limit=${rowsPerPage}&skip=${newPage * rowsPerPage}`
    ).then((data) => {
      setRows(data.data);
      setPage(newPage);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setRowsPerPage(+event.target.value);

  return (
    <>
      {openDeleteDialog && (
        <DeleteAlert
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onAccept={() => handleActionRequest("delete")}
        />
      )}
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {props.headers.map((each: string) => {
                return <TableCell align="left">{each}</TableCell>;
              })}
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {props.children(row)}
                <TableCell
                  style={{
                    paddingBottom: 40,
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    style={{ backgroundColor: "#adc7fb", color: "#083fad" }}
                    onClick={(e: any) => handleAction("edit", row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      handleAction("delete", row);
                    }}
                    startIcon={<DeleteIcon />}
                    style={{ backgroundColor: "#fcb4b9", color: "#e60818" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
