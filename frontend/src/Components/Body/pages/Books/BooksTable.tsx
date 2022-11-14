import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./BooksTable.module.css";
import { Button, TextField } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function BooksTable() {
  const [books, setBooks] = useState<any>(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3500/books",
    })
      .then((res) => {
        setBooks(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log();

  const handleEdit = () => {
    console.log("hello everyone");
  };
  const handleDelete = () => {
    console.log("hello everyone");
  };

  return (
    <>
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
          {books?.map((each: any) => {
            return (
              <>
                <tr key={each.id} className={styles.tablerow}>
                  <td key={each.id} className={styles.tabledata}>
                    <img height="50px" src={each.image} />
                  </td>
                  <td className={styles.tabledata}>{each.isbn}</td>
                  <td className={styles.tabledata}>{each.title}</td>
                  <td className={styles.tabledata}>{each.authors}</td>
                  <td className={styles.tabledata}>
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
