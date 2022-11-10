import { Autocomplete, Backdrop, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from "./Issuebook.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import axios from 'axios';

function Input(props: any) {
  useEffect(() => {

  }, [])
  const { label, options } = props;
  return (
    <>
      <Autocomplete
        disablePortal
        sx={{ width: 780, marginBottom: "25px", marginTop: "12px" }}
        renderInput={(params) => <TextField {...params} label={label} />} options={options} />
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
  const [isbn, setIsbn] = useState([])
  const [studentid, setStudentid] = useState([])
  const [issuedetail, setIssuedetail] = useState<any>(null)
  const [loading, setloading] = useState(false)
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: "http://localhost:3500/students"
    }).then((res) => {
      setStudentid(res.data.data.map((each: any) => each?.id))
    });
    axios({
      method: 'get',
      url: "http://localhost:3500/books"
    }).then((res) => {
      setIsbn(res.data.data.map((each: any) => each?.isbn))
    })
  }, [])

  const handleBookissue = () => {

  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.issue}>
          <Boxtitle title="Issue Book" hr="true" />
          <div className={styles.issuedetail}>
            {loading && <>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!loading}
              >
                <CircularProgress color="info" />
              </Backdrop>
            </>
            }
            <Input label="Student ID" options={studentid} />
            <Input label="ISBN Number" options={isbn} />

          </div>
          <div className={styles.buttoncontainer}>
            <a href="/Books" >
              <button onClick={handleBookissue} className={styles.button}>Issue Book</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
