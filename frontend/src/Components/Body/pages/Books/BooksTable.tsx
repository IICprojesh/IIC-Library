import axios from "axios";
import { useEffect, useState, forwardRef } from "react";

import styles from "./BooksTable.module.css";
import { Button, TextField } from "@mui/material";
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
import { motion, MotionConfig } from "framer-motion";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BooksTable() {
  const [editId, setEditid] = useState("");
  const [success, setSuccess] = useState(false);
  const [books, setBooks] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [canDeleteIsbn, setCanDeleteIsbn] = useState("");
  const [deleteDialogue, setDeleteDialogue] = useState<any>(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/books`,
    })
      .then((res) => {
        setBooks(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = (id: any) => {
    setEditid(id);
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
  
  const handleDeleteNo = () => {
    setDeleteDialogue(false);
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%', transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
    >
      {showAddModal && (
        <FormDialog
          datas={books[editId]}
          isOpen={showAddModal}
          success={success}
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
          {books?.map((each: any, index: number) => {
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
                      <Button variant="text" onClick={() => handleEdit(index)}>
                        <DriveFileRenameOutlineIcon color="primary" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button variant="text" onClick={() => handleDelete(each)}>
                        <DeleteOutlineIcon color="error" />
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <a className={styles.a} href="#">
          &laquo;
        </a>
        <a className={styles.a} href="#">
          1
        </a>
        <a className={styles.a} href="#">
          2
        </a>
        <a className={styles.a} href="#">
          3
        </a>
        <a className={styles.a} href="#">
          4
        </a>
        <a className={styles.a} href="#">
          5
        </a>
        <a className={styles.a} href="#">
          6
        </a>
        <a className={styles.a} href="#">
          &raquo;
        </a>
      </div>
    </motion.div>
  );
}
