import axios from "axios";
import styles from "./StudentDetails.module.css";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@material-ui/core";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import moment, { deprecationHandler } from "moment";
import DoneIcon from "@mui/icons-material/Done";
import { toast } from "react-toastify";
import { BACKEND_ENDPOINT } from "../../../../../constants/constants";
import { Pagination } from "@mui/material";
import { Link, useParams } from "react-router-dom";

export default function StudentDetails() {
  const [Student, setStudent] = useState<any>(null);
  const [issue, setIssue] = useState<any>(null);
  const [isStudent, setIsStudent] = useState(true);
  const { id } = useParams();

  const [totalPage, setTotalPage] = useState<number>(1);
  const [dataPerPage, setDataPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/students/${id}`,
    })
      .then((res) => {
        setStudent(res.data);
        setIsStudent(true);
        if (!res.data.id) {
          setIsStudent(false);
        }
      })
      .catch((_) => {
        setIsStudent(false);
      });

    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/issues?studentId=${id}&limit=${dataPerPage}&skip=${
        (currentPage - 1) * dataPerPage
      }`,
    })
      .then((res) => {
        setTotalPage(Math.ceil(res.data.total / dataPerPage));
        setIssue(res.data.data);
      })
      .catch((err) => {
        toast.error("Something went wrong. Contact to maintainer");
      });
  }, [currentPage, dataPerPage, id]);

  function handlePagination(event: React.ChangeEvent<unknown>, value: number) {
    setCurrentPage(value);
  }

  const handleRenew = (id: any) => {
    axios({
      method: "patch",
      url: `${BACKEND_ENDPOINT}/issues/${id}`,
      data: { renew: true },
    })
      .then((res) => {
        setIssue((prev: any) => {
          const state = [...prev];
          const issue = state.find((each) => {
            return (each.id = id);
          });
          issue.renew = true;
          issue.latestRenewDate = res.data.data.latestRenewDate;
          issue.canRenew = res.data.data.canRenew;
          return state;
        });
        toast.success("Book Renewed sucessfully");
      })
      .catch((err) => {
        toast.error("Something went wrong call to maintainer");
      });
  };

  const handleReturn = (id: number) => {
    axios({
      method: "patch",
      url: `${BACKEND_ENDPOINT}/issues/${id}`,
      data: { returned: true },
    })
      .then((res) => {
        setIssue((prev: any) => {
          const state = [...prev.filter((each: any) => each.id !== id)];
          const issue = prev.find((each: any) => {
            return (each.id = id);
          });
          issue.returned = true;
          return [...state, { ...issue }];
        });

        toast.success("Book Retuned Successfully !!!!");
      })
      .catch((_) => {
        toast.error("Something Wrong. Contact to maintainer");
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
                alt="Student Avatar"
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
                                    color: "green",
                                    padding: "5px 15px",
                                  }}
                                >
                                  <DoneIcon style={{ marginRight: "5px" }} />
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
                              <Tooltip title="Hello">
                                <Button
                                  onClick={() => handleRenew(each.id)}
                                  variant="outlined"
                                  disabled={!each.canRenew}
                                  style={{
                                    marginRight: "12px",
                                    color: "green",
                                  }}
                                >
                                  <RotateLeftIcon
                                    style={{ marginRight: "5px" }}
                                  />
                                  Renew
                                </Button>
                              </Tooltip>
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
          <Pagination
            sx={{ marginTop: 3 }}
            count={totalPage}
            color="primary"
            shape="rounded"
            onChange={handlePagination}
          />
        </div>
      ) : (
        <>
          <h1>No any student found of id {id}</h1>
          <Link to="/Students">
            <Button variant="outlined">Return Back</Button>
          </Link>
        </>
      )}
    </>
  );
}
