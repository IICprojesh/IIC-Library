import { Button } from "@material-ui/core";
import { Pagination } from "@mui/material";
import axios from "axios";
import { motion } from 'framer-motion';
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_ENDPOINT } from "../../../../constants/constants";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0 }}
    >
      <table className={styles.container}>
        <thead>
          <tr>
            <th className={styles.tableheading}>Student ID</th>
            <th className={styles.tableheading}>Student Name</th>
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
                      {each.student.collegeId}
                    </td>
                    <td className={styles.tabledata}>{each.student.name}</td>
                    <td className={styles.tabledata}>{each.bookId}</td>
                    <td className={styles.tabledata}>
                      {moment(each?.issueDate).format("YYYY-MM-DD   hh:mm a")}
                    </td>
                    <td className={styles.tabledata}>
                      {" "}
                      {moment(each?.expireDate).format("YYYY-MM-DD   hh:mm a")}
                    </td>
                    <td className={styles.tabledata}>Rs. {each.fine}</td>
                    <td className={styles.tabledata}>{each.totalRenew} </td>
                  </tr>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <Pagination
          sx={{ marginTop: 3 }}
          count={100}
          color="primary"
          shape="rounded"
        />
      </div>
    </motion.div>
  );
}
