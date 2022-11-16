import { Autocomplete, Backdrop, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./Issuebook.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";

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

export default function Issuebook() {
  const [isbn, setIsbn] = useState<any[]>([]);
  const [studentid, setStudentid] = useState<any[]>([]);
  const [issuedetail, setIssuedetail] = useState<any>(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3500/students",
    }).then((res) => {
      setStudentid([...res.data.data.map((each: any) => each?.id), ""]);
    });
    axios({
      method: "get",
      url: "http://localhost:3500/books",
    }).then((res) => {
      setIsbn([...res.data.data.map((each: any) => each?.isbn), ""]);
    });
  }, []);

  const handleBookissue = () => {
    axios({
      method: "post",
      url: "http://localhost:3500/issues",
      data: issuedetail,
    })
      .then((res) => {
        setIssuedetail(null);
        toast.success("Book Issued");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err)
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.issue}>
          <Boxtitle title="Issue Book" hr="true" />
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
              value={issuedetail?.studentId}
              onChange={(e: any, value: any) =>
                setIssuedetail({ ...issuedetail, studentId: value })
              }
              options={studentid}
            />
            <Input
              label="ISBN Number"
              value={issuedetail?.bookId}
              onChange={(e: any, value: any) =>
                setIssuedetail({ ...issuedetail, bookId: value })
              }
              options={isbn}
            />
          </div>
          <div className={styles.buttoncontainer}>
            <Button
              variant="outlined"
              onClick={handleBookissue}
              className={styles.button}
            >
              Issue Book
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
