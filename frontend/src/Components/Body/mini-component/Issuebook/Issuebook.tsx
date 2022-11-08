import { Autocomplete, Backdrop, TextField } from '@mui/material';
import { useState } from 'react';
import styles from "./Issuebook.module.css";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

function Input(props: any) {
  const { label, options } = props;
  return (
    <>

      <Autocomplete
        disablePortal
        sx={{ width: 650, marginBottom: "25px", marginTop: "12px" }}
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
  const [data, setData] = useState(false)
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.issue}>
          <Boxtitle title="Issue Book" hr="true" />
          <div className={styles.issuedetail}>
            {data && <>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={!data}
              >
                <CircularProgress color="info" />
              </Backdrop>
            </>
            }
            <Input label="Student ID" options={Students} />
            <Input label="Student ID" options={Students} />

          </div>



          <div className={styles.buttoncontainer}>
            <a href="/Books" >
              <button className={styles.button}>Issue Book</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}


const ISBN = [
  { label: '980123012930213' },
  { label: '980123012930213' },
  { label: '980123012930213' },
  { label: '980123012930213' },
  { label: '980123012930213' },
  { label: "980123012930213" },
  { label: '980123012930213' },
]

const Students = [
  { label: 'np05CP4S210007' },
  { label: '980123012930213' },
  { label: '980123012930213' },
  { label: '980123012930213' },
  { label: '980123012930213' },
  { label: "980123012930213" },
  { label: '980123012930213' },
]
