import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./StudentTable.module.css";
import { Button, Pagination, TextField } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Slide, Tooltip } from "@material-ui/core";
import { BACKEND_ENDPOINT } from "../../../../constants/constants";
import FormDialog from "./Dialoguestudent";
import { useDebounce } from "usehooks-ts";
import { fetchData } from "../../../../utils/fetch";
import { motion, MotionConfig } from "framer-motion";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentTable(props: any) {
  const navigate = useNavigate();
  const [students, setStudent] = useState<any>(null);
  const [editId, setEditid] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [searchedData, setSearchedData] = useState<any>([]);
  const debouncedSearch = useDebounce<string>(search, 500);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [candelete, setCanDelete] = useState(false);
  const [candeleteId, setCanDeleteId] = useState("");

  useEffect(() => {
    setSearch(props?.searchKey ?? "");
  }, [props.searchKey]);

  useEffect(() => {
    if (props.data) {
      setStudent([...students, props.data]);
    }
  }, [props.data]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      fetchData(`students?search=${debouncedSearch}`).then((data: any) => {
        setSearchedData(data.data);
      });
    }
  }, [debouncedSearch, dataPerPage]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/students?limit=${dataPerPage}&skip=${
        (currentPage - 1) * dataPerPage
      }`,
    })
      .then((res) => {
        setTotalPage(Math.ceil(res.data.total / dataPerPage));
        setStudent(res.data?.data);
      })
      .catch((err) => {});
  }, [dataPerPage, currentPage]);

  function handlePagination(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
  }

  const handleView = (each: any) => {
    navigate(`/Student/${each.id}`);
  };
  const handleDelete = (id: string) => {
    axios({
      method: "delete",
      url: `${BACKEND_ENDPOINT}/students/${id}`,
    })
      .then((res) => {
        setCanDelete(false);
        setStudent((prev: any) => {
          return prev.filter((each: any) => each.id !== id);
        });
        toast.success("Student Deleted ");
      })
      .catch((err) => {
        setCanDelete(false);

        if (Array.isArray(err?.response?.data?.message)) {
          toast.error(err?.response?.data?.message[0]);
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };
  const handleEdit = (studentdetail: any) => {
    setEditid(studentdetail);
    setShowAddModal(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      {showAddModal && (
        <FormDialog
          datas={editId}
          success={(data: any) => {
            setStudent((prev: any) => {
              return prev.map((each: any) => {
                if (each.id === data.id) {
                  return data;
                }
                return each;
              });
            });

            setSearchedData((prev: any) => {
              return prev.map((each: any) => {
                if (each.id === data.id) {
                  return data;
                }
                return each;
              });
            });
            toast.success("Student Update Success !!!");
          }}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
      <Dialog
        open={candelete}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Are You Sure You Want to Delete this Student ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDelete(candeleteId)}>Yes</Button>
          <Button onClick={() => setCanDelete(false)}>NO</Button>
        </DialogActions>
      </Dialog>
      <table className={styles.container}>
        <thead>
          <tr>
            <th className={styles.tableheading}>Student ID</th>
            <th className={styles.tableheading}>Student Name</th>
            <th className={styles.tableheading}>Contact Number</th>
            <th className={styles.tableheading}>Email Address</th>
            <th className={styles.tableheading}>Action</th>
          </tr>
        </thead>
        <tbody>
          {(debouncedSearch.trim() ? searchedData : students)?.map(
            (each: any, index: number) => {
              return (
                <>
                  <tr key={each.id} className={styles.tablerow}>
                    <td key={each.id} className={styles.tabledata}>
                      {each.collegeId}
                    </td>
                    <td className={styles.tabledata}>{each.name}</td>
                    <td className={styles.tabledata}>{each.contactNumber}</td>
                    <td className={styles.tabledata}>{each.email}</td>
                    <td className={styles.tabledata}>
                      <Tooltip title={<h2>View</h2>}>
                        <Button variant="text" onClick={() => handleView(each)}>
                          <RemoveRedEyeIcon color="success" />
                        </Button>
                      </Tooltip>
                      <Tooltip  title={<h2>Edit</h2>}>
                        <Button variant="text" onClick={() => handleEdit(each)}>
                          <DriveFileRenameOutlineIcon color="primary" />
                        </Button>
                      </Tooltip>
                      <Tooltip  title={<h2>Delete</h2>}>
                        <Button
                          variant="text"
                          onClick={() => {
                            setCanDelete(true);
                            setCanDeleteId(each.id);
                          }}
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
          onChange={handlePagination}
        />
      </div>
    </motion.div>
  );
}
