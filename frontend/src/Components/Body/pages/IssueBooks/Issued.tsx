import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_ENDPOINT } from '../../../../constants/constants';
import styles from "./Issued.module.css";
export default function IssueBook() {
  const [issued, setIssued] = useState<any>(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/issues`,
    })
      .then((res) => {
        setIssued(res.data.data);
        console.log(res.data.data);
        toast.success("Issued Fetch From Database");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  

  return (
    <>
      <table className={styles.container}>
        <thead>
          <tr>
            <th className={styles.tableheading}>Student ID</th>
            <th className={styles.tableheading}>Book ISBN</th>
            <th className={styles.tableheading}>Issue Date</th>
            <th className={styles.tableheading}>Expire Date</th>
            <th className={styles.tableheading}>Fine Amount</th>
            <th className={styles.tableheading}>Total Renewed</th>
          </tr>
        </thead>
        <tbody>
          {issued?.map((each: any) => {
            return (
              <>
                {!each.returned ? (
                  <tr key={each.id} className={styles.tablerow}>
                    <td key={each.id} className={styles.tabledata}>
                      {each.studentId}
                    </td>
                    <td className={styles.tabledata}>{each.bookId}</td>
                    <td className={styles.tabledata}>{each.issueDate}</td>
                    <td className={styles.tabledata}>{each.expireDate}</td>
                    <td className={styles.tabledata}>Rs. {each.fine}</td>
                    <td className={styles.tabledata}>{each.totalRenew}  </td>
                  </tr>
                ) : ""}
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
