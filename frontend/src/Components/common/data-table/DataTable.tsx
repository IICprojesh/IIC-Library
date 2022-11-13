import React, { useEffect, useState } from "react";
import {
  Button,
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFetch } from "../../../hooks/useFetch";
import { fetchData } from "../../../utils/fetch";
import UserConsentModal from "../dialog/ConsentModal";
import { useNavigate } from "react-router-dom";
import { ROUTE_ERROR } from "../../../constants/constants";

interface DataTableInterface {
  resource: string;
  page?: number;
  dataPerPage?: number;
  onAction?: (action: "edit" | "delete", status: boolean, data: any) => void;
  children: (row: any) => React.ReactNode;
  actionId: string;
  headers: string[];
  onAdd?: any;
  searchText?: string;
}

export default function DataTable(props: DataTableInterface) {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(props?.page ?? 0);
  const [rowsPerPage, setRowsPerPage] = useState(props?.dataPerPage ?? 10);
  const [total, setTotal] = useState<number>(0);
  const [fetch, setFetch] = useState<boolean>(true);
  const [filter, setFilter] = useState<any[]>([]);

  useEffect(() => {
    if (props?.searchText?.length === 0) {
      setFilter([]);
    }
    if (props?.searchText && props.searchText.length) {
      fetchData(props.resource + `?search=${props.searchText}`).then(
        (data) => {
          console.log(data);
          setFilter((prev: any[]) => [...data.data]);
        },
        (err: any) => {
          console.error(err);
        }
      );
    }
  }, [props.searchText, props.resource]);

  useEffect(() => {
    setRows((prev) => {
      if (!Object.keys(props?.onAdd).length) return prev;
      return [...prev, props.onAdd];
    });
    setTotal((prev) => {
      if (!Object.keys(props?.onAdd).length) return prev;
      return prev + 1;
    });
  }, [props.onAdd]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [deleteData, setDeleteData] = useState<any>(null);

  const { data, error } = useFetch(
    `${props.resource}?limit=${rowsPerPage}&skip=${page}`,
    { fetch }
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!!error) {
      navigate(ROUTE_ERROR);
    }
    if (fetch && data) {
      setFetch(false);
      setRows([...data?.data]);
      setTotal(data?.total ?? 0);
    }
  }, [data, fetch, error, navigate]);

  function handleAction(action: "edit" | "delete", data: any) {
    if (action === "delete") {
      setOpenDeleteDialog(true);
      setDeleteData(data);
    }
  }

  function handleActionRequest(action: "edit" | "delete") {
    if (action === "delete") {
      fetchData(`${props.resource}/${deleteData[props.actionId]}`, {
        method: "delete",
      })
        .then((data: any) => {
          setRows(
            rows.filter(
              (each: any) => each[props.actionId] !== deleteData[props.actionId]
            )
          );
          setTotal((prev: number) => prev++);
          setOpenDeleteDialog(false);
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
      setRows(data?.data);
      setPage(newPage);
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setRowsPerPage(+event.target.value);

  return (
    <>
      {openDeleteDialog && (
        <UserConsentModal
          title="Delete"
          content="Do you really want to delete?"
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onAccept={() => handleActionRequest("delete")}
        />
      )}
      <TableContainer style={{ height: 400 }}>
        <Table stickyHeader style={{ height: 50 }}>
          <TableHead>
            <TableRow>
              {props.headers.map((each: string) => {
                return <TableCell align="left">{each}</TableCell>;
              })}
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(() => {
              if (filter.length) return filter;
              return rows;
            })().map((row) => (
              <TableRow key={row.id} style={{ height: 20 }}>
                {props.children(row)}
                <TableCell>
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
                  <Button
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    style={{ backgroundColor: "#b0dec3", color: "#3d9161" }}
                    onClick={(e: any) => handleAction("edit", row)}
                  >
                    view
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
