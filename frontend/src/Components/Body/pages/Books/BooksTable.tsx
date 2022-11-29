import axios from "axios";
import { useEffect, useState, forwardRef } from "react";

import styles from "./BooksTable.module.css";
import { Button, Pagination, TextField } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Tooltip } from "@material-ui/core";
import { BACKEND_ENDPOINT } from "../../../../constants/constants";
import FormDialog from "./Dialogue";
import { motion } from "framer-motion";
import { BookType } from "./book.type";
import { fetchData } from "../../../../utils/fetch";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface BookTableInterface {
  searchKey?: string;
  datas?: any;
}

export default function BooksTable(props: BookTableInterface) {
  const [editId, setEditid] = useState<number>(0);
  const [books, setBooks] = useState<BookType[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [canDeleteIsbn, setCanDeleteIsbn] = useState("");
  const [deleteDialogue, setDeleteDialogue] = useState<any>(false);
  const [searchedBook, setSearchedBook] = useState<BookType[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (props?.searchKey?.trim?.()) {
      fetchData(`books?search=${props.searchKey}`).then(
        (data: { total: number; data: BookType[] }) => {
          setSearchedBook(data.data);
        }
      );
    }
  }, [props?.searchKey]);

  useEffect(() => {
    if (props.datas) {
      setBooks([...books, props.datas]);
    }
  }, [props.datas]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/books?limit=${dataPerPage}&skip=${
        (currentPage - 1) * dataPerPage
      }`,
    })
      .then((res) => {
        setTotalPage(Math.ceil(res.data.total / dataPerPage));
        setBooks(res.data?.data);
      })
      .catch((_) => {
        toast.error("Something went wrong. Contact to Maintainer.");
      });
  }, [currentPage, dataPerPage]);

  const handleEdit = (books: any) => {
    setEditid(books);
    setShowAddModal(true);
  };

  const handleDelete = (each: any) => {
    setCanDeleteIsbn(each.isbn);
    setDeleteDialogue(true);
  };
  const handleDeleteYes = () => {
    axios({
      method: "delete",
      url: `${BACKEND_ENDPOINT}/books/${canDeleteIsbn}`,
    })
      .then((res) => {
        setBooks((prev: any) => {
          return prev.filter((each: any) => each.isbn !== canDeleteIsbn);
        });
        toast.success("Book deleted successfully");
        setCanDeleteIsbn("");
        setDeleteDialogue(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setDeleteDialogue(false);
      });
  };

  function handleChange(_: any, value: number) {
    setCurrentPage(value);
  }

  const handleDeleteNo = () => {
    setDeleteDialogue(false);
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%", transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      {showAddModal && (
        <FormDialog
          datas={editId}
          isOpen={showAddModal}
          success={(data: any) => {
            setBooks((prev: any) => {
              return prev.map((each: any) => {
                if (each.isbn === data.isbn) {
                  return data;
                } else {
                  return each;
                }
              });
            });

            setSearchedBook((prev: any) => {
              return prev.map((each: any) => {
                if (each.isbn === data.isbn) {
                  return data;
                }
                return each;
              });
            });
          }}
          onClose={() => setShowAddModal(false)}
        />
      )}
      <Dialog
        open={deleteDialogue}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are You Sure You Want to Delete this Book ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteYes}>Yes</Button>
          <Button onClick={handleDeleteNo}>NO</Button>
        </DialogActions>
      </Dialog>
      <table className={styles.container}>
        <thead>
          <tr>
            <th className={styles.tableheading}>Image</th>
            <th className={styles.tableheading}>ISBN</th>
            <th className={styles.tableheading}>Book Name</th>
            <th className={styles.tableheading}>Author</th>
            <th className={styles.tableheading}>Action</th>
          </tr>
        </thead>
        <tbody>
          {(props?.searchKey?.trim?.() ? searchedBook : books)?.map(
            (each: any, index: number) => {
              return (
                <>
                  <tr key={each.id} className={styles.tablerow}>
                    <td key={each.id} className={styles.tabledata}>
                      <img
                        height="50px"
                        width="50px"
                        style={{ objectFit: "cover" }}
                        src={each.image}
                        alt={each.title}
                      />
                    </td>
                    <td className={styles.tabledata}>{each.isbn}</td>
                    <td className={styles.tabledata}>{each.title}</td>
                    <td className={styles.tabledata}>{each.authors}</td>
                    <td className={styles.tabledata}>
                      <Tooltip title="Edit">
                        <Button variant="text" onClick={() => handleEdit(each)}>
                          <DriveFileRenameOutlineIcon color="primary" />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button
                          variant="text"
                          onClick={() => handleDelete(each)}
                        >
                          <DeleteOutlineIcon color="error" />
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                </>
              );
            }
          )}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Pagination
          sx={{ marginTop: 3 }}
          count={totalPage}
          color="primary"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </motion.div>
  );
}
