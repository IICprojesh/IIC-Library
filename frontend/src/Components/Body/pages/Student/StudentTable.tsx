import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./StudentTable.module.css";
import { Button, TextField } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { NavLink, useNavigate } from "react-router-dom";

export default function StudentTable() {
  const navigate = useNavigate();
  const [students, setStudent] = useState<any>(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3500/students",
    })
      .then((res) => {
        setStudent(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log();

  const handleView = (each: any) => {
    navigate(`/Student/${each.id}`);
  };
  const handleDelete = () => {
    console.log("hello everyone");
  };
  const handleEdit = () => {
    console.log("hello i can edit now");
  };

  return (
    <>
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
          {students?.map((each: any) => {
            return (
              <>
                <tr key={each.id} className={styles.tablerow}>
                  <td key={each.id} className={styles.tabledata}>
                    {each.id}
                  </td>
                  <td className={styles.tabledata}>{each.name}</td>
                  <td className={styles.tabledata}>{each.contactNumber}</td>
                  <td className={styles.tabledata}>{each.email}</td>
                  <td className={styles.tabledata}>
                    <Button variant="text" onClick={() => handleView(each)}>
                      <RemoveRedEyeIcon color="success" />
                    </Button>
                    <Button variant="text" onClick={handleEdit}>
                      <DriveFileRenameOutlineIcon color="primary" />
                    </Button>
                    <Button variant="text" onClick={handleDelete}>
                      <DeleteOutlineIcon color="error" />
                    </Button>
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
    </>
  );
}
