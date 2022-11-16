import axios from "axios";
import styles from "./StudentDetails.module.css";
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import moment from "moment";
import DoneIcon from '@mui/icons-material/Done';
import { toast } from "react-toastify";

export default function StudentDetails() {
  const [Student, setStudent] = useState<any>(null);
  const [issue, setIssue] = useState<any>(null);
  const [isStudent, setIsStudent] = useState(true);
  const url = window.location.pathname;
  const id = url.split("Student/")[1];
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3500/students/${id}`,
    })
      .then((res) => {
        setStudent(res.data);
        setIsStudent(true);
      })
      .catch((err) => {
        setIsStudent(false);
      });

    axios({
      method: "get",
      url: `http://localhost:3500/issues?studentId=${id}`,
    })
      .then((res) => {
        setIssue(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(issue);

  const handleRenew = (id: any) => {
    console.log("i got it");
    axios({
      method: "patch",
      url: `http://localhost:3500/issues/${id}`,
      data: { renew: true },
    })
      .then((res) => {
        console.log(res.data);
        toast.success("Book Renewed sucessfully");
      })
      .catch((err) => {
        toast.error("Something went wrong call to maintainer");
      });
  };

  const handleReturn = (id: number) => {
    console.log("return hit");
    axios({
      method: "patch",
      url: `http://localhost:3500/issues/${id}`,
      data: { returned: true },
    })
      .then((res) => {
        console.log(res.data);
        toast.success("Book Retuned Successfully !!!!")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong. Contact to maintainer")

      });
  };

  return (
    <>
      {isStudent ? (
        <div className={styles.containers}>
          <div className={styles.profilecontainer}>
            <div className={styles.imagesection}>
              <img
                height="150px"
                src="https://cdn3d.iconscout.com/3d/premium/thumb/graduate-student-6368706-5250853.png"
              />
            </div>
            <div className={styles.details}>
              <p className={styles.name}>{Student?.name}</p>
              <p className={styles.email}>
                <span>
                  <EmailIcon />
                </span>
                {Student?.email}
              </p>
              <p className={styles.contact}>
                <span>
                  <CallIcon />
                </span>
                {Student?.contactNumber}
              </p>
            </div>
          </div>
          <div className={styles.bookissue}>
            <table className={styles.tablecontainer}>
              <thead>
                <tr>
                  <th className={styles.tableheading}>Book ISBN</th>
                  <th className={styles.tableheading}>Issue Date</th>
                  <th className={styles.tableheading}>Expire Date</th>
                  <th className={styles.tableheading}>Renew Date</th>
                  <th className={styles.tableheading}>Fine Amount</th>
                  <th className={styles.tableheading}>Action</th>
                </tr>
              </thead>
              <tbody>
                {issue?.map((each: any) => {
                  return (
                    <>
                      <tr key={each.id} className={styles.tablerow}>
                        <td className={styles.tabledata}>{each.bookId}</td>
                        <td className={styles.tabledata}>
                          {moment(each?.issueDate).format(
                            "YYYY-MM-DD   hh:mm a"
                          )}
                        </td>
                        <td className={styles.tabledata}>
                          {moment(each?.expireDate).format(
                            "YYYY-MM-DD   hh:mm a"
                          )}
                        </td>
                        <td className={styles.tabledata}>
                          {each.latestRenewDate &&
                            moment(each?.lastestRenewDate).format(
                              "YYYY-MM-DD   hh:mm a"
                            )}
                        </td>
                        <td className={styles.tabledata}>Rs. {each.fine}</td>
                        <td className={styles.tabledata}>
                          {each.returned ? (
                            <>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-around",
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  style={{
                                    marginRight: "12px",
                                    borderRadius: "50px",
                                    color:'green',
                                    padding: "5px 15px",
                                  }}
                                >
                                  <DoneIcon
                                    style={{ marginRight: "5px" }}
                                  />
                                  Returned
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <Button
                                onClick={() => handleRenew(each.id)}
                                variant="outlined"
                                disabled={!each.canRenew}
                                style={{ marginRight: "12px", color: "green" }}
                              >
                                <RotateLeftIcon
                                  style={{ marginRight: "5px" }}
                                />
                                Renew
                              </Button>
                              <Button
                                onClick={() => handleReturn(each.id)}
                                variant="outlined"
                                style={{ marginRight: "12px", color: "red" }}
                                color="inherit"
                              >
                                <KeyboardReturnIcon
                                  style={{ marginRight: "5px" }}
                                />
                                Return
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <h1>No any student found of id {id}</h1>
          <Button variant="outlined">Return Back</Button>
        </>
      )}
    </>
  );
}
