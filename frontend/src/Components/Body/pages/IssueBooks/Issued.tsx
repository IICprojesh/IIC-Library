import { Button, Chip } from "@material-ui/core";
import { Pagination } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_ENDPOINT } from "../../../../constants/constants";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./Issued.module.css";
export default function IssueBook() {
  const [issued, setIssued] = useState<any>(null);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/issues?limit=${dataPerPage}&skip=${
        (currentPage - 1) * dataPerPage
      }`,
    })
      .then((res) => {
        setTotalPage(Math.ceil(res.data.total / dataPerPage));
        setIssued(res.data.data);
        toast.success("Issued Fetch From Database");
      })
      .catch((err) => {
        toast.error("Something went wrong. Contact to maintainer.");
      });
  }, [dataPerPage, currentPage]);

  function handleChange(_: any, value: number) {
    setCurrentPage(value);
  }

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
            <th className={styles.tableheading}>Student Contact Number</th>
            <th className={styles.tableheading}>Book ISBN</th>
            <th className={styles.tableheading}>Issue Date</th>
            <th className={styles.tableheading}>Expire Date</th>
            <th className={styles.tableheading}>Fine Amount</th>
            <th className={styles.tableheading}>Total Renewed</th>
            <th className={styles.tableheading}>Status</th>
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
                    <td className={styles.tabledata}>{each.student.contactNumber}</td>
                    <td className={styles.tabledata}>{each.bookId}</td>
                    <td className={styles.tabledata}>
                      {moment(each?.issueDate).format("YYYY-MM-DD   hh:mm a")}
                    </td>
                    <td className={styles.tabledata}>
                      {moment(each?.expireDate).format("YYYY-MM-DD   hh:mm a")}
                    </td>
                    <td className={styles.tabledata}>Rs. {each.fine}</td>
                    <td className={styles.tabledata}>{each.totalRenew} </td>
                    <td className={styles.tabledata}>
                      {each.isExpired ? (
                        <Chip
                          label="Expired"
                          icon={<DangerousIcon />}
                          color="secondary"
                        />
                      ) : (
                        <Chip
                          label="Active"
                          icon={<DoneIcon />}
                          color="primary"
                        />
                      )}{" "}
                    </td>
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
          count={totalPage}
          color="primary"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </motion.div>
  );
}
