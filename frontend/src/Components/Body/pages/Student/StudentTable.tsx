import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./StudentTable.module.css";
import { Button, Pagination, TextField } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "@material-ui/core";
import { BACKEND_ENDPOINT } from "../../../../constants/constants";
import FormDialog from "./Dialoguestudent";

export default function StudentTable() {
  const navigate = useNavigate();
  const [students, setStudent] = useState<any>(null);
  const [editId, setEditid] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/students`,
    })
      .then((res) => {
        setStudent(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleView = (each: any) => {
    navigate(`/Student/${each.id}`);
  };
  const handleDelete = (id: string) => {
    axios({
      method: "delete",
      url: `${BACKEND_ENDPOINT}/students/${id}`,
    })
      .then((res) => {
        setStudent((prev: any) => {
          return prev.filter((each: any) => each.id !== id);
        });
        toast.success("Student Deleted ");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleEdit = (id: any) => {
    setEditid(id);
    console.log("i got hit", id);
    setShowAddModal(true);
  };
  return (
    <>
      {showAddModal && (
        <FormDialog
          datas={students[editId]}
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      )}
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
          {students?.map((each: any, index: number) => {
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
                    <Tooltip title="View">
                      <Button variant="text" onClick={() => handleView(each)}>
                        <RemoveRedEyeIcon color="success" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <Button variant="text" onClick={() => handleEdit(index)}>
                        <DriveFileRenameOutlineIcon color="primary" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button
                        variant="text"
                        onClick={() => handleDelete(each.id)}
                      >
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
        <Pagination sx={{marginTop:3}} count={10} color="primary" shape="rounded" />
      </div>
    </>
  );
}
