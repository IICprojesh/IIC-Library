import { Autocomplete, Backdrop, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./Issuebook.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_ENDPOINT } from "../../../../constants/constants";

function Input(props: any) {
  const { label, options } = props;
  return (
    <>
      <Autocomplete
        onChange={props.onChange}
        value={props?.value ?? ""}
        sx={{ width: 780, marginBottom: "25px", marginTop: "12px" }}
        renderInput={(params) => (
          <TextField {...params} {...props} label={label} />
        )}
        options={options}
      />
    </>
  );
}

function Boxtitle(props: any) {
  const { title } = props;
  return (
    <>
      <h3 className={styles.boxtitle}>{title}</h3>
      <div className={styles.hr}></div>
    </>
  );
}

export default function Issuebook(props: any) {
  const [isbn, setIsbn] = useState<any[]>([]);
  const [studentid, setStudentid] = useState<any[]>([]);
  const [studentUUID, setStudentUUID] = useState<any>();
  const [students, setStudents] = useState<any>();
  const [issuedetail, setIssuedetail] = useState<any>(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/students`,
    }).then((res) => {
      setStudentid([
        ...res.data.data.map((each: any) => each?.[props.medium]),
      ]);
      setStudents(res.data.data);
    });

    axios({
      method: "get",
      url: `${BACKEND_ENDPOINT}/books`,
    }).then((res) => {
      setIsbn([...res.data.data.map((each: any) => each?.isbn)]);
    });
  }, []);

  const handleBookissue = () => {
    const student = students.find((each: any) => {
      return (
        each?.collegeId === issuedetail?.studentId ||
        each.name === issuedetail?.studentId
      );
    });
    axios({
      method: "post",
      url: `${BACKEND_ENDPOINT}/issues`,
      data: { bookId: issuedetail.bookId, studentId: student.id },
    })
      .then((res) => {
        setIssuedetail(null);
        toast.success("Book Issued");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.issue}>
          <Boxtitle title={`Issue Book by ${props.medium}`} hr="true" />
          <div className={styles.issuedetail}>
            {loading && (
              <>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={!loading}
                >
                  <CircularProgress color="info" />
                </Backdrop>
              </>
            )}
            <Input
              label="Student ID"
              required
              value={issuedetail?.studentId}
              onChange={(e: any, value: any) => {
                setIssuedetail({ ...issuedetail, studentId: value });
                setStudentUUID(value);
              }}
              options={studentid}
            />
            <Input
              label="ISBN Number"
              required
              value={issuedetail?.bookId}
              onChange={(e: any, value: any) =>
                setIssuedetail({ ...issuedetail, bookId: value })
              }
              options={isbn}
            />
          </div>
          <div className={styles.buttoncontainer}>
            <Button variant="outlined" onClick={handleBookissue}>
              Issue Book
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
