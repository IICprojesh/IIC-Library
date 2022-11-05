import styles from "./Issuebook.module.css";

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
  return (
    <>
      <div className={styles.container}>
        <div className={styles.issue}>
          <Boxtitle title="Issue Book" hr="true" />
          <div className={styles.issuedetail}>
            <Input
              type="text"
              placeholder="Enter Student Id Number"
              title="Student Id"
            />
            <Input
              type="text"
              placeholder="Enter Book ISBN Number"
              title="ISBN Number"
            />
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
