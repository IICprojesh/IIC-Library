import styles from "./Addstudent.module.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
function Boxtitle(props: any) {
  const { title } = props;
  return (
    <>
      <h3 className={styles.boxtitle}>{title}</h3>
      <div className={styles.hr}></div>
    </>
  );
}

function Input(props: any) {
  const { title, placeholder, type, isDisabled } = props;
  return (
    <div className={styles.input}>
      <p className={styles.inputtitle}>{title}</p>
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles.inputfield} ${!isDisabled && styles.active}`}
        disabled={isDisabled}
      />
    </div>
  );
}

export default function Addstudents() {
  return (
    <div className={styles.container}>
      <Boxtitle title="Add New Student" />
      {/* <div className={styles.issuedetail}>
        <Input
          type="text"
          placeholder="Enter Book ISBN Number"
          title="Full Name "
        />

        <Input
          type="text"
          placeholder="Enter Book ISBN Number"
          title="Student ID"
        />
        <Input
          type="text"
          placeholder="Enter Book ISBN Number"
          title="Contact Number"
        />


      </div> */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 600 }}
        renderInput={(params) => <TextField {...params} label="ISBN" />}
      />
      <div className={styles.buttoncontainer}>
        <a href="/Books" >
          <button className={styles.button}>Issue Book</button>
        </a>
      </div>
    </div>
  );
}

const top100Films = [
  { label: '980123012930213', year: 1994 },
  { label: '980123012930213', year: 1972 },
  { label: '980123012930213', year: 1974 },
  { label: '980123012930213', year: 2008 },
  { label: '980123012930213', year: 1957 },
  { label: "980123012930213", year: 1993 },
  { label: '980123012930213', year: 1994 },
]
